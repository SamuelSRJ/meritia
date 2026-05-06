import { GoogleGenAI } from "@google/genai";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AppException } from "../../common/errors/app-exception";
import { MulterFile } from "../../types/multer-file";
import { ErrorType } from "./../../common/errors/error-types";
import { extractTextFromFile } from "./utils/file-parser";

@Injectable()
export class ResumeService {
  private ai: GoogleGenAI;
  private readonly MAX_RETRIES = 3;
  private readonly MODELS = ["gemini-2.5-flash"];

  private getBackoffTime(attempt: number) {
    return Math.pow(2, attempt - 1) * 10000; // 10s, 20s, 40s
  }

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async analyzeResume(file: MulterFile, jobDescription: string) {
    if (!file) throw new Error("Arquivo do currículo é obrigatório!");
    if (!jobDescription) throw new Error("Descrição da vaga é obrigatória");

    try {
      const resumeText = await extractTextFromFile(file);
      const prompt = `Você é um analisador de curriculos.
        Currículo:
        ${resumeText}

        Descrição da Vaga:
        ${jobDescription}

        Analise o currículo de maneira criteriosa em relação à vaga e retorne apenas um JSON válido com o seguinte formato para ajudar o usuário:
        {
          "tech_score": number, (0-100)
          "soft_score": number, (0-100)
          "job_match": number, (%)
          "strengths": string[],
          "weaknesses": string[],
          "recommendations": string[]
        }`;

      const response = await this.generateContentWithRetry(prompt);
      const rawText = response.text;

      if (!rawText || rawText.trim().length === 0) {
        throw new Error("Resposta do modelo veio vazia.");
      }

      const json = this.extractJson(rawText);

      return json;
    } catch (err) {
      console.error("analyzeResume error:", err);

      if (err instanceof HttpException) {
        throw err;
      }

      throw new AppException(
        ErrorType.INTERNAL_ERROR,
        "Erro ao processar o curriculo.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async generateContentWithRetry(prompt: string) {
    let lastError: any;
    let quotaExceeded = false;

    for (const model of this.MODELS) {
      console.log(`\n🚀 Iniciando tentativas com modelo: ${model}`);

      for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
        try {
          console.log(`[${model}] Tentativa ${attempt}/${this.MAX_RETRIES}`);

          const response = await this.ai.models.generateContent({
            model,
            contents: prompt,
            config: { temperature: 0 },
          });

          console.log(`✅ Sucesso com modelo: ${model}`);
          return response;
        } catch (error: any) {
          lastError = error;

          const status = error?.status;
          const message = (error?.message || "").toLowerCase();

          console.warn(
            `⚠️ [${model}] Erro (tentativa ${attempt}): status=${status} message=${message}`,
          );

          // ================================
          // 🔴 ERROS FATAIS (NÃO RETRY)
          // ================================
          if (status === 401 || status === 403) {
            throw new AppException(
              ErrorType.INTERNAL_ERROR,
              "Erro de autenticação com a API.",
              HttpStatus.UNAUTHORIZED,
            );
          }

          // ================================
          // 🟡 QUOTA EXCEDIDA (NÃO RETRY, NÃO TROCA MODELO)
          // ================================
          if (
            status === 429 &&
            (message.includes("quota") || message.includes("billing"))
          ) {
            quotaExceeded = true;
            break; // sai do loop de tentativas
          }

          // ================================
          // 🟠 RATE LIMIT (RETRY COM BACKOFF)
          // ================================
          if (
            status === 429 &&
            (message.includes("rate") || message.includes("too many requests"))
          ) {
            const waitTime = this.getBackoffTime(attempt);
            console.warn(`⏳ Rate limit. Aguardando ${waitTime}ms...`);
            await this.delay(waitTime);
            continue;
          }

          // ================================
          // 🔵 MODELO SOBRECARREGADO (RETRY)
          // ================================
          if (status === 503) {
            const waitTime = this.getBackoffTime(attempt);
            console.warn(
              `⏳ Modelo sobrecarregado. Aguardando ${waitTime}ms...`,
            );
            await this.delay(waitTime);
            continue;
          }

          // ================================
          // ⚪ OUTROS ERROS → TROCA MODELO
          // ================================
          console.warn(`➡️ Pulando para próximo modelo...`);
          break;
        }
      }

      // Se quota foi excedida, nem tenta outros modelos
      if (quotaExceeded) {
        break;
      }
    }

    // ================================
    // ❌ ERROS FINAIS
    // ================================
    if (quotaExceeded) {
      throw new AppException(
        ErrorType.QUOTA_EXCEEDED,
        "Limite de uso diário atingido. Tente novamente amanhã.",
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    console.error("❌ Todos os modelos falharam", lastError);

    throw new AppException(
      ErrorType.MODEL_OVERLOADED,
      "Modelo temporariamente sobrecarregado. Tente novamente em alguns instantes.",
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private extractJson(text: string) {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("Nenhum JSON encontrado na resposta");
      }

      return JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("Erro ao extrair JSON:", err);
      throw new Error(
        "Resposta do modelo não está em formato válido. Tente novamente.",
      );
    }
  }
}

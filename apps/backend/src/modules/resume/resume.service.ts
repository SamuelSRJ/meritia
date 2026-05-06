import { GoogleGenAI } from "@google/genai";
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { MulterFile } from "../../types/multer-file";
import { extractTextFromFile } from "./utils/file-parser";

@Injectable()
export class ResumeService {
  private ai: GoogleGenAI;
  private readonly MAX_RETRIES = 3;
  private readonly MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];

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

      throw new InternalServerErrorException("Erro ao processar o curriculo.");
    }
  }

  private async generateContentWithRetry(prompt: string) {
    let lastError: any;

    // Tenta cada modelo disponível com retry automático
    for (const model of this.MODELS) {
      for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
        try {
          console.log(
            `[Tentativa ${attempt}/${this.MAX_RETRIES}] Usando modelo: ${model}`,
          );

          const response = await this.ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              temperature: 0,
            },
          });

          console.log(`✅ Sucesso com modelo: ${model}`);
          return response;
        } catch (error: any) {
          lastError = error;
          const status = error?.status;
          const message = error?.message || "Erro desconhecido";

          // 429 - Quota estourada
          if (status === 429) {
            const msg = (message || "").toLowerCase();

            if (msg.includes("rate") || msg.includes("too many requests")) {
              const waitTime = Math.pow(2, attempt - 1) * 10000;

              console.warn("⚠️ Rate limit (429). Retry em ${waitTime}ms...`");
              await this.delay(waitTime);
              continue;
            }

            if (msg.includes("quota") || msg.includes("billing")) {
              throw new HttpException(
                {
                  status: 429,
                  message: "Limite diário de uso atingido.",
                  error: "Quota Exceeded"
                }, 
                429,
              )
            };

            // fallback - trata como sobrecarga
            console.warn("Modelo sobrecarregado");
            await this.delay(10000);
            continue;
          }

          // Se for erro 503 (sobrecarregado), tenta novamente
          if (status === 503) {
            const waitTime = Math.pow(2, attempt - 1) * 10000; // Exponential backoff: 10s, 20s, 40s
            console.warn(
              `⚠️  Modelo sobrecarregado (503). Aguardando ${waitTime}ms antes de tentar novamente...`,
            );
            await this.delay(waitTime);
          }
          // Se for erro de API key ou permissão, não tenta novamente
          else if (status === 401 || status === 403) {
            console.error(`❌ Erro de autenticação: ${message}`);
            throw error;
          }
          // Para outros erros, tenta o próximo modelo
          else {
            console.warn(`⚠️  Erro com modelo ${model}: ${message}`);
            break;
          }
        }
      }
    }

    // Se chegou aqui, todos os modelos falharam
    console.error("❌ Todos os modelos falharam após retries");
    throw new HttpException(
      {
        statusCode: 503,
        message: "Modelo temporariamente sobrecarregado. Tente novamente em alguns instantes.",
        error: "Service Unavailable",
      },
      503,
    )
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
      throw new Error("Resposta do modelo não está em formato válido. Tente novamente.");
    }
  }
}

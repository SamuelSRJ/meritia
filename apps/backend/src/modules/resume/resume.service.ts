import { GoogleGenAI } from "@google/genai";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
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
      const prompt = `Você é um assistente de recrutamento.
        Currículo:
        ${resumeText}

        Descrição da Vaga:
        ${jobDescription}

        Analise o currículo em relação à vaga e retorne apenas um JSON válido com o seguinte formato:
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
      const json = this.extractJson(rawText);

      return json;
    } catch (err) {
      console.error("analyzeResume error:", err);
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
    throw new InternalServerErrorException(
      `Serviço indisponível. Modelos estão sobrecarregados. Por favor, tente novamente em alguns minutos. Erro: ${lastError?.message}`,
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private extractJson(text: string) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON inválido");
    return JSON.parse(jsonMatch[0]);
  }
}

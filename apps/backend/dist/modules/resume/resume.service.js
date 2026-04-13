"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeService = void 0;
const genai_1 = require("@google/genai");
const common_1 = require("@nestjs/common");
const file_parser_1 = require("./utils/file-parser");
let ResumeService = class ResumeService {
    constructor() {
        this.MAX_RETRIES = 3;
        this.MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY environment variable is not defined");
        }
        this.ai = new genai_1.GoogleGenAI({ apiKey });
    }
    async analyzeResume(file, jobDescription) {
        if (!file)
            throw new Error("Arquivo do currículo é obrigatório!");
        if (!jobDescription)
            throw new Error("Descrição da vaga é obrigatória");
        try {
            const resumeText = await (0, file_parser_1.extractTextFromFile)(file);
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
        }
        catch (err) {
            console.error("analyzeResume error:", err);
            throw new common_1.InternalServerErrorException("Erro ao processar o curriculo.");
        }
    }
    async generateContentWithRetry(prompt) {
        let lastError;
        for (const model of this.MODELS) {
            for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
                try {
                    console.log(`[Tentativa ${attempt}/${this.MAX_RETRIES}] Usando modelo: ${model}`);
                    const response = await this.ai.models.generateContent({
                        model,
                        contents: prompt,
                        config: {
                            temperature: 0,
                        },
                    });
                    console.log(`✅ Sucesso com modelo: ${model}`);
                    return response;
                }
                catch (error) {
                    lastError = error;
                    const status = error === null || error === void 0 ? void 0 : error.status;
                    const message = (error === null || error === void 0 ? void 0 : error.message) || "Erro desconhecido";
                    if (status === 503) {
                        const waitTime = Math.pow(2, attempt - 1) * 10000;
                        console.warn(`⚠️  Modelo sobrecarregado (503). Aguardando ${waitTime}ms antes de tentar novamente...`);
                        await this.delay(waitTime);
                    }
                    else if (status === 401 || status === 403) {
                        console.error(`❌ Erro de autenticação: ${message}`);
                        throw error;
                    }
                    else {
                        console.warn(`⚠️  Erro com modelo ${model}: ${message}`);
                        break;
                    }
                }
            }
        }
        console.error("❌ Todos os modelos falharam após retries");
        throw new common_1.InternalServerErrorException(`Serviço indisponível. Modelos estão sobrecarregados. Por favor, tente novamente em alguns minutos. Erro: ${lastError === null || lastError === void 0 ? void 0 : lastError.message}`);
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    extractJson(text) {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch)
            throw new Error("JSON inválido");
        return JSON.parse(jsonMatch[0]);
    }
};
exports.ResumeService = ResumeService;
exports.ResumeService = ResumeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ResumeService);
//# sourceMappingURL=resume.service.js.map
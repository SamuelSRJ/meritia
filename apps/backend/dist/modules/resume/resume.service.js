"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const file_parser_1 = require("./utils/file-parser");
let ResumeService = class ResumeService {
    constructor() {
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async analyzeResume(file, jobDescription) {
        var _a, _b;
        if (!file)
            throw new Error("Arquivo do curriculo é obrigatório!");
        if (!jobDescription)
            throw new Error("Descrição da vaga é obrigatório");
        const resumeText = await (0, file_parser_1.extractTextFromFile)(file);
        const prompt = `Você é um assistente de recrutamento.
      Currículo:
      ${resumeText}
      
      Descrição da Vaga:
      ${jobDescription}
      
      Analise o currículo em relação à vaga e retorne apenas um JSON válido com o seguinte formato: 
      {
        "tech_score": number,
        "soft_score": number,
        "final_score": number,
        "strengths": string[],
        "weaknesses": string[],
        "recommendations": string[]
      }`;
        const response = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0,
        });
        const rawText = ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || '';
        const json = this.extractJson(rawText);
        return json;
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
    (0, common_1.Injectable)()
], ResumeService);
//# sourceMappingURL=resume.service.js.map
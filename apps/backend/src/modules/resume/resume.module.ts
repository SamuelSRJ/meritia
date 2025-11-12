import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { extractTextFromFile } from './utils/file-parser';

@Injectable()
export class ResumeService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async analyzeResume(file: Express.Multer.File, jobDescription: string) {
    if (!file) throw new Error("Arquivo do curriculo é obrigatório!");
    if (!jobDescription) throw new Error("Descrição da vaga é obrigatório")

    const resumeText = await extractTextFromFile(file);
    const prompt = 
      `Você é um assistente de recrutamento.
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

    const rawText = response.choices[0]?.message?.content || '';
    const json = this.extractJson(rawText);

    return json;
  }

  private extractJson(text: string) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON inválido");
    return JSON.parse(jsonMatch[0]);
  }
}

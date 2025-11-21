import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { extractTextFromFile } from './utils/file-parser';
import { MulterFile } from '../../types/multer-file';

@Injectable()
export class ResumeService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async analyzeResume(file: MulterFile, jobDescription: string) {
    if (!file) throw new Error('Arquivo do currículo é obrigatório!');
    if (!jobDescription) throw new Error('Descrição da vaga é obrigatória');

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

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0,
      });

      const rawText = response.choices[0]?.message?.content || '';
      const json = this.extractJson(rawText);

      return json;
    } catch (err) {
      console.error('analyzeResume error:', err);
      throw new InternalServerErrorException("Erro ao processar o curriculo.")
    }
  }

  private extractJson(text: string) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON inválido');
    return JSON.parse(jsonMatch[0]);
  }
}
/**
 * Script para testar Gemini API com Free Tier (sem cartão de crédito)
 * Este script testa a conexão e funcionalidade básica
 */

import { GoogleGenAI } from "@google/genai";

async function testGeminiAPI() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error(
      "❌ GEMINI_API_KEY não encontrado. Configure a variável de ambiente."
    );
    console.log("\nPasso a passo para obter a chave:");
    console.log("1. Acesse: https://aistudio.google.com/app/apikey");
    console.log(
      "2. Clique em 'Create API key' e escolha 'Create API key in new project'"
    );
    console.log("3. Copie a chave gerada e salve em seu arquivo .env");
    console.log("\n⚠️  IMPORTANTE: O free tier permite 60 requisições/minuto");
    process.exit(1);
  }

  console.log("✅ Variável GEMINI_API_KEY encontrada\n");

  try {
    // Inicializar o cliente
    const ai = new GoogleGenAI({ apiKey });
    console.log("✅ Cliente GoogleGenAI inicializado com sucesso\n");

    // Teste 1: Chamada simples
    console.log("📝 Teste 1: Chamada simples de geração de conteúdo...");
    const response1 = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Melhor modelo para free tier
      contents: "Qual é a capital da França?",
    });

    console.log("✅ Resposta recebida:");
    console.log(`   ${response1.text}\n`);

    // Teste 2: Análise de currículo simplificada
    console.log("📝 Teste 2: Análise com JSON estruturado...");
    const mockResume = `
      João Silva
      Senior Backend Developer
      - 5 anos de experiência em Node.js/TypeScript
      - Proficiente em NestJS, SQL, NoSQL
      - Experiência com Docker e Kubernetes
      - Fluente em English
    `;

    const mockJobDescription = `
      Procuramos desenvolvedor backend sênior
      - Experiência com Node.js/TypeScript
      - Conhecimento em NestJS
      - SQL e NoSQL
      - Inglês fluente
    `;

    const analysisPrompt = `Analise este currículo em relação à vaga de forma simples (sem JSON) e dê uma nota de 1-10 de compatibilidade.

    Currículo:
    ${mockResume}

    Vaga:
    ${mockJobDescription}`;

    const response2 = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: analysisPrompt,
      config: {
        temperature: 0,
      },
    });

    console.log("✅ Análise concluída:");
    console.log(`   ${response2.text}\n`);

    // Teste 3: Streaming (mais eficiente)
    console.log("📝 Teste 3: Streaming (mais eficiente em termos de uso)...");
    const streamResponse = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: "Explique brevemente como funcionam LLMs:",
    });

    let fullText = "";
    for await (const chunk of streamResponse) {
      process.stdout.write(chunk.text);
      fullText += chunk.text;
    }
    console.log("\n✅ Stream completo\n");

    console.log("═══════════════════════════════════════════");
    console.log("✅ TODOS OS TESTES PASSARAM!");
    console.log("═══════════════════════════════════════════\n");

    console.log("📊 Informações do Free Tier:");
    console.log("   • Rate limit: 60 requisições/minuto");
    console.log("   • Modelos disponíveis: gemini-2.5-flash (recomendado)");
    console.log("   • Sem limite de tokens/mês no free tier");
    console.log("   • Não requer cartão de crédito\n");

    console.log("🚀 Próximos passos:");
    console.log("   1. Dependências atualizadas");
    console.log("   2. SDK novo configurado");
    console.log("   3. Service pronto para uso");
    console.log("   4. Execute: npm run start:dev\n");
  } catch (error) {
    console.error(
      "❌ Erro ao conectar à API:",
      error instanceof Error ? error.message : error
    );

    if (error instanceof Error && error.message.includes("API key")) {
      console.log("\n⚠️  Verifique se sua API key é válida:");
      console.log("   https://aistudio.google.com/app/apikey");
    }

    process.exit(1);
  }
}

// Executar testes
testGeminiAPI();

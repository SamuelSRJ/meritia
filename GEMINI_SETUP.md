# 🚀 Configuração Gemini API - Free Tier

## ✅ Status da Atualização

O projeto foi atualizado para usar a **nova versão do SDK Gemini** (`@google/genai`):

- ✅ SDK atualizado de `@google/generative-ai` para `@google/genai`
- ✅ Código refatorado para usar a nova arquitetura de client
- ✅ Modelo atualizado para `gemini-2.5-flash` (melhor custo-benefício)
- ✅ Suporte completo para free tier (sem cartão de crédito)

## 🆓 Free Tier - Limite e Requisitos

| Aspecto             | Detalhes                                             |
| ------------------- | ---------------------------------------------------- |
| **Custo**           | Gratuito (sem cartão de crédito)                     |
| **Rate Limit**      | 60 requisições/minuto                                |
| **Tokens**          | Sem limite de tokens/mês                             |
| **Modelos**         | gemini-2.5-flash, gemini-2.0-flash, gemini-1.5-flash |
| **Funcionalidades** | Texto, imagem, áudio, vídeo                          |

## 🔑 Obtendo sua API Key

1. **Acesse**: https://aistudio.google.com/app/apikey
2. **Clique**: "Create API key"
3. **Escolha**: "Create API key in new Google Cloud project"
4. **Copie** a chave gerada

## ⚙️ Configuração do Projeto

### 1. Instalar/Atualizar Dependências

```bash
cd apps/backend
npm install
```

Isto irá:

- Remover a SDK antiga (`@google/generative-ai`)
- Manter a nova SDK (`@google/genai`) atualizada

### 2. Configurar Variável de Ambiente

Crie um arquivo `.env` na raiz do projeto `apps/backend/`:

```bash
# .env (não comitar este arquivo!)
GEMINI_API_KEY=sua_chave_aqui
```

Ou, se usando `.env.local`:

```bash
# Para desenvolvimento local
GEMINI_API_KEY=sua_chave_aqui
```

## 🧪 Testando a Integração

### Teste Rápido (Recomendado)

```bash
cd apps/backend
npm run test:gemini
```

Este script irá:

1. ✅ Verificar se a API key está configurada
2. ✅ Testar conexão básica
3. ✅ Fazer análise simulada de currículo
4. ✅ Testar streaming

**Saída esperada:**

```
✅ Cliente GoogleGenAI inicializado com sucesso

📝 Teste 1: Chamada simples de geração de conteúdo...
✅ Resposta recebida: Paris

📝 Teste 2: Análise com JSON estruturado...
✅ Análise concluída: [resultado da análise]

📝 Teste 3: Streaming...
✅ Stream completo
```

### Teste no Servidor

```bash
cd apps/backend
npm run start:dev
```

Isto iniciará o servidor em modo watch com hot-reload.

## 📝 Mudanças no Código

### Before (SDK Antiga)

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const response = await model.generateContent({
  contents: [{ role: "user", parts: [{ text: prompt }] }],
});
```

### After (Nova SDK)

```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey });
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
  config: { temperature: 0 },
});
```

## 🎯 Modelos Disponíveis (Free Tier)

| Modelo               | Melhor para                | Velocidade   | Custo          |
| -------------------- | -------------------------- | ------------ | -------------- |
| **gemini-2.5-flash** | Análise, respostas rápidas | Muito rápido | Mais barato ⭐ |
| **gemini-2.0-flash** | Uso geral                  | Rápido       | Barato         |
| **gemini-1.5-flash** | Contexto longo             | Médio        | Barato         |

**Recomendação**: Use `gemini-2.5-flash` para análise de currículos.

## 🛠️ Arquitetura Atualizada

```
resume.service.ts
├── GoogleGenAI (nova)
│   ├── models.generateContent()
│   ├── models.generateContentStream()
│   └── chats.create()
└── Suporta:
    ├── Análise JSON
    ├── Streaming
    ├── Temperature control
    └── Custom prompts
```

## 🚨 Solução de Problemas

### Erro: "GEMINI_API_KEY not found"

```bash
# Verificar se o arquivo .env existe
ls -la apps/backend/.env

# Se não existir, criar:
echo "GEMINI_API_KEY=sua_chave_aqui" > apps/backend/.env
```

### Erro: "Invalid API key"

1. Verifique se copiou corretamente em: https://aistudio.google.com/app/apikey
2. Certifique-se que não há espaços em branco extras
3. Gere uma nova chave se necessário

### Erro: "Rate limit exceeded"

O free tier permite 60 requisições/minuto. Se atingir este limite:

- Aguarde 1 minuto antes de nova requisição
- Considere fazer requisições em lotes
- Implemente cache de respostas

### Erro: "Model not found"

```typescript
// ❌ Errado - modelo não existe
model: "gemini-3-flash-preview";

// ✅ Correto
model: "gemini-2.5-flash";
```

## 📚 Recursos Adicionais

- [Documentação Oficial](https://ai.google.dev/gemini-api/docs)
- [Quickstart Guide](https://ai.google.dev/gemini-api/docs/quickstart)
- [SDK GitHub](https://github.com/googleapis/js-genai)
- [Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Pricing](https://ai.google.dev/gemini-api/docs/pricing)

## 🎓 Próximos Passos

1. ✅ Obter API key em https://aistudio.google.com/app/apikey
2. ✅ Executar `npm run test:gemini` para validar
3. ✅ Iniciar servidor: `npm run start:dev`
4. ✅ Testar endpoint de análise de currículo
5. 📝 Implementar recursos adicionais conforme necessário

---

**Última atualização**: Abril de 2026
**SDK Version**: @google/genai ^1.49.0
**Status**: ✅ Produção-ready

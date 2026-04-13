# 🚀 Guia Rápido: Gemini API Free Tier

## O que foi atualizado?

✅ **Código atualizado** para usar o novo SDK Gemini (`@google/genai`)  
✅ **Service refatorado** em `resume.service.ts`  
✅ **Pronto para free tier** - sem cartão de crédito necessário

---

## 🎯 Passo a Passo (3 minutos)

### 1️⃣ Obter API Key (2 minutos)

```bash
# Abra este link no seu navegador:
https://aistudio.google.com/app/apikey

# Clique em "Create API key"
# Selecione "Create API key in new project"
# Copie a chave gerada
```

### 2️⃣ Configurar Projeto (30 segundos)

```bash
cd apps/backend

# Criar arquivo .env com sua chave
echo "GEMINI_API_KEY=cola_sua_chave_aqui" > .env

# Instalador as dependências (se ainda não fez)
npm install
```

### 3️⃣ Testar Integração (30 segundos)

```bash
# Na pasta apps/backend, rodar:
npm run test:gemini
```

**Saída esperada:**

```
✅ Variável GEMINI_API_KEY encontrada
✅ Cliente GoogleGenAI inicializado com sucesso

📝 Teste 1: Chamada simples...
✅ Resposta recebida: Paris

📝 Teste 2: Análise com JSON...
✅ Análise concluída: ...

📝 Teste 3: Streaming...
✅ Stream completo

═══════════════════════════════════════════
✅ TODOS OS TESTES PASSARAM!
═══════════════════════════════════════════
```

### 4️⃣ Iniciar Servidor

```bash
npm run start:dev
```

Pronto! O servidor está rodando com Gemini API integrado.

---

## 📦 O que foi mudado?

### Antes (SDK antiga)

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const response = await model.generateContent({...});
```

### Depois (SDK nova)

```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey });
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
  config: { temperature: 0 },
});
```

---

## ⚡ Informações Free Tier

| Item                  | Detalhe                                 |
| --------------------- | --------------------------------------- |
| **Custo**             | Gratuito                                |
| **Cartão de Crédito** | ❌ Não necessário                       |
| **Rate Limit**        | 60 requisições/minuto                   |
| **Tokens por mês**    | Sem limite                              |
| **Modelos**           | gemini-2.5-flash, gemini-2.0-flash, etc |

**Melhor modelo para análise de currículo:** `gemini-2.5-flash` (rápido + barato)

---

## 🔧 Arquivos Modificados

- ✅ `apps/backend/src/modules/resume/resume.service.ts` - SDK atualizada
- ✅ `apps/backend/package.json` - Dependências limpas
- ✅ `apps/backend/src/test-gemini.ts` - Script de teste criado
- ✅ `GEMINI_SETUP.md` - Documentação completa

---

## 🆘 Troubleshooting

### ❌ Erro: "GEMINI_API_KEY not found"

```bash
# Verificar se .env existe e tem a chave
cat apps/backend/.env

# Se não existir:
echo "GEMINI_API_KEY=sua_chave" > apps/backend/.env
```

### ❌ Erro: "Invalid API key"

1. Vá em https://aistudio.google.com/app/apikey
2. Verifique se copiou a chave corretamente
3. Não deve ter espaços em branco extras
4. Gere uma nova chave se necessário

### ❌ Erro: "Rate limit exceeded"

- Free tier = 60 requisições/minuto
- Aguarde 1 minuto antes de tentar novamente

---

## 📚 Documentação Completa

Para mais detalhes, veja: `GEMINI_SETUP.md`

---

**Status**: ✅ Pronto para usar  
**Última atualização**: Abril 2026  
**SDK**: @google/genai ^1.49.0

# Troubleshooting - Erro de Quota da API Gemini

## Problema Identificado

```
Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent:
[429 Too Many Requests] You exceeded your current quota
Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0
```

A mensagem **"limit: 0"** indica que sua conta não tem acesso ao free tier ATIVO.

---

## Soluções (em ordem de prioridade)

### 1. **Verificar se a API está Ativada**

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Navegue para **APIs & Services** → **Enabled APIs & services**
3. Procure por **"Generative Language API"**
4. Se não estiver listada, clique em **"Enable APIs and services"** e procure por **"Generative Language API"**

### 2. **Verificar a Quota e Billing**

1. No Cloud Console, vá para **Generative AI** → **Quotas**
2. Verifique se há quotas disponíveis
3. Se mostrar "0/0", você precisa adicionar um método de pagamento:
   - Clique em **Billing** no menu esquerdo
   - Configure uma conta de billing (pode usar free tier com cartão)

### 3. **Recriar a API Key**

1. Vá para [AI Studio - Google](https://aistudio.google.com/app/apikeys)
2. Clique em **"Obter chave de API gratuita"** (ou **"Create new Secret Key"**)
3. Copie a nova chave
4. Crie um arquivo `.env` na pasta `/apps/backend/`:
   ```
   GEMINI_API_KEY=sua_chave_aqui
   PORT=4000
   NODE_ENV=development
   ```

### 4. **Verificar a Chave de API**

Execute este comando para testar se a chave está funcionando:

```bash
cd /Users/samuel/Documents/DEV/Projects/job-match-assistant/apps/backend

# Instale o dotenv-cli se não tiver
npm install -g dotenv-cli

# Teste a chave
curl -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: PASTE_YOUR_API_KEY_HERE" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### 5. **Limpar e Reinstalar**

```bash
# Limpe a cache e reinstale
cd /Users/samuel/Documents/DEV/Projects/job-match-assistant
rm -rf node_modules apps/backend/node_modules
yarn install

# Execute novamente
cd apps/backend
yarn start:dev
```

---

## Pontos Importantes

✅ **Código corrigido:**

- ✓ Erro de TypeScript do `process.env.GEMINI_API_KEY` corrigido
- ✓ Linha desnecessária `"Say hello"` removida (economiza quota)
- ✓ Validação de API Key adicionada no construtor

❌ **O que foi feito:**

- ✗ Nenhuma linha de debug foi adicionada (removida)
- ✗ Versão do SDK está atualizada (0.24.1 é a mais recente)

---

## Próximos Passos

1. Crie o arquivo `.env` com sua API Key válida
2. Reinicie o servidor
3. Teste novamente

Se continuar com erro **429**, o problema é **definitivamente** a quota/billing da sua conta Google.

---

## Referências

- [Google Generative AI Docs](https://ai.google.dev/)
- [Rate Limits & Quotas](https://ai.google.dev/gemini-api/docs/rate-limits)
- [API Studio](https://aistudio.google.com/app/apikeys)

#!/bin/bash

# Script para testar Gemini API free tier
# Execute: bash test-gemini.sh

echo "================================"
echo "🧪 Testando Gemini API - Free Tier"
echo "================================"
echo ""

# Verificar se .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo ""
    echo "📝 Crie o arquivo .env com:"
    echo "   GEMINI_API_KEY=sua_chave_aqui"
    echo ""
    echo "🔑 Obtenha sua chave em: https://aistudio.google.com/app/apikey"
    exit 1
fi

# Verificar se GEMINI_API_KEY está configurada
if ! grep -q "GEMINI_API_KEY=" .env; then
    echo "❌ GEMINI_API_KEY não configurada no .env"
    exit 1
fi

echo "✅ .env encontrado e configurado"
echo ""

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    echo ""
fi

# Rodar teste
echo "🚀 Executando teste..."
echo ""
npm run test:gemini

echo ""
echo "================================"
echo "✅ Testes concluídos!"
echo "================================"

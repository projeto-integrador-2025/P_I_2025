# 🧠 Chatbot com Flask e Groq API
Este é um chatbot simples desenvolvido com Flask, integrando a API da Groq (compatível com OpenAI). O projeto mantém a segurança das credenciais utilizando variáveis de ambiente.

# 🚀 Funcionalidades
### ✅ Integração com modelo llama3-8b-8192 via Groq API
### ✅ Histórico de conversas entre usuário e bot
### ✅ Interface web com Flask e HTML
### ✅ Arquitetura segura: sem expor chaves de API no repositório

# 🌐 Como funciona
O app.py carrega automaticamente a chave do .env usando python-dotenv.

A função responder_com_groq envia mensagens para a API e retorna a resposta.

As rotas Flask gerenciam a interface e as requisições AJAX.

## ⚙️ Pré-requisitos
### Python 3.8+

### ✅ pip

### ✅ Para Rodar "Configurar variável de ambiente GROQ_API_KEY ou usar .env localmente."






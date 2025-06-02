from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Carrega variáveis do arquivo .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuração da API Groq
openai.api_key = os.getenv('GROQ_API_KEY')
openai.api_base = 'https://api.groq.com/openai/v1'

# Histórico de mensagens
chat_history = []

@app.route('/')
def home():
    return send_file('chatbot.html')  # Carrega diretamente o HTML da raiz

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()

    if not data or 'message' not in data:
        return jsonify({'status': 'error', 'response': '[Mensagem inválida recebida]'}), 400

    user_message = data['message']
    bot_response = responder_com_groq(user_message)

    chat_history.append({'user': user_message, 'bot': bot_response})
    return jsonify({'status': 'success', 'response': bot_response})

def responder_com_groq(mensagem):
    try:
        response = openai.ChatCompletion.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "Você é um assistente inteligente e prestativo."},
                {"role": "user", "content": mensagem}
            ],
            temperature=0.7
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        return f"[Erro ao acessar IA: {str(e)}]"

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8000)

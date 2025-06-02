from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # CORS para permitir acesso do frontend (127.0.0.1:5500, etc)
import openai
import os
from dotenv import load_dotenv

# Carrega variáveis do arquivo .env
load_dotenv()

app = Flask(__name__)
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
 

# Define chave da API Groq
openai.api_key = os.getenv('GROQ_API_KEY')
openai.api_base = 'https://api.groq.com/openai/v1'

# Histórico de mensagens (temporário, para sessão atual)
chat_history = []

@app.route('/')
def home():
    return render_template('index.html', chat_history=chat_history)

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
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
    # Rode o backend acessível localmente em localhost:8000
    app.run(debug=True, host='localhost', port=8000)

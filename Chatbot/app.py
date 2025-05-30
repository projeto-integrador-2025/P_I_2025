from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

# Carregar API Key de variável de ambiente
openai.api_key = os.getenv('GROQ_API_KEY')  
openai.api_base = 'https://api.groq.com/openai/v1'

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
    app.run(debug=True, host='localhost', port=8000)

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

chat_history = []

respostas = {
    "ola": "Olá! Como posso ajudar você?",
    "oi": "Oi! Tudo bem? Em que posso te ajudar?",
    "quem sou eu": "Sou um chatbot simples feito para responder perguntas básicas.",
    "ajuda": (
        "Claro! Estou aqui para ajudar. Você pode me perguntar sobre:<br>"
        "- Contato<br>"
        "- Horários de funcionamento<br>"
        "- Quantidade de peças<br>"
        "- Dados da máquina"
    ),
    "contato": "Você pode entrar em contato conosco pelo e-mail projeto.integrador@gmail.com",
    "horario": "Funcionamos de segunda a sexta, das 18:45h às 23:00h.",
    "obrigado": "De nada! 😊",
    "quantidade de peças": (
        "Aqui estão as quantidades de peças:<br>"
        "- Qtd Metal: 120<br>"
        "- Qtd Plásticos: 230<br>"
        "- Qtd Total: 350<br>"
        "- Qtd Rejeitados: 15"
    ),
    "dados da maquina": (
        "Aqui estão os dados da máquina:<br>"
        "- Esteiras: Ativadas<br>"
        "- Ativador: Funcionando<br>"
        "- Tempo de Processo da Máquina: 04:35<br>"
        "- Última Parada: 12 minutos atrás<br>"
        "- Erros: 0.0"
    ),
}

def responder_mensagem(mensagem):
    mensagem = mensagem.lower().strip()
    for chave in respostas:
        if chave in mensagem:
            return respostas[chave]
    return "Desculpe, não entendi sua pergunta. Tente reformular ou digite 'ajuda'."

@app.route('/')
def home():
    return send_file('chatbot.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'status': 'error', 'response': '[Mensagem inválida recebida]'}), 400

    user_message = data['message']
    bot_response = responder_mensagem(user_message)

    chat_history.append({'user': user_message, 'bot': bot_response})
    return jsonify({'status': 'success', 'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8000)

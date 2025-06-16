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
        "Claro! Você pode me perguntar sobre:<br>"
        "- Contato<br>"
        "- Estado das estações<br>"
        "- Peças por material<br>"
        "- Ciclos recentes<br>"
        "- Sensores instalados<br>"
        "- Detecções recentes<br>"
        "- Usuários do sistema"
    ),
    "contato": "Você pode entrar em contato conosco pelo e-mail projeto.integrador@gmail.com",
    "obrigado": "De nada! 😊",
}

def responder_mensagem(mensagem):
    mensagem = mensagem.lower().strip()

    if "estado das estações" in mensagem:
        return (
            "Estado atual das estações:<br>"
            "- Estação 1: Ligada<br>"
            "- Estação 2: Desligada<br>"
            "- Estação 3: Ligada"
        )

    elif "peças por material" in mensagem:
        return (
            "Quantidade de peças por tipo de material:<br>"
            "- Metal: 120<br>"
            "- Plástico: 230<br>"
            "- Vidro: 45"
        )

    elif "ciclos recentes" in mensagem:
        return (
            "Últimos ciclos registrados:<br>"
            "- Peça 101 na Estação 1 – Início: 14:22<br>"
            "- Peça 102 na Estação 2 – Início: 14:24<br>"
            "- Peça 103 na Estação 1 – Início: 14:26"
        )

    elif "sensores instalados" in mensagem:
        return (
            "Sensores instalados:<br>"
            "- Sensor Temperatura – Estação 1<br>"
            "- Sensor Presença – Estação 2<br>"
            "- Sensor Vibração – Estação 3"
        )

    elif "detecções recentes" in mensagem or "detecções recentes" in mensagem:
        return (
            "Últimas detecções:<br>"
            "- Sensor 1 – 14:30<br>"
            "- Sensor 2 – 14:31<br>"
            "- Sensor 1 – 14:33"
        )

    elif "usuarios do sistema" in mensagem or "usuários do sistema" in mensagem:
        return (
            "Usuários cadastrados:<br>"
            "- João Silva<br>"
            "- Maria Oliveira<br>"
            "- Carlos Mendes"
        )

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

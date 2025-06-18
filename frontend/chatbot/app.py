from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
# Permite o uso de CORS para requisições externas 
CORS(app)

API_BASE_URL = "http://localhost:5286/api"

ROTAS = {
    "peca": ["peça", "pecas", "peças", "componente", "componentes"],
    "sensor": ["sensor", "sensores", "detecção", "leitura"],
    "ciclo": ["ciclo", "ciclos", "processo", "produção"],
    "estacao": ["estação", "estacao", "estacoes", "estação de trabalho", "linha"],
    "estacaoestado": ["estado", "estados", "status", "situação da estação"],
    "deteccaosensor": ["detecção de sensor", "leitura de sensor", "evento de sensor", "registro de sensor"]
}

# Função para calcular a duração entre dois timestamps ISO
def formatar_duracao(inicio_str, fim_str):
    try:
        inicio = datetime.fromisoformat(inicio_str)
        fim = datetime.fromisoformat(fim_str)
        duracao = fim - inicio
        return str(duracao)
    except:
        return "Indefinida"

def consultar_api(mensagem):
    mensagem = mensagem.lower().strip()

    # Verifica se alguma palavra-chave está na mensagem
    for rota, palavras in ROTAS.items():
        if any(palavra in mensagem for palavra in palavras):
            response = requests.get(f"{API_BASE_URL}/{rota.capitalize()}")

            if response.status_code == 200:
                dados = response.json()

                # Trata resposta específica para a rota 'peca'
                if rota == "peca" and isinstance(dados, list):
                    materiais = [item.get("material", "Desconhecido") for item in dados]
                    materiais_unicos = sorted(set(materiais))
                    return "Materiais encontrados nas peças:\n" + "\n".join(f"- {m}" for m in materiais_unicos)

                elif rota == "ciclo" and isinstance(dados, list):
                    ciclos_formatados = []
                    for i, item in enumerate(dados, start=1):
                        inicio = item.get("tempoInicial", "Não informado")
                        fim = item.get("timestampCiclo", "Não informado")
                        duracao = formatar_duracao(inicio, fim)
                        ciclos_formatados.append(
                            f"Ciclo {i}:\n"
                            f"  Início: {inicio}\n"
                            f"  Fim: {fim}\n"
                            f"  Duração: {duracao}"
                        )
                    return "Informações dos ciclos:\n\n" + "\n\n".join(ciclos_formatados)

                elif rota == "estacao" and isinstance(dados, list):
                    estacoes = []
                    for i, item in enumerate(dados, start=1):
                        nome = item.get("nome", f"Estação ID {item.get('idEstacao', 'Desconhecido')}")
                        estacoes.append(f"{i}. {nome}")
                    return "Estações identificadas:\n" + "\n".join(estacoes)

                elif rota == "sensor" and isinstance(dados, list):
                    sensores = []
                    for i, item in enumerate(dados, start=1):
                        tipo = item.get("tipo", "Desconhecido")
                        sensores.append(f"{i}. Tipo: {tipo}")
                    return "Sensores cadastrados:\n" + "\n".join(sensores)

                elif rota == "estacaoestado" and isinstance(dados, list):
                    estados = []
                    for i, item in enumerate(dados, start=1):
                        status = item.get("estado", "Sem status")
                        data = item.get("dataHora", "Sem data")
                        estados.append(f"{i}. Estado: {status} em {data}")
                    return "Estados das estações:\n" + "\n".join(estados)

                elif rota == "deteccaosensor" and isinstance(dados, list):
                    deteccoes = []
                    for i, item in enumerate(dados, start=1):
                        timestamp = item.get("timestamp", "Sem horário")
                        deteccoes.append(f"{i}. Evento detectado em: {timestamp}")
                    return "Detecções registradas:\n" + "\n".join(deteccoes)

                return dados

    return "Não entendi sua pergunta. Tente usar palavras como 'peça', 'sensor', 'ciclo', 'estação', 'estado' ou 'detecção'."

@app.route('/')
def home():
    return send_file('chatbot.html')

# Rota para processar a mensagem enviada pelo usuário
@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    mensagem = data.get('message', '')

    try:
        resposta = consultar_api(mensagem)
        return jsonify({'resposta': resposta})
    except Exception as e:
        return jsonify({'resposta': f"Erro ao consultar API: {e}"}), 500

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)

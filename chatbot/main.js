// Envia a mensagem do usuário para o servidor e exibe a resposta
async function enviarMensagem() {
  const input = document.getElementById('entradaUsuario');
  const mensagem = input.value.trim();
  if (!mensagem) return;

  const chatBox = document.getElementById('caixaChat');

  // Exibe a mensagem do usuário
  const userDiv = document.createElement('div');
  userDiv.className = 'mensagem-chat';
  userDiv.innerHTML = `<span class='usuario-chat'>Você:</span> ${mensagem}`;
  chatBox.appendChild(userDiv);

  try {
    const response = await fetch('http://localhost:8000/send_message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: mensagem })
    });

    const data = await response.json();
    let botMsg;

    // Verifica se é um objeto (lista ou dicionário)
    if (typeof data.resposta === 'object') {
      botMsg = `<pre>${JSON.stringify(data.resposta, null, 2)}</pre>`;
    } else {
      // Substitui \n por <br> para manter quebra de linha
      botMsg = data.resposta.replace(/\n/g, "<br>") || '[Resposta inválida do servidor]';
    }

    const respostaDiv = document.createElement('div');
    respostaDiv.className = 'mensagem-chat';
    respostaDiv.innerHTML = `<span class='usuario-chat'>Bot:</span><br>${botMsg}`;
    chatBox.appendChild(respostaDiv);

  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    const erroDiv = document.createElement('div');
    erroDiv.className = 'mensagem-chat';
    erroDiv.innerHTML = `<span class='usuario-chat'>Bot:</span> [Erro ao se comunicar com o servidor]`;
    chatBox.appendChild(erroDiv);
  }

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Ativa o envio ao pressionar Enter
document.getElementById('entradaUsuario').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    enviarMensagem();
  }
});

// Exibe mensagem de boas-vindas ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('caixaChat');
  const welcomeDiv = document.createElement('div');
  welcomeDiv.className = 'mensagem-chat';
  welcomeDiv.innerHTML = `<span class='usuario-chat'>Bot:</span> Olá, seja bem-vindo ao Chat. Estou aqui para ajudar.`;
  chatBox.appendChild(welcomeDiv);
});

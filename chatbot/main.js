async function enviarMensagem() {
  const input = document.getElementById('entradaUsuario');
  const mensagem = input.value.trim();
  if (!mensagem) return;

  const chatBox = document.getElementById('caixaChat');

  // Exibe a mensagem do usuário no chat
  const userDiv = document.createElement('div');
  userDiv.className = 'mensagem-chat';
  userDiv.innerHTML = `<span class='usuario-chat'>Você:</span> ${mensagem}`;
  chatBox.appendChild(userDiv);

  try {
    const response = await fetch('http://localhost:8000/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: mensagem })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Verifica se a resposta tem a propriedade 'response'
    const botMsg = data.response || '[Resposta inválida do servidor]';

    // Exibe a resposta do bot no chat
    const respostaDiv = document.createElement('div');
    respostaDiv.className = 'mensagem-chat';
    respostaDiv.innerHTML = `<span class='usuario-chat'>Bot:</span> ${botMsg}`;
    chatBox.appendChild(respostaDiv);

  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);

    // Mostra erro caso a API falhe
    const erroDiv = document.createElement('div');
    erroDiv.className = 'mensagem-chat';
    erroDiv.innerHTML = `<span class='usuario-chat'>Bot:</span> [Erro ao se comunicar com o servidor]`;
    chatBox.appendChild(erroDiv);
  }

  // Limpa o input e rola para o final do chat
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}

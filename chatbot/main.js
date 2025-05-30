function enviarMensagem() {
      const input = document.getElementById('entradaUsuario');
      const mensagem = input.value.trim();
      if (!messagem) return;

      const chatBox = document.getElementById('caixaChat');
      const userDiv = document.createElement('div');
      userDiv.className = 'mensagem-chat';
      userDiv.innerHTML = `<span class='usuario-chat'>Você:</span> ${mensagem}`;
      chatBox.appendChild(userDiv);

      const respostaDiv = document.createElement('div');
      respostaDiv.className = 'mensagem-chat';
      respostaDiv.innerHTML = `<span class='usuario-chat'>Bot:</span> Essa é uma resposta automática.`;
      chatBox.appendChild(respostaDiv);

      input.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;
    }

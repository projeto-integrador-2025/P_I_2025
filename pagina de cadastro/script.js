const login = () => {
window.location.href = "http://127.0.0.1:5501/Pagina%20Inicial/index.html";

}
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

  $(document).ready(function () {
    $('#registerForm').on('submit', function (e) {
      e.preventDefault();

      // Limpar mensagens
      $('.error-message').text('');
      $('#registerSuccess').text('');

      // Capturar valores
      const nome = $('#nome').val().trim();
      const email = $('#email').val().trim();
      const senha = $('#senha').val();
      const confirmarSenha = $('#confirmarSenha').val();

      let isValid = true;

      // Validações
      if (nome === '') {
        $('#nomeError').text('Por favor, informe seu nome.');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '') {
        $('#emailError').text('Por favor, informe seu e-mail.');
        isValid = false;
      } else if (!emailRegex.test(email)) {
        $('#emailError').text('E-mail inválido.');
        isValid = false;
      }

      if (senha.length < 6) {
        $('#senhaError').text('A senha deve ter no mínimo 6 caracteres.');
        isValid = false;
      }

      if (confirmarSenha !== senha) {
        $('#confirmarSenhaError').text('As senhas não coincidem.');
        isValid = false;
      }

      // Se for válido, enviar para a API
      if (isValid) {
        $.ajax({
          url: 'https:localhost:5286/api/Login', // substitua pela URL real da sua API
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
          }),
          success: function (response) {
            $('#registerSuccess').text('Cadastro realizado com sucesso!');
            $('#registerForm')[0].reset(); // limpa o formulário
          },
          error: function (xhr) {
            const errorMsg = xhr.responseJSON?.message || 'Erro ao cadastrar. Tente novamente.';
            $('#registerError').text(errorMsg);
          }
        });
      }
    });
  });

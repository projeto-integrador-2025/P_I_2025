const login = () => {
window.location.href ="http://127.0.0.1:5501/Pagina%20Inicial/index.html";

}


  $(document).ready(function () {
    $('#registerForm').on('submit', function (e) {
      e.preventDefault();

      
      $('.error-message').text('');
      $('#registerSuccess').text('');

     
      const nome = $('#nome').val().trim();
      const email = $('#email').val().trim();
      const senha = $('#senha').val();
      const confirmarSenha = $('#confirmarSenha').val();

      let isValid = true;

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

      if (isValid) {
        $.ajax({
          url: 'http://54.85.232.244:8080/api/Login', 
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
          }),
          success: function (response) {
            $('#registerSuccess').text('Cadastro realizado com sucesso!');
            $('#registerForm')[0].reset();
          },
          error: function (xhr) {
            const errorMsg = xhr.responseJSON?.message || 'Erro ao cadastrar. Tente novamente.';
            $('#registerError').text(errorMsg);
          }
        });
      }
    });
  });

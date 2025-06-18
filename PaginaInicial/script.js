$(document).ready(function () {
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();

    // Limpa mensagens de erro
    $('.error-message').text('');

    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    let isValid = true;

    if (email === '') {
      $('#emailError').text('Informe seu e-mail.');
      isValid = false;
    }

    if (password === '') {
      $('#passwordError').text('Informe sua senha.');
      isValid = false;
    }

    if (!isValid) return;

    // Requisição GET para buscar todos os usuários
    $.ajax({
      url: 'http://54.85.232.244:8080/api/login',
      method: 'GET',
      success: function (usuarios) {
        // Verifica se existe um usuário com o e-mail e senha fornecidos
        const usuarioEncontrado = usuarios.find(function (usuario) {
          return usuario.email === email && usuario.senha === password;
        });

        if (usuarioEncontrado) {
          // Armazena o usuário no localStorage
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
          alert('Login bem-sucedido!');
          // Redireciona para a dashboard
          window.location.href = 'http://localhost:3000/P_I_2025/Dasbhoard/Dashboard.html';
        } else {
          $('#emailError').text('E-mail ou senha incorretos.');
          alert('Usuário não encontrado');
        }
      },
      error: function () {
        alert('Erro ao buscar usuários no servidor.');
      }
    });
  });
});

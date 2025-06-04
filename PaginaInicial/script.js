
$(document).ready(function () {
  const API_URL ='http://localhost:5286/api/Login/verificar';

  
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();        

    
    $('.error-message').text('');

    
    const email    = $('#email').val().trim();
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
    $.ajax({
      url:'http://localhost:5286/api/Login/verificar',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        email: email,
        senha: password       
      }),
      success: function (response) {
        
        localStorage.setItem('usuarioLogado', JSON.stringify(response));
        alert('O login bem sucedido');
        window.location.href ='http://127.0.0.1:5501/P_I_2025/Dasbhoard/Dashboard.html';
 
      },
      error: function (xhr) {
        
        const mensagem =
          xhr.responseText || 'E-mail ou senha inválidos. Tente novamente.';
        $('#emailError').text(mensagem);
        alert('Erro no login')
      }
    });
  });
});

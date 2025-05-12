const login = () => {
window.location.href = "http://127.0.0.1:5501/Pagina%20Inicial/index.html";

}

    function validarSenha() {
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return false;
            }

        else alert("Cadastro realizado com sucesso!");
        return true;
    }
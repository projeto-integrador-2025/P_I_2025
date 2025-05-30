document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'http://localhost:5286/api/Peca';

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      // Contadores
      let qtdMetal = 0;
      let qtdPlasticos = 0;
      let qtdRejeitados = 0; 

      data.forEach(peca => {
        if (peca.tipoMaterial.toLowerCase() === 'metal') {
          qtdMetal++;
        } else if (peca.tipoMaterial.toLowerCase() === 'plástico' || peca.tipoMaterial.toLowerCase() === 'plastico') {
          qtdPlasticos++;
        }
        
      });

      const qtdTotal = qtdMetal + qtdPlasticos;

      
      document.getElementById('qtdMetal').textContent = `Qtd Metal: ${qtdMetal}`;
      document.getElementById('qtdPlasticos').textContent = `Qtd Plásticos: ${qtdPlasticos}`;
      document.getElementById('qtdTotal').textContent = `Qtd Total: ${qtdTotal}`;
      document.getElementById('qtdRejeitados').textContent = `Qtd Rejeitados: ${qtdRejeitados}`;
    })
    .catch(err => {
      console.error('Erro ao buscar peças:', err);
    });
});

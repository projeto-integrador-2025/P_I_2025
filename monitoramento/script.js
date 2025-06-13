document.addEventListener('DOMContentLoaded', () => {
  const API_PECA = 'http://localhost:5286/api/Peca';
  const API_CICLO = 'http://localhost:5286/api/ciclo';
  const API_ESTADO = 'http://localhost:5286/api/estacaoEstado';

  fetch(API_CICLO)
    .then(response => response.json())
    .then(ciclos => {
      let tempoTotalMs = 0;
      let ultimaEstacao = null;
      let ultimaParadaTimestamp = null;

      ciclos.forEach(ciclo => {
        const inicio = new Date(ciclo.tempoInicial);
        const fim = new Date(ciclo.timestampCiclo);

        const duracao = fim - inicio; // em milissegundos
        tempoTotalMs += duracao;

        // Verifica se é o mais recente
        if (!ultimaParadaTimestamp || fim > ultimaParadaTimestamp) {
          ultimaParadaTimestamp = fim;
          ultimaEstacao = ciclo.idEstacao;
        }
      });

      const tempoTotalSegundos = (tempoTotalMs / 1000).toFixed(1);

      document.getElementById('tempoTotal').textContent = `Tempo de Processo da Máquina: ${tempoTotalSegundos} s`;


      let ultimaParadaFormatada = '-';
      if (ultimaParadaTimestamp) {
        const options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'America/Sao_Paulo'
        };
        ultimaParadaFormatada = ultimaParadaTimestamp.toLocaleString('pt-BR', options);
      }

      document.getElementById('tempoFim').textContent = `Última Parada: Estação ${ultimaEstacao ?? '-'} às ${ultimaParadaFormatada}`;
    })
    .catch(err => {
      console.error('Erro ao buscar ciclos:', err);
    });

fetch(API_ESTADO)
  .then(response => response.json())
  .then(estados => {
    if (estados.length > 0) {
      const estado = estados[0]; // Pega o primeiro (único) estado
      const ligadoDesligado = estado.estado ? 'Ligado' : 'Desligado';
      document.getElementById('esteira').textContent = `Esteira: ${ligadoDesligado}`;
    } else {
      document.getElementById('esteira').textContent = 'Esteira: -';
    }
  })
  .catch(err => {
    console.error('Erro ao buscar estados:', err);
  });


  
  fetch(API_PECA)
    .then(response => response.json())
    .then(data => {

      let qtdMetal = 0;
      let qtdPlasticos = 0;
      let qtdRejeitados = 0;

      data.forEach(peca => {
        if (peca.tipoMaterial.toLowerCase() === 'metalica') {
          qtdMetal++;
        } else if (peca.tipoMaterial.toLowerCase() === 'plástico' || peca.tipoMaterial.toLowerCase() === 'plastico') {
          qtdPlasticos++;
        }

        else if (peca.tipoMaterial.toLowerCase() === 'refugo' || peca.tipoMaterial.toLowerCase() === 'refugo') {
          qtdRejeitados++;
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

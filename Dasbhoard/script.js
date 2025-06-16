const labels = Array.from({ length: 10 }, (_, i) => `T-${i + 1}`);

    const chartVolume = new Chart(document.getElementById("chartVolume"), {
  type: "line",
  data: {
    labels: [], // agora será preenchido com datas
    datasets: [{
      label: "Volume (kg)",
      data: [],
      borderColor: "#0d6efd",
      backgroundColor: "rgba(13, 245, 253, 0.2)",
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 3
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1
      }
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#555' } },
      x: { ticks: { color: '#555' } }
    }
  }
});


    const chartErro = new Chart(document.getElementById("chartErro"), {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Erro (%)",
          data: [],
          backgroundColor: "#dc3545",
          borderRadius: 8,
          barThickness: 20
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#000',
            bodyColor: '#000',
            borderColor: '#ccc',
            borderWidth: 1
          }
        },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#555' } },
          x: { ticks: { color: '#555' } }
        }
      }
    });

    const chartEficiencia = new Chart(document.getElementById("chartEficiencia"), {
  type: "bar",
  data: {
    labels: ["Manhã", "Tarde", "Noite", "Madrugada"],
    datasets: [{
      label: "Eficiência (%)",
      data: [0, 0, 0, 0],
      backgroundColor: "#198754",
      borderRadius: 8,
      barThickness: 20
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: '#555' }
      },
      x: {
        ticks: { color: '#555' }
      }
    }
  }
});


    const chartDesempenho = new Chart(document.getElementById("chartDesempenho"), {
      type: "radar",
      data: {
        labels: ["Velocidade", "Qualidade", "Eficiência", "Disponibilidade", "Rendimento"],
        datasets: [{
          label: "Desempenho",
          data: [0, 0, 0, 0, 0],
          backgroundColor: "rgba(40,167,69,0.3)",
          borderColor: "#28a745",
          pointBackgroundColor: "#28a745",
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#000',
            bodyColor: '#000',
            borderColor: '#ccc',
            borderWidth: 1
          }
        },
        scales: {
          r: {
            angleLines: { color: '#ccc' },
            grid: { color: '#eee' },
            pointLabels: { color: '#555' },
            ticks: { color: '#555', beginAtZero: true, max: 100 }
          }
        }
      }
    });

    const chartTipos = new Chart(document.getElementById("chartTipos"), {
  type: "doughnut",
  data: {
    labels: ["Plástico", "Metálica", "Refugo"],
    datasets: [{
      label: "Quantidade",
      data: [0, 0, 0],
      backgroundColor: ["#0d6efd", "#ffc107", "#dc3545"],
      borderColor: "#fff",
      borderWidth: 2
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#555"
        }
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1
      }
    }
  }
});


  function atualizarDados() {
  $.ajax({
    url: 'http://localhost:5286/api/Peca',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log('Dados da API:', data);

      // ======= 1. Agrupa por minuto =======
      const agrupadoPorMinuto = {};
      data.forEach(peca => {
        const dataCriacao = new Date(peca.dataCriacao);

        const ano = dataCriacao.getFullYear();
        const mes = String(dataCriacao.getMonth() + 1).padStart(2, '0');
        const dia = String(dataCriacao.getDate()).padStart(2, '0');
        const hora = String(dataCriacao.getHours()).padStart(2, '0');
        const minuto = String(dataCriacao.getMinutes()).padStart(2, '0');

        const dataFormatada = `|${dia}/${mes} - ${hora}:${minuto}|`; // yyyy-mm-dd HH:mm

        if (!agrupadoPorMinuto[dataFormatada]) {
          agrupadoPorMinuto[dataFormatada] = 0;
        }

        agrupadoPorMinuto[dataFormatada]++;
      });

      const minutosOrdenados = Object.keys(agrupadoPorMinuto).sort();
      const volumes = minutosOrdenados.map(minuto => agrupadoPorMinuto[minuto] * 0.2); // 0.2 kg por peça

      // Atualiza gráfico de volume com agrupamento por minuto
      chartVolume.data.labels = minutosOrdenados;
      chartVolume.data.datasets[0].data = volumes;
      chartVolume.update();

      // Atualiza volume total exibido
      const volumeTotal = volumes.reduce((a, b) => a + b, 0);
      document.getElementById("volume").textContent = `${volumeTotal.toFixed(2)} kg`;

      // ======= 2. Contagem por tipo de material =======
      const contagem = { plastico: 0, metalica: 0, refugo: 0 };
      data.forEach(peca => {
        const tipo = peca.tipoMaterial.toLowerCase();
        if (tipo === 'plástico' || tipo === 'plastico') contagem.plastico++;
        else if (tipo === 'metalica') contagem.metalica++;
        else if (tipo === 'refugo') contagem.refugo++;
      });

      // Atualiza gráfico de tipos de material (pizza)
chartTipos.data.datasets[0].data = [
  contagem.plastico,
  contagem.metalica,
  contagem.refugo
];
chartTipos.update();


      const totalProcessado = contagem.plastico + contagem.metalica;
      const totalGeral = totalProcessado + contagem.refugo;
      const erro = totalGeral > 0 ? (contagem.refugo / totalGeral) * 100 : 0;

      document.getElementById("erro").textContent = `${erro.toFixed(2)}%`;

      // Atualiza gráfico de erro (barras)
      if (chartErro.data.datasets[0].data.length >= 10) {
        chartErro.data.datasets[0].data.shift();
      }
      chartErro.data.datasets[0].data.push(erro.toFixed(2));
      chartErro.update();


    // ======= 3. Eficiência por turno =======
const eficienciaPorTurno = { manha: { total: 0, erros: 0 },
                             tarde: { total: 0, erros: 0 },
                             noite: { total: 0, erros: 0 },
                             madrugada: { total: 0, erros: 0 } };

data.forEach(peca => {
  const hora = new Date(peca.dataCriacao).getHours();
  const tipo = peca.tipoMaterial.toLowerCase();

  let turno = '';
  if (hora >= 6 && hora < 12) turno = 'manha';
  else if (hora >= 12 && hora < 18) turno = 'tarde';
  else if (hora >= 18 && hora < 24) turno = 'noite';
  else turno = 'madrugada';

  eficienciaPorTurno[turno].total++;

  if (tipo === 'refugo') {
    eficienciaPorTurno[turno].erros++;
  }
});

const eficiencia = ["manha", "tarde", "noite", "madrugada"].map(turno => {
  const { total, erros } = eficienciaPorTurno[turno];
  return total > 0 ? ((1 - erros / total) * 100).toFixed(2) : 0;
});

chartEficiencia.data.datasets[0].data = eficiencia;
chartEficiencia.update();


      
    },
    error: function (xhr, status, error) {
      console.error('Erro na requisição:', status, error);
      document.getElementById("volume").textContent = 'Erro';
      document.getElementById("erro").textContent = 'Erro';
      document.getElementById("desempenho").textContent = 'Erro';
    }
  });
}


setInterval(atualizarDados, 3000);
atualizarDados();




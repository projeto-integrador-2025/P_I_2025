document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de Materiais Processados
    const ctx = document.getElementById('graficoMateriais').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        datasets: [{
          label: 'Unidades Processadas',
          data: [1200, 1450, 1100, 1500, 1600, 900],
          backgroundColor: '#E9E9E9',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 200
            },
            title: {
              display: true,
              text: 'Unidades'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Dia da Semana'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  
    // Gráfico de Taxa de Erro
    const erroCtx = document.getElementById('graficoErro').getContext('2d');
    new Chart(erroCtx, {
      type: 'pie',
      data: {
        labels: ['Erros em Metais', 'Erros em Plástico', 'Acertos'],
        datasets: [{
          label: 'Distribuição',
          data: [8, 5, 87],
          backgroundColor: [
            '#e57373',
            '#ffb74d',
            '#81c784'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 18,
              boxHeight: 18,
              color: '#333',
              font: {
                size: 14,
                weight: '500'
              },
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#111',
            bodyColor: '#444',
            borderColor: '#ccc',
            borderWidth: 1
          }
        }
      }
    });
  
    // Gráfico de Desempenho
    const ctp = document.getElementById('graficoDesempenho').getContext('2d');
    new Chart(ctp, {
      type: 'line',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        datasets: [{
          label: 'Produção (Unidades)',
          data: [1100, 1250, 1320, 1280, 1400, 950],
          fill: true,
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          borderColor: '#4f46e5',
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: '#4f46e5',
          pointBorderColor: '#fff',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Unidades'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Dia da Semana'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  });


  document.getElementById('btnDashboard').onclick = function () {
    window.location.href = 'Dashboard.html';
  };
  
  document.getElementById('btnChatbot').onclick = function () {
    window.location.href = 'chatbot.html';
  };
  
  document.getElementById('btnMonitoramento').onclick = function () {
    window.location.href = 'monitoramento.html';
  };
  
  
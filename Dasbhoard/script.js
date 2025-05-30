const labels = Array.from({ length: 10 }, (_, i) => `T-${i + 1}`);

    const chartVolume = new Chart(document.getElementById("chartVolume"), {
      type: "line",
      data: {
        labels,
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

    function atualizarDados() {
      const volume = Math.floor(Math.random() * 1000 + 500);
      const erro = (Math.random() * 5).toFixed(2);
      const desempenho = Array.from({ length: 5 }, () => (Math.random() * 50 + 50).toFixed(1));

      document.getElementById("volume").textContent = `${volume} kg`;
      document.getElementById("erro").textContent = `${erro}%`;
      document.getElementById("desempenho").textContent = `${(
        desempenho.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 5
      ).toFixed(1)}%`;

      if (chartVolume.data.datasets[0].data.length >= 10) {
        chartVolume.data.datasets[0].data.shift();
        chartErro.data.datasets[0].data.shift();
      }

      chartVolume.data.datasets[0].data.push(volume);
      chartErro.data.datasets[0].data.push(parseFloat(erro));
      chartDesempenho.data.datasets[0].data = desempenho;

      chartVolume.update();
      chartErro.update();
      chartDesempenho.update();
    }

    setInterval(atualizarDados, 3000);
    atualizarDados();

    const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });
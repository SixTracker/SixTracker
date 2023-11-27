function plotarGraficoDisco(resposta) {
    ctx = document.getElementById("analiseSistema").getContext("2d");
  
    console.log("INICIANDO PLOTAGEM DE GRÁFICOS")
  
    let labels = [];
  
    // Criando estrutura para plotar gráfico - dados
    let dados = {
      labels: labels,
      datasets: [{
        label: 'Disco',
        data: [],
        backgroundColor: [],
        pointBackgroundColor: [],
        borderColor: ['#393d42'],
        tension: 0.3,
        fill: false,
        pointRadius: 6
      }]
    };
  
  
    console.log('-------------------PLOT DISCO---------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  
  
    for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      dados.datasets[0].data.push(registro.DISCO);
      labels.push(registro.intervalo_tempo);
  
      // Definindo a cor com base nas condições
      if (registro.DISCO <= 80) {
        dados.datasets[0].pointBackgroundColor.push('#00FF00');
        dados.datasets[0].backgroundColor.push('#00FF00');
      } else if (registro.DISCO <= 90) {
        dados.datasets[0].pointBackgroundColor.push('#f6ff00');
        dados.datasets[0].backgroundColor.push('#f6ff00');
      } else {
        dados.datasets[0].pointBackgroundColor.push('#FF0000');
        dados.datasets[0].backgroundColor.push('#FF0000');
      }   
    };
  
    const config = {
      type: 'line',
      data: dados,
      fill: false
    }
  
  
    setTimeout(() => atualizarGraficoDisco(dados), 5000);
  
  }

  function atualizarGraficoDisco( dados) {

    fetch(`/isabel/medidasAtualizadaCPU`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {              
  
                if (novoRegistro[0].intervalo_tempo == dados.datasets[0].data.intervalo_tempo) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].intervalo_tempo)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].intervalo_tempo); // incluir um novo momento
  
                    dados.datasets[0].data.shift();  // apagar o primeira medida
                    dados.datasets[0].data.push(novoRegistro[0].CPU); // incluir uma nova medida            
  
                    chartMediaCPU.update();
                }
  
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoCPU = setTimeout(() => atualizarGraficoCPU(idSalas, dados, chartMediaCPU), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoCPU = setTimeout(() => atualizarGraficoCPU(idSalas, dados, chartMediaCPU), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
  
  }
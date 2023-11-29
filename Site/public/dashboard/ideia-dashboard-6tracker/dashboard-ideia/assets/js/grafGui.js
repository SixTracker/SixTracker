function obterDadosMediaCPU(idSalas) {
  console.log("CPU")

  fetch(`/graficosGui/medidasCPU/${idSalas}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos DE CPU: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        plotarGraficoCPU(resposta, idSalas);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoCPU(resposta, idSalas) {
  ctx = document.getElementById("analiseSistema").getContext("2d");

  console.log("INICIANDO PLOTAGEM DE GRÁFICOS")

  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
      label: 'Usada',
      data: [],
      backgroundColor: [],
      pointBackgroundColor: [],
      borderColor: ['#393d42'],
      tension: 0.3,
      fill: false,
      pointRadius: 6
    }]
  };


  console.log('-------------------PLOT CPU---------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')


  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    dados.datasets[0].data.push(registro.CPU);
    labels.push(registro.intervalo_tempo);

    // Definindo a cor com base nas condições
    if (registro.CPU <= 80) {
      dados.datasets[0].pointBackgroundColor.push('#00FF00');
      dados.datasets[0].backgroundColor.push('#00FF00');
    } else if (registro.CPU <= 90) {
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

  // Adicionando gráfico criado em div na tela
  let chartMediaCPU = new Chart(
    ctx,
    config
  );

  setTimeout(() => atualizarGraficoCPU(idSalas, dados, chartMediaCPU), 5000);

}

function atualizarGraficoCPU(idSalas, dados, chartMediaCPU) {

  fetch(`/graficosGui/medidasAtualizadaCPU/${idSalas}`, { cache: 'no-store' }).then(function (response) {
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



function obterDadosMediaRAM(idSalas) {
  console.log("RAM")

  fetch(`/graficosGui/medidasRAM/${idSalas}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        plotarGraficoRAM(resposta, idSalas);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoRAM(resposta, idSalas) {
  ctx2 = document.getElementById("analiseSistema2").getContext("2d");
  var cardRam = document.getElementById('CardRAM')
  cardRam.style.bottom = '52.4vh';

  console.log("INICIANDO PLOTAGEM DE GRÁFICOS")

  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
      label: 'Usada',
      data: [],
      backgroundColor: [],
      pointBackgroundColor: [],
      borderColor: ['#393d42'],
      tension: 0.3,
      fill: null,
      pointRadius: 6
    }]
  };


  console.log('-------------------PLOT RAM---------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')


  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    dados.datasets[0].data.push(registro.RAM);
    labels.push(registro.intervalo_tempo);

    // Definindo a cor com base nas condições
    if (registro.RAM <= 80) {
      dados.datasets[0].pointBackgroundColor.push('#00FF00');
      dados.datasets[0].backgroundColor.push('#00FF00');
    } else if (registro.RAM <= 90) {
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

  // Adicionando gráfico criado em div na tela
  let chartMediaRAM = new Chart(
    ctx2,
    config
  );

  setTimeout(() => atualizarGraficoRAM(idSalas, dados, chartMediaRAM), 5000);

}

function atualizarGraficoRAM(idSalas, dados, chartMediaRAM) {

  fetch(`/graficosGui/medidasAtualizadaRAM/${idSalas}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (novoRegistro) {              

              if (novoRegistro[0].intervalo_tempo == dados.datasets[0].data.intervalo_tempo) {
                  console.log("---------------------------------------------------------------")
                  console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                  console.log("Horário do novo dado capturado:")
                  console.log(novoRegistro[0].data_hora)
                  console.log("Horário do último dado capturado:")
                  console.log(dados.labels[dados.labels.length - 1])
                  console.log("---------------------------------------------------------------")
              } else {
                  // tirando e colocando valores no gráfico
                  dados.labels.shift(); // apagar o primeiro
                  dados.labels.push(novoRegistro[0].intervalo_tempo); // incluir um novo momento

                  dados.datasets[0].data.shift();  // apagar o primeira medida
                  dados.datasets[0].data.push(novoRegistro[0].RAM); // incluir uma nova medida            

                  chartMediaRAM.update();
              }

              // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
              proximaAtualizacaoRAM = setTimeout(() => atualizarGraficoRAM(idSalas, dados, chartMediaRAM), 5000);
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacaoRAM = setTimeout(() => atualizarGraficoRAM(idSalas, dados, chartMediaRAM), 5000);
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });

}

function limparCPU(){
  let chartMediaRAM = new Chart(
    document.getElementById("analiseSistema"),
  );

  chartMediaRAM.clear()
}

function limparRAM(){
  let chartMediaRAM = new Chart(
    document.getElementById("analiseSistema2"),
  );

  chartMediaRAM.clear()
}



var kpiCpu = document.getElementById("KpiCPU");
var kpiRam = document.getElementById("KpiRAM");
var kpidtCPU = document.getElementById("kpidtCPU");
var kpidtRam = document.getElementById("kpidtRAM");
valores_kpi_desempenho = [kpiCpu, kpiRam, kpidtCPU, kpidtRam]

function obterDadosDesempenhoMax(idSala) {  
  fetch(`/graficosGui/obterDadosDesempenhoMaxCPU/${idSala}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos DE CPU Max: ${JSON.stringify(resposta)}`);              
              plotarKpiDesempenhoMax(resposta, idSala);
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarKpiDesempenhoMax(resposta, idSala) {
  for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      if (registro.nomeTipo === "CPU") {
          valores_kpi_desempenho[0].innerHTML = (registro.maximo_valor) + "%";
          valores_kpi_desempenho[2].innerHTML = "Data de Captura: " + (registro.intervalo_tempo);
      }
      if (registro.nomeTipo === "RAM") {
          valores_kpi_desempenho[1].innerHTML = (registro.maximo_valor) + "%";
          valores_kpi_desempenho[3].innerHTML = "Data de Captura: " + (registro.intervalo_tempo);
      }
     
  }
 
  setTimeout(() => atualizarKpiDesempenhoMax(idSala), 2000);
}

function atualizarKpiDesempenhoMax(idSala) {

  fetch(`/medidas/tempo-realDesempenhoMedia/${idSala}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (novoRegistro) {
              console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
              valores_kpi_desempenho = [kpiCpu, kpiRam]

              for (i = 0; i < resposta.length; i++) {
                var registro = resposta[i];
                if (registro.nomeTipo === "CPU") {
                    valores_kpi_desempenho[0].innerHTML = (registro.maximo_valor) + "%";
                }
                if (registro.nomeTipo === "RAM") {
                    valores_kpi_desempenho[1].innerHTML = (registro.maximo_valor) + "%";
                }               
            }
             
              // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
              proximaAtualizacaoKpiDesempenhoMax = setTimeout(() => atualizarKpiDesempenhoMax(idSala), 5000);
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacaoKpiDesempenhoMax = setTimeout(() => atualizarKpiDesempenhoMax(idSala), 5000);
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });

}

function limparplotarKpiDesempenhoMax() {
  for (i = 0; i <= valores.length; i++) {
      valores_kpi_desempenho[i].innerHTML = "";
  }
}

// buscarEstadoServidor();

// function buscarEstadoServidor() {

//   fkServidor = sessionStorage.ID_SERVIDOR;

//   if (fkServidor == "" || fkServidor == undefined) {
//     alert("Servidor não encontrado!")
//   } else {
//     fetch("/servidor/buscarEstadoServidor", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "fkServidor": fkServidor
//       })
//     }).then((res) => res.json())
//       .then((res) => {
//         if (res.error) {
//           console.log("Aconteceu algum erro (res.error = true)")
//         }
//         else {
//           const resultado = res[0][0];
//           if (resultado.qtsAlertasCpu > 20) {
//             cpuEstado.innerHTML = "Risco";
//           } else if (resultado.qtsAlertasCpu <= 20 && resultado.qtsAlertasCpu > 10) {
//             cpuEstado.innerHTML = "Alerta";
//           } else {
//             cpuEstado.innerHTML = "Estável";
//           }


//           if (resultado.qtsAlertasRam > 20) {
//             ramEstado.innerHTML = "Risco";
//           } else if (resultado.qtsAlertasRam <= 20 && resultado.qtsAlertasRam > 10) {
//             ramEstado.innerHTML = "Alerta";
//           } else {
//             ramEstado.innerHTML = "Estável";
//           }


//           if (resultado.qtsAlertasDisco > 20) {
//             discoEstado.innerHTML = "Risco";
//           } else if (resultado.qtsAlertasDisco <= 20 && resultado.qtsAlertasDisco > 10) {
//             discoEstado.innerHTML = "Alerta";
//           } else {
//             discoEstado.innerHTML = "Estável";
//           }

//         }
//       }).catch(function (res) {

//       });
//   }
// }



function obterDadosMediaCPU(idSalas) {
  console.log("CPU")

  fetch(`/dashAnalista/medidasCPU/${idSalas}`, { cache: 'no-store' }).then(function (response) {
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

  fetch(`/dashAnalista/medidasAtualizadaCPU/${idSalas}`, { cache: 'no-store' }).then(function (response) {
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
                  KpiCPU.innerHTML = (novoRegistro[0].CPU).toFixed(2) + "%"       

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

  fetch(`/dashAnalista/medidasRAM/${idSalas}`, { cache: 'no-store' }).then(function (response) {
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

  fetch(`/dashAnalista/medidasAtualizadaRAM/${idSalas}`, { cache: 'no-store' }).then(function (response) {
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
                  KpiRAM.innerHTML = (novoRegistro[0].RAM).toFixed(2) + "%"              

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


// DISCO



function obterDadosMediaDISCO(idSalas) {
  console.log("DISCO")

  fetch(`/dashAnalista/medidasDISCO/${idSalas}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos DE DISCO: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        plotarGraficoDISCO(resposta, idSalas);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoDISCO(resposta, idSalas) {
  ctx3 = document.getElementById("analiseSistema3").getContext("2d");

  console.log("INICIANDO PLOTAGEM DE GRÁFICOS")

  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
      label: 'Uso de Disco',
      data: [],
      backgroundColor: [],
      pointBackgroundColor: [],
      borderColor: ['#393d42'],
      tension: 0.3,
      fill: null,
      pointRadius: 6
    }]
  };


  console.log('-------------------PLOT DISCO---------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')


  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    dados.datasets[0].data.push(registro.DISCO);
    

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

  // Adicionando gráfico criado em div na tela
  let chartMediaDISCO = new Chart(
    ctx3,
    config
  );

  setTimeout(() => atualizarGraficoDISCO(idSalas, dados, chartMediaDISCO), 5000);

}

function atualizarGraficoDISCO(idSalas, dados, chartMediaDISCO) {

  fetch(`/dashAnalista/medidasAtualizadaDISCO/${idSalas}`, { cache: 'no-store' }).then(function (response) {
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
                  dados.datasets[0].data.push(novoRegistro[0].DISCO); // incluir uma nova medida  
                  KpiDISCO.innerHTML = (novoRegistro[0].DISCO).toFixed(2) + "%"              

                  chartMediaRAM.update();
              }

              // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
              proximaAtualizacaoDISCO = setTimeout(() => atualizarGraficoDISCO(idSalas, dados, chartMediaDISCO), 5000);
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacaoDISCO = setTimeout(() => atualizarGraficoDISCO(idSalas, dados, chartMediaDISCO), 5000);
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });

}



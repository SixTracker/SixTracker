var kpi_temp_CPU = document.getElementById("kpi-temp-CPU")
var kpi_porcentagem = document.getElementById("kpi-porcentagem") + 1;

function obterDadosTempCPU(idServidor) {
    console.log("tempxcpu")
  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }
  fetch(`/tiago/ultimasTempCPU/12`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos DE CPU: ${JSON.stringify(resposta)}`);
              resposta.reverse();

              plotarGraficoTempCPU(resposta, idServidor);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGraficoTempCPU(resposta, idServidor) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
        label: 'Temperatura em graus Celsius: ',
        data: [],
        backgroundColor: [],
        borderColor: ['#393d42'],
        tension: 0.3,
        fill: false, 
        pointRadius: 6
    }]
};

  console.log('----------------------------------------------')
  console.log('-------------------PLOT temp CPU---------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)
// ...

// Dentro do seu loop for na função plotarGraficoDisco
for (i = resposta.length - 1; i >= 0; i--) {
    var registro = resposta[i];
    dados.datasets[0].data.push(registro.valorRegistro);
    labels.push(registro.dataRegistro);
  
    if (registro.valorRegistro != null) {
        // Atualize kpiDisco.textContent em vez de atribuir diretamente ao elemento
        kpi_temp_CPU.textContent = registro.valorRegistro + '°C';
    } else {
        kpi_temp_CPU.textContent = "Erro";
    }
    if (registro.valorRegistro != null) {
        // Atualize kpiDisco.textContent em vez de atribuir diretamente ao elemento
        kpi_porcentagem.textContent = registro.valorRegistro + '%';
    } else {
        kpi_porcentagem.textContent = "Erro";
    }
  
  
    // Definindo a cor com base nas condições
    if (registro.valorRegistro <= 15) {
        dados.datasets[0].backgroundColor.push('#00FF00');
        // dados.datasets[0].borderColor.push('#00FF00');
    } else if (registro.valorRegistro <= 39) {
        dados.datasets[0].backgroundColor.push('#f6ff00');
        // dados.datasets[0].borderColor.push('#f6ff00');
    } else {
        dados.datasets[0].backgroundColor.push('#FF0000');
        // dados.datasets[0].borderColor.push('#FF0000');
    }
  }
  
  // ...

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'line',
    data: dados,
    fill: false,
  }
  // Adicionando gráfico criado em div na tela
  let chart_tempCPU = new Chart(
    document.getElementById(`chart_tempCPU`),
    config
);

setTimeout(() => atualizarGraficoTempRAM(idServidor, dados, chart_tempCPU ), 5000);
}


function atualizarGraficoTempRAM(idServidor, dados, chart_tempCPU) {

fetch(`/tiago/tempoRealTempCPU/12`, { cache: 'no-store' }).then(function (response) {
  if (response.ok) {
    response.json().then(function (novoRegistro) {

        // obterDadosCPU(idMaquina);
        // // alertar(novoRegistro, idMaquina);
        // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        // console.log(`Dados atuais do gráfico:`);
        // console.log(dados);

        if (novoRegistro[0].dataRegistro == dados.datasets[0].data.dataRegistro) {
            console.log("---------------------------------------------------------------")
            console.log("Como não há dados novos para captura, o gráfico não atualizará.")
            // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
            console.log("Horário do novo dado capturado:")
            console.log(novoRegistro[0].dataRegistro)
            console.log("Horário do último dado capturado:")
            console.log(dados.labels[dados.labels.length - 1])
            console.log("---------------------------------------------------------------")
        } else {
            // tirando e colocando valores no gráfico
            dados.labels.shift(); // apagar o primeiro
            dados.labels.push(novoRegistro[0].dataRegistro); // incluir um novo momento

            dados.datasets[0].data.shift();  // apagar o primeira medida
            dados.datasets[0].data.push(novoRegistro[0].valorRegistro); // incluir uma nova medida


            if(novoRegistro.valorRegistro != null){
                kpi_temp_CPU = novoRegistro.valorRegistro;
          } else {
            kpi_temp_CPU = "Erro"
            }
            if(novoRegistro.valorRegistro != null){
                kpi_porcentagem = novoRegistro.valorRegistro;
            } else {
                kpi_porcentagem = "Erro"
              }

            chart_tempCPU.update();
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(() => atualizarGraficoTempRAM(idServidor, dados, chart_tempCPU), 5000);
    });
} else {
    console.error('Nenhum dado encontrado ou erro na API');
    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
    proximaAtualizacao = setTimeout(() => atualizarGraficoTempRAM(idServidor, dados, chart_tempCPU), 5000);
}
})
.catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
});

}
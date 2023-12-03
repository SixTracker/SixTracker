var kpiDisco = document.getElementById("kpi-disco");

function obterDadosDisco() {
    console.log("----------------Entrando ObterDadosDisco -----------------")
  fetch(`/medidas/ultimasDisco/`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos DE Disco: ${JSON.stringify(resposta)}`);
              resposta.reverse();

              plotarGraficoDisco(resposta);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGraficoDisco(resposta) {

  console.log('-------------------iniciando plotagem do gráfico-------------------------.');

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
        label: 'Usada',
        data: [],
        backgroundColor: [],
        borderColor: ['#393d42'],
        tension: 0.3,
        fill: false, 
        pointRadius: 6
    }]
};

  
  console.log('-------------------PLOT Disco---------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

 // ...

// Dentro do seu loop for na função plotarGraficoDisco
for (i = resposta.length - 1; i >= 0; i--) {
  var registro = resposta[i];
  dados.datasets[0].data.push(registro.Disco);
  labels.push(registro.intervalo_tempo);

  if (registro.Disco != null) {
      // Atualize kpiDisco.textContent em vez de atribuir diretamente ao elemento
      kpiDisco.textContent = registro.Disco + '%';
  } else {
      kpiDisco.textContent = "Erro";
  }

  // Definindo a cor com base nas condições
  if (registro.Disco <= 15) {
      dados.datasets[0].backgroundColor.push('#00FF00');
      // dados.datasets[0].borderColor.push('#00FF00');
  } else if (registro.Disco <= 39) {
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
    type: 'bar',
    data: dados,
    fill: false,
  }
  
  // Adicionando gráfico criado em div na tela
  let ChartDisco= new Chart(
      document.getElementById(`chartEstado`),
      config
  );

  setTimeout(() => atualizarGraficoDisco(dados, ChartDisco), 5000);
}


function atualizarGraficoDisco(dados, ChartDisco) {

  fetch(`/medidas/tempoRealDisco/`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {          

          if (novoRegistro[0].intervalo_tempo == dados.datasets[0].data.intervalo_tempo) {
              console.log("---------------------------------------------------------------")
              console.log("Como não há dados novos para captura, o gráfico não atualizará.")
              // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
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
              dados.datasets[0].data.push(novoRegistro[0].Disco); // incluir uma nova medida

            if(novoRegistro.Disco != null){
                kpiDisco = novoRegistro.Disco;
            } else {
                kpiDisco = "Erro"
              }


              ChartDisco.update();
          }

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(() => atualizarGraficoDisco(dados, ChartDisco), 5000);
      });
  } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacao = setTimeout(() => atualizarGraficoDisco(dados, ChartDisco), 5000);
  }
})
  .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
  });

}
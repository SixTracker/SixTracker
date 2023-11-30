var kpi_temp_CPU = document.getElementById("kpi-temp-CPU")
var kpi_porcentagem = document.getElementById("kpi-porcentagem")

function obterDadosEdu(idServidor) {
    // console.log("tempxcpu")
  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }
  fetch(`/edu/tempoRealEdu/${idServidor}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos DE CPU: ${JSON.stringify(resposta)}`);

              plotarGraficoEdu(resposta, idServidor);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGraficoEdu(resposta, idServidor) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: ['DISCO','CPU','RAM'],
    datasets: [{
        label: 'Servidor Principal',
        data: [],
        backgroundColor: '#00FF00',
        borderColor: '#c211a1',
        tension: 0.3,
        fill: true, 
        pointRadius: 6
    }]
};

  console.log('----------------------------------------------')
  console.log('-------------------PLOT temp CPU---------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)
// ...

// Dentro do seu loop for na função plotarGraficoDisco
for (i = 0; i <= resposta.length - 1; i++) {
    var registro = resposta[i];
    var dado = [
        registro.ValorRegistro_DISCO,
        registro.ValorRegistro_CPU, 
        registro.ValorRegistro_Memoria
    ]
    for(j=0;j<3;j++){
    labels.push(registro.NomeServidor);
    dados.datasets[0].data.push({x:"teste", y:dado[j]});
    }    
  
    // if (registro.valorRegistro != null) {
    //     // Atualize kpiDisco.textContent em vez de atribuir diretamente ao elemento
    //     kpi_temp_CPU.textContent = registro.valorRegistro + '°C';
    // } else {
    //     kpi_temp_CPU.textContent = "Erro";
    // }
    // if (registro.valorRegistro != null) {
    //     // Atualize kpiDisco.textContent em vez de atribuir diretamente ao elemento
    //     kpi_porcentagem.textContent = registro.valorRegistro + '%';
    // } else {
    //     kpi_porcentagem.textContent = "Erro";
    // }
  
  
    // Definindo a cor com base nas condições
    if (registro.valorRegistro <= 15) {
        dados.datasets[0].backgroundColor = '#00FF00';
        // dados.datasets[0].borderColor.push('#00FF00');
    } else if (registro.valorRegistro <= 39) {
        dados.datasets[0].backgroundColor = '#f6ff00';
        // dados.datasets[0].borderColor.push('#f6ff00');
    } else {
        dados.datasets[0].backgroundColor = '#c211a1';
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
    fill: true
}
  // Adicionando gráfico criado em div na tela
  let chartGeral = new Chart(
    document.getElementById(`chartGeral`),
    config
);

setTimeout(() => atualizarGraficoEdu(idServidor, dados, chartGeral ), 5000);
}


function atualizarGraficoEdu(idServidor, dados, chartGeral) {

    chartGeral.destroy();

    obterDadosEdu(idServidor)

}
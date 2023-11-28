function obterDadosConectado() {
    console.log("Conectado")
  
    fetch(`/graficosLivia/medidasConectado/`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos DE USB: ${JSON.stringify(resposta)}`);
          resposta.reverse();
  
          plotarGraficoConexao(resposta);
  
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  }

  function obterDadosDesconectado() {
    console.log("Desconectado")
  
    fetch(`/graficosLivia/medidasDesconectado/`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos DE USB: ${JSON.stringify(resposta)}`);
          resposta.reverse();
  
          plotarGraficoConexao(resposta);
  
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  }
  
  function plotarGraficoConexao(resposta, resposta) {

    var ctx = document.getElementById('meuGrafico').getContext('2d');

  var data = {
    labels: ['Conectado', 'Desconectado'],
    datasets: [{
      label: 'Estado das conexões',
      data: [resposta, resposta], // Substitua esses valores pelos seus dados
      backgroundColor: [
        'rgba(255, 99, 135, 1)',
        'rgb(69, 7, 156)',
      ],
      borderColor: [
        'rgba(255, 99, 135, 0.5)',
        'rgba(69, 7, 156, 0.5)',
      ],
      borderWidth: 1
    }]
  };

  var meuGrafico = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      cutout: '90%'

    }
  });
  }
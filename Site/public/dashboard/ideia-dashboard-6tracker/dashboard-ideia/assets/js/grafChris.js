function obterDadosMediaRAM(idSalas) {
    console.log("RAM")

    fetch(`/graficosChris/medidasRAM/${idSalas}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            console.log("--------------------------Entrando na Função Obter dados Ram -------------------------------------")
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
    ctx2 = document.getElementById("sistemaRAM").getContext("2d");

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
            dados.datasets[0].backgroundColor.push('#00FF00');
        } else if (registro.RAM <= 90) {
            dados.datasets[0].backgroundColor.push('#f6ff00');
        } else {
            dados.datasets[0].backgroundColor.push('#FF0000');
        }
    };

    const config = {
        type: 'bar',
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

    fetch(`/graficosChris/medidasAtualizadaRAM/${idSalas}`, { cache: 'no-store' }).then(function (response) {
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

function limparRAM() {
    let chartMediaRAM = new Chart(
        document.getElementById("analiseSistema2"),
    );

    chartMediaRAM.clear()
}

var kpiRam = document.getElementById("KpiRAM");
var kpiHoraRam = document.getElementById("kpiHoraRam");
valores_kpi_desempenho = [kpiRam, kpiHoraRam]

function obterDadosDesempenhoMedio(idSala) {
    fetch(`/graficosGui/obterDadosDesempenhoMedio/${idSala}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos DE RAM Media: ${JSON.stringify(resposta)}`);
                plotarKpiDesempenhoMedio(resposta, idSala);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarKpiDesempenhoMedio(resposta, idSala) {
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        valores_kpi_desempenho[0].innerHTML = (registro.media_valor) + "%";
        valores_kpi_desempenho[1].innerHTML = "Data de Captura: " + (registro.intervalo_tempo);
    }
    setTimeout(() => atualizarKpiDesempenhoMedio(idSala), 2000);
}

function atualizarKpiDesempenhoMedio(idSala) {

    fetch(`/graficosGui/obterDadosDesempenhoMedio/${idSala}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                valores_kpi_desempenho = [kpiRam, kpiHoraRam]
  
                for (i = 0; i < resposta.length; i++) {
                  var registro = resposta[i];                  
                      valores_kpi_desempenho[0].innerHTML = (registro.media_valor) + "%";                                 
              }
               
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoKpiDesempenhoMedio = setTimeout(() => atualizarKpiDesempenhoMedio(idSala), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoKpiDesempenhoMedio = setTimeout(() => atualizarKpiDesempenhoMedio(idSala), 5000);
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
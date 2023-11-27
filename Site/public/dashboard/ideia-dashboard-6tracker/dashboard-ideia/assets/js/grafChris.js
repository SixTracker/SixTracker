function obterDadosGrafico(idSalas) {
    console.log("Iniciando a captura de RAM")

    fetch(`/graficosChris/medidasRAM/${idSalas}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Recebendo dados da RAM: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                obterDadosGraficoRAM(resposta, idSalas);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function obterDadosGraficoRAM(resposta, idSalas) {
    ctx = document.getElementById("sistemaRAM").getContext("2d");

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'RAM',
            data: [],
            backgroundColor: 'purple',
            borderColor: 'purple',
            fill: false,
            tension: 0.1
        }]
    };



    console.log('----------------------PlOTANDO RAM------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.datasets[0].data.push(registro.RAM);
        labels.push(registro.intervalo_tempo);

    }

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
        fill: false
    };

    // // Adicionando gráfico criado em div na tela
    let ChartRAM = new Chart(
        ctx,
        config
    );

    setTimeout(() => atualizarGraficoRAM(idSalas, dados, ChartRAM), 2000);

    function atualizarGraficoRAM(idSalas, dados, ChartRAM) {

        fetch(`/graficosChris/medidasEmTempoRealRAM/${idSalas}`, { cache: 'no-store' }).then(function (response) {
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

                        ChartRAM.update();
                    }

                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacaoRAM = setTimeout(() => atualizarGraficoRAM(idSalas, dados, ChartRAM), 5000);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoRAM = setTimeout(() => atualizarGraficoRAM(idSalas, dados, ChartRAM), 5000);
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

    }

    function limparRAM2() {
        let ChartRAM = new Chart(
            document.getElementById("sistemaRAM2"),
        );

        ChartRAM.clear()
    }


}
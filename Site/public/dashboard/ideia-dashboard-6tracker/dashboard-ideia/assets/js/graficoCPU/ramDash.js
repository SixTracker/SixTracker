nomeServ.innerHTML = sessionStorage.NOME_SERVIDOR + ' - Ram';

var dadosObtidosHora = [];
var dadosObtidosValor = [];
var ultimoIdInserido;

var qtdAlertas = 0;

buscarUltimosRegistrosLive()
function buscarUltimosRegistrosLive() {
    fkServidor = sessionStorage.ID_SERVIDOR;
    fkComponente = 2;

    if (fkServidor == "" || fkServidor == undefined) {
        alert("Servidor não encontrado!")
    } else {
        fetch("/registros/buscarUltimosRegistrosLive", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fkServidor": fkServidor,
                "fkComponente": fkComponente
            })
        }).then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    console.log("Aconteceu algum erro (res.error = true)")
                }
                else {
                    console.log(res)
                    for (let i = 0; i < res.length; i++) {
                        hora = formataHora(res[i].dataHora)
                        dadosObtidosHora[i] = hora

                        valor = res[i].valor
                        dadosObtidosValor[i] = valor

                        if (res[i].alerta == 1) {
                            qtdAlertas += 1;
                        }

                        if (i == res.length - 1) {
                            ultimoCapturado = res[i].idRegst;
                        }
                    }

                    if (ultimoCapturado != ultimoIdInserido) {
                        plotarGraficoDisco(dadosObtidosHora, dadosObtidosValor)
                        ultimoIdInserido = res[res.length - 1].idRegst

                        atualizarKPI()
                    }


                    setTimeout(() => {
                        buscarUltimosRegistrosLive()
                    }, 1000)

                }
            }).catch(function (res) {

            });
    }
}

function atualizarKPI() {
    // Media 
    somaValoresRegistros = 0;

    for (let i = 0; i < dadosObtidosValor.length; i++) {
        if (!isNaN(parseFloat(dadosObtidosValor[i]))) {
            let numeroConvertido = parseFloat(dadosObtidosValor[i]);
            somaValoresRegistros += numeroConvertido;
        }
    }

    mediaRegistrosPlotados = (somaValoresRegistros / dadosObtidosValor.length).toFixed(2);
    kpiMedia.innerHTML = mediaRegistrosPlotados

    // Alertas
    kpiQtd.innerHTML = qtdAlertas
    qtdAlertas = 0;

}


buscarLimite()
function buscarLimite() {
    fkServidor = sessionStorage.ID_SERVIDOR;
    if (fkServidor == "" || fkServidor == undefined) {
        alert("Servidor não encontrado!")
    } else {
        fetch("/componente/buscarEspecificacoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fkServidor": fkServidor
            })
        }).then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    console.log("Aconteceu algum erro (res.error = true)")
                }
                else {
                    console.log(res)
                    for(let i = 0; i < res.length; i++) {
                        if (res[i].tipo == 2 && res[i].fkUnidadeMedida == 3) {
                            limite = res[i].valor;
                        }
                    }
                    kpiLimite.innerHTML = limite + " Gb"
                }
            }).catch(function (res) {
                console.log(res)
                console.log("Aconteceu algum erro (res.error = false)")
            });
    }
}

function plotarGraficoDisco(dadosObtidosHora, dadosObtidosValor) {
    var ctx = document.getElementById("chartVelocidadeDisco");

    var dataFirst = {
        data: dadosObtidosValor,
        fill: false,
        label: "Uso de disco",
        borderColor: "#3A7D44",
        backgroundColor: "transparent",
        pointBorderColor: "#3A7D44",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
    };

    var speedData = {
        labels: dadosObtidosHora,
        datasets: [dataFirst],
    };

    var chartOptions = {
        legend: {
            display: false,
            position: "top",
        },
    };

    var lineChart = new Chart(ctx, {
        type: "line",
        hover: false,
        data: speedData,
        options: chartOptions,
    });

}

function formataData(dataISO) {
    let data = new Date(dataISO);

    let dia = data.getUTCDate();
    let mes = data.getUTCMonth() + 1;
    let ano = data.getUTCFullYear();

    if (dia < 10) dia = '0' + dia;
    if (mes < 10) mes = '0' + mes;

    return `${dia}/${mes}/${ano}`;
}

function formataHora(dataISO) {
    let data = new Date(dataISO);

    let hora = data.getUTCHours() - 3;
    let minuto = data.getUTCMinutes();
    let segundo = data.getUTCSeconds();

    if (hora < 10) hora = '0' + hora;
    if (minuto < 10) minuto = '0' + minuto;
    if (segundo < 10) segundo = '0' + segundo;

    return `${hora}:${minuto}:${segundo}`;
}


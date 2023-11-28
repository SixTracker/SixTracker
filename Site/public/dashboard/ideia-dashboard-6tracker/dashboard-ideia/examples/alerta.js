var alertas = [];

function obterdados(idServidor) {
    fetch(`/medidas/disco/${idServidor}`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idServidor);
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idServidor) {

    var med = resposta[0].valorRegistro;
   
    var grauDeAviso = '';

    var limites = {
        critico: 75,
        urgente: 60,
        ideal: 45,
    };

    var classe = 'cor-alerta';

    if (med >= limites.critico) {
        classe = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo Umido'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(med, idServidor, grauDeAviso, grauDeAvisoCor)
    }
    else if (med < limites.critico && med >= limites.urgente) {
        classe = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta Umido'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(med, idServidor, grauDeAviso, grauDeAvisoCor)
    }
    else if (med < limites.urgente && med >= limites.alerta) {
        classe = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta Seco'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(med, idServidor, grauDeAviso, grauDeAvisoCor)
    }
    else if (med < limites.alerta) {
        classe = 'cor-alerta ideal';
        removerAlerta(idServidor);
    }

    var med_local = document.getElementById(`Med_local_${idServidor}`);
    var card = document.getElementById(`card_${idServidor}`);

    // var temp_local = document.getElementById(`temp_local_${idServidor}`);
    // var card_temp = document.getElementById(`card_temp_${idServidor}`);

    med_local.innerHTML = med + "%";
    // temp_local.innerHTML = temp + "C°";
    card.className = classe;
    // card_temp.className = classe;

    }

    function exibirAlerta(med, idServidor, grauDeAviso, grauDeAvisoCor) {
        var indice = alertas.findIndex(item => item.idServidor == idServidor);
    
        if (indice >= 0) {
            alertas[indice] = {idServidor, med, grauDeAviso, grauDeAvisoCor };
        } else {
            alertas.push({ idServidor, med, grauDeAviso, grauDeAvisoCor });
        }
    
        exibirCards();
       
    // Dentro da div com classe grauDeAvisoCor há um caractere "invisível",
    // que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
    }

    function removerAlerta(idServidor) {
        alertas = alertas.filter(item => item.idServidor != idServidor);
        exibirCards();
    }

    function exibirCards() {
        alertas.innerHTML = '';
    
        for (var i = 0; i < alertas.length; i++) {
            var mensagem = alertas[i];
            alertas.innerHTML += transformarEmDiv(mensagem);
        }
    };

    function transformarEmDiv({idServidor, med, grauDeAviso, grauDeAvisoCor}) {
        return `<div class="mensagem-alarme">
        <div class="informacao">
        <div class="${grauDeAvisoCor}">&#12644;</div>
         <h3>Seu Local de Numero:${idServidor} está em estado de ${grauDeAviso}!</h3>
        <small>Umidade ${med}</small>  
        </div>
        <div class="alarme-sino"></div>
        </div>`;
    };
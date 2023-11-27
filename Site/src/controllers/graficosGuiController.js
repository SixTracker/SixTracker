var graficosGuiModel = require("../models/graficosGuiModel");

function testar(req, res) {
    console.log("ENTRAMOS NO componenteController");
    res.send("ENTRAMOS NO COMPONENTE CONTROLLER");
}


function buscarMedidasCPU(req, res) {

    var idSalas = req.params.idSalas;

    console.log(`Recuperando medidas em tempo real`);

    graficosGuiModel.buscarMedidasCPU(idSalas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasRAM(req, res) {

    var idSalas = req.params.idSalas;

    console.log(`Recuperando medidas em tempo real`);

    graficosGuiModel.buscarMedidasRAM(idSalas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasAtualizadaCPU(req, res) {

    var idSalas = req.params.idSalas;

    console.log(`Recuperando medidas em tempo real`);

    graficosGuiModel.buscarMedidasAtualizadaCPU(idSalas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasAtualizadaRAM(req, res) {

    var idSalas = req.params.idSalas;

    console.log(`Recuperando medidas em tempo real`);

    graficosGuiModel.buscarMedidasAtualizadaRAM(idSalas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterDadosDesempenhoMaxCPU(req, res) {

    var idSalas = req.params.idSalas;

    console.log(`Recuperando medidas em tempo real`);

    graficosGuiModel.obterDadosDesempenhoMaxCPU(idSalas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// function atualizarListaServidores(req, res) {

//     var idSalas = req.params.idSalas;

//     console.log(`Recuperando medidas em tempo real`);

//     graficosGuiModel.atualizarListaServidores(idSalas).then(function (resultado) {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     }).catch(function (erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }




module.exports = {    
    testar,
    buscarMedidasCPU,    
    buscarMedidasRAM,
    buscarMedidasAtualizadaRAM,
    buscarMedidasAtualizadaCPU,    
    obterDadosDesempenhoMaxCPU,    
    // atualizarListaServidores
}
var medidaRamModel = require("../models/medidaRamModel");

function testar(req, res) {
    console.log("ENTRAMOS NO componenteController");
    res.send("ENTRAMOS NO COMPONENTE CONTROLLER");
}

function buscarMedidasRAM(req, res) {

    var idSalas = req.params.idSalas;

    console.log(`Recuperando medidas em tempo real`);

    medidaRamModel.buscarMedidasRAM(idSalas).then(function (resultado) {
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

    medidaRamModel.buscarMedidasAtualizadaRAM(idSalas).then(function (resultado) {
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

function obterDadosDesempenhoMedio(req, res) {

    var idSalas = req.params.idSalas;

    console.log(`Recuperando medidas em tempo real`);

    medidaRamModel.obterDadosDesempenhoMedio(idSalas).then(function (resultado) {
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

module.exports = {    
    testar,    
    buscarMedidasRAM,
    buscarMedidasAtualizadaRAM,
    obterDadosDesempenhoMedio    
}
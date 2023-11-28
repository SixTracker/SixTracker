var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idMedidas = req.params.idMedidas

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarMetricas(idMedidas, limite_linhas).then(function (resultado) {
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


function buscarMetricas(req, res) {

    var idServidor = req.params.idServidor;

    console.log(`Recuperando métricas por servidor`);

    medidaModel.buscarMetricas(idServidor).then(function (resultado) {
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

function buscarMedidasDisco(req, res) {
    var limite_linhas = 4;

    var idServidor = req.params.idServidor;

    medidaModel.buscarMedidasDisco(idServidor, limite_linhas).then(function(resultado)
        
    {
            
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }   
    }).catch(function(erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function tempoRealDisco(req, res) {
    var limite_linhas = 1;

    var idServidor = req.params.idServidor;

    medidaModel.tempoRealDisco(idServidor, limite_linhas).then(function(resultado)
        
    {
            
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }   
    }).catch(function(erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasRAM(req, res) {
    var limite_linhas = 4;

    var idServidor = req.params.idServidor;

    medidaModel.buscarMedidasRAM(idServidor, limite_linhas).then(function(resultado)
        
    {
            
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }   
    }).catch(function(erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function tempoRealRAM(req, res) {
    var limite_linhas = 1;

    var idServidor = req.params.idServidor;

    medidaModel.tempoRealRAM(idServidor, limite_linhas).then(function(resultado)
        
    {
            
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }   
    }).catch(function(erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasCPU(req, res) {
    var limite_linhas = 4;

    var idServidor = req.params.idServidor;

    medidaModel.buscarMedidasCPU(idServidor, limite_linhas).then(function(resultado)
        
    {
            
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }   
    }).catch(function(erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function tempoRealCPU(req, res) {
    var limite_linhas = 1;

    var idServidor = req.params.idServidor;

    medidaModel.tempoRealCPU(idServidor, limite_linhas).then(function(resultado)
        
    {
            
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }   
    }).catch(function(erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    buscarUltimasMedidas,
    buscarMetricas,
    buscarMedidasDisco,
    tempoRealDisco,
    tempoRealRAM,
    buscarMedidasRAM,
    buscarMedidasCPU,
    tempoRealCPU
}
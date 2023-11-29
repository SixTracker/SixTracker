var eduModel = require("../models/graficosEduModel");

function buscarMedidas(req, res) {
    var limite_linhas = 4;

    var idServidor = req.params.idServidor;

    eduModel.buscarMedidasTempCPU(idServidor, limite_linhas).then(function(resultado)
        
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

function tempoRealEdu(req, res) {
    var limite_linhas = 1;

    var idServidor = req.params.idServidor;

    eduModel.tempoRealEdu(idServidor, limite_linhas).then(function(resultado)
        
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
    buscarMedidas,
    tempoRealEdu
}
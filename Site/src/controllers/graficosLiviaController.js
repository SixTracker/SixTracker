var graficosLiviaModel = require("../models/graficosLiviaModel");

function testar(req, res) {
    console.log("ENTRAMOS NO componenteController");
    res.send("ENTRAMOS NO COMPONENTE CONTROLLER");
}


function buscarConectado(req, res) {

    console.log(`Recuperando medidas em tempo real`);

    graficosLiviaModel.buscarConectado().then(function (resultado) {
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

function buscarDesconectado(req, res) {

    console.log(`Recuperando medidas em tempo real`);

    graficosLiviaModel.buscarDesconectado().then(function (resultado) {
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

function buscarUSB(req, res) {

    // var fkServidor = req.body.fkServidorServer;


    // // Faça as validações dos valores
    // if (fkServidor == undefined) {
    //     res.status(400).send("O id do servidor está undefined!");
    // } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        graficosLiviaModel.buscarUSB()
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do ADM, pois a empresa não existe! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


module.exports = {    
    testar,
    buscarConectado,
    buscarDesconectado,
    buscarUSB
}
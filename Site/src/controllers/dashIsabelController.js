var IsabelModel = require("../models/isabelModel");

function selectDisco(req, res) {
    IsabelModel.selectDisco()
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado.length > 0) {
                    console.log(resultado);
                    res.send(resultado[0])
                    //res(resultado[0])
                } else if (resultado.length == 0) {
                    res.status(403).send("Nenhum dado encontrado");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function selectRede(req, res) {
    var fkServidor = req.body.idServer;

    IsabelModel.selectRede(fkServidor)
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado.length > 0) {
                    console.log(resultado);
                    res.json(resultado[0])
                } else if (resultado.length == 0) {
                    res.status(403).send("Nenhum dado encontrado");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {

    selectDisco,
    selectRede
}
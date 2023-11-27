var isabelModel = require("../models/isabelModel");

function testar(req, res) {
    console.log("ENTRAMOS NO componenteController");
    res.send("ENTRAMOS NO COMPONENTE CONTROLLER");
}


function buscarMedidasDisco(req, res) {

    console.log(`Recuperando medidas em tempo real`);

    isabelModel.buscarMedidasCPU().then(function (resultado) {
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

function buscarMedidasRede(req, res) {


    console.log(`Recuperando medidas em tempo real`);

    isabelModel.buscarMedidasRAM().then(function (resultado) {
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

function buscarMedidasAtualizadaDisco(req, res) {

    console.log(`Recuperando medidas em tempo real`);

    isabelModel.buscarMedidasAtualizadaDisco().then(function (resultado) {
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

function buscarMedidasAtualizadaRede(req, res) {

    console.log(`Recuperando medidas em tempo real`);

    isabelModel.buscarMedidasAtualizadaRede().then(function (resultado) {
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

// function selectDisco(req, res) {
//     IsabelModel.selectDisco()
//         .then(
//             function (resultado) {
//                 console.log(`\nResultados encontrados: ${resultado.length}`);
//                 console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

//                 if (resultado.length > 0) {
//                     console.log(resultado);
//                     res.send(resultado[0])
//                     //res(resultado[0])
//                 } else if (resultado.length == 0) {
//                     res.status(403).send("Nenhum dado encontrado");
//                 }
//             }
//         ).catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );
// }

// function selectRede(req, res) {
//     var fkServidor = req.body.idServer;

//     IsabelModel.selectRede(fkServidor)
//         .then(
//             function (resultado) {
//                 console.log(`\nResultados encontrados: ${resultado.length}`);
//                 console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

//                 if (resultado.length > 0) {
//                     console.log(resultado);
//                     res.json(resultado[0])
//                 } else if (resultado.length == 0) {
//                     res.status(403).send("Nenhum dado encontrado");
//                 }
//             }
//         ).catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );
// }



module.exports = {

   // selectDisco,
   // selectRede
   testar,
    buscarMedidasDisco,    
    buscarMedidasRede,
    buscarMedidasAtualizadaDisco,
    buscarMedidasAtualizadaRede,  
}
var medidaCpuModel = require("../models/medidaCpuModel");

// function listarGuias(req, res) {

   
//     var fkGuia = req.params.guiaServer;

   

//     medidaModel.listarGuias(fkGuia).then(function (novoRegistro) {
//         if (novoRegistro.length > 0) {
//             res.status(200).json(novoRegistro);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     }).catch(function (erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }


//Basear na busca de medidas do web-data-viz
function capturar(req, res) {

    // var fkGuia = req.params.guiaServer;

    console.log(`Recuperando medidas em tempo real`);

    medidaCpuModel.capturar().then(function (resultado) {
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
    // listarGuias,
    capturar
 }
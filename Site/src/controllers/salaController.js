var salaModel = require("../models/salaModel");

function testar(req, res) {
    console.log("ENTRAMOS NO salaController");
    res.send("ENTRAMOS NO SALA CONTROLLER");
}

// function listar(req, res) {
//     servidorModel.listar().then(function (resultado) {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     }).catch(function (erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar o servidor: ", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }

// function listarPorUsuario(req, res) {
//     var idUsuario = req.params.idUsuario;

//     salaModel.listarPorUsuario(idUsuario)
//         .then(
//             function (resultado) {
//                 if (resultado.length > 0) {
//                     res.status(200).json(resultado);
//                 } else {
//                     res.status(204).send("Nenhum resultado encontrado!");
//                 }
//             }
//         )
//         .catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log(
//                     "Houve um erro ao buscar os avisos: ",
//                     erro.sqlMessage
//                 );
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );
// }

// function pesquisarDescricao(req, res) {
//     var descricao = req.params.descricao;

//     salaModel.pesquisarDescricao(descricao)
//         .then(
//             function (resultado) {
//                 if (resultado.length > 0) {
//                     res.status(200).json(resultado);
//                 } else {
//                     res.status(204).send("Nenhum resultado encontrado!");
//                 }
//             }
//         ).catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );
// }

function publicar(req, res) {
    var nomeSala = req.body.nomeSala;
    var andarSala = req.body.andarSala;
    var fkEmpresa = req.body.fkEmpresa;
    // var usb = req.body.usb;
    // var sala = req.body.sala;
    // var idUsuario = req.params.idUsuario;

    if (nomeSala == undefined) {
        res.status(400).send("O nome está indefinido!");
    } else if (andarSala == undefined) {
        res.status(400).send("O andarSala está indefinido!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("O fkEmpresa está indefinido!");
    } 
    else {
        salaModel.publicar(nomeSala, andarSala, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var nomeSala = req.body.nomeSala;
    var andarSala = req.body.andarSala;
    var idSala = req.params.idSala;

    salaModel.editar(nomeSala, andarSala, idSala)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var idSala = req.params.idSala;

    salaModel.deletar(idSala)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function buscarSalas(req, res){

    console.log(`Recuperando medidas em tempo real`);

    salaModel.buscarSalas().then(function (resultado) {
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
    buscarSalas,
    testar,
    // listar,
    // listarPorUsuario,
    // pesquisarDescricao,
    publicar,
    editar,
     deletar
}
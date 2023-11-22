var servidorModel = require("../models/servidorModel");

function testar(req, res) {
    console.log("ENTRAMOS NO servidorController");
    res.send("ENTRAMOS NO SERVIDOR CONTROLLER");
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

//     avisoModel.listarPorUsuario(idUsuario)
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

//     avisoModel.pesquisarDescricao(descricao)
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
    var nome = req.body.nome;
    var codigo = req.body.codigo;
    var so = req.body.so;
    var usb = req.body.usb;
    var salaSelect = req.body.salaSelect;
    // var idUsuario = req.params.idUsuario;

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    } else if (codigo == undefined) {
        res.status(400).send("O codigo está indefinido!");
    } else if (so == undefined) {
        res.status(403).send("O SO está indefinido!");
    } else if (usb == undefined) {
        res.status(403).send("O usb está indefinido!");
    } else if (salaSelect == undefined) {
        res.status(403).send("A salaSelect está indefinida!");
    } else {
        servidorModel.publicar(nome, codigo, so, usb, salaSelect)
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
    var idServidor = req.params.idServidor
    var nome = req.body.nomeServidor;
    var codigo = req.body.codigo;
    var sala = req.params.salaSelect;


    servidorModel.editar(idServidor, nome, codigo, sala)
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
    var idServidor = req.params.idServidor;

    servidorModel.deletar(idServidor)
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


function buscarServidores(req, res){

    console.log(`Recuperando servidores em tempo real`);

    servidorModel.buscarServidores().then(function (resultado) {
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
    buscarServidores,
    testar,
    // listar,
    // listarPorUsuario,
    // pesquisarDescricao,
    publicar,
    editar,
    deletar
}
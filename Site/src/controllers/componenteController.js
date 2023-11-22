var componenteModel = require("../models/componenteModel");

function buscarServidores(req, res) {

    console.log(`Recuperando medidas em tempo real`);

    componenteModel.buscarServidores().then(function (resultado) {
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

function buscarMedidas(req, res) {

    console.log(`Recuperando medidas em tempo real`);

    componenteModel.buscarMedidas().then(function (resultado) {
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

function buscarComponentes(req, res) {

    console.log(`Recuperando medidas em tempo real`);

    componenteModel.buscarComponentes().then(function (resultado) {
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

// function buscarNivelPermissao(req, res){

//     console.log(`Recuperando medidas em tempo real`);

//     componenteModel.buscarNivelPermissao().then(function (resultado) {
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

function buscarFuncionarios(req, res) {

    var fkEmpresa = req.body.fkEmpresaServer;


    // Faça as validações dos valores
    if (fkEmpresa == undefined) {
        res.status(400).send("O id da empresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        componenteModel.buscarFuncionarios(fkEmpresa)
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
}

function cadastrarComponente(req, res) {
  
    var nome = req.body.nomeServer;
    var fornecedor = req.body.fornecedorServer;
    var modelo = req.body.modeloServer;
    var maxima = req.body.maximaServer;
    var minima = req.body.minimaServer;
    var total = req.body.totalServer;
    var Servidor = req.body.ServidorServer;
    var UnidadeMedida = req.body.UnidadeMedidaServer;
    var TipoComponente = req.body.TipoComponenteServer;
    // var fkempresa = req.body.fkempresaServer

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (fornecedor == undefined) {
        res.status(400).send("O fornecedor está undefined!");
    } else if (modelo == undefined) {
        res.status(400).send("O modelo está undefined!");
    } else if (maxima == undefined) {
        res.status(400).send("O maxima está undefined!");
    } else if (minima == undefined) {
        res.status(400).send("O minima está undefined!");
    } else if (total == undefined) {
        res.status(400).send("A total está undefined!");
    } else if (Servidor == undefined) {
        res.status(400).send("A Servidor está undefined!");
    } else if (UnidadeMedida == undefined) {
        res.status(400).send("A UnidadeMedida está undefined!");
    } else if (TipoComponente == undefined) {
        res.status(400).send("A TipoComponente está undefined!");
    } 
    else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        componenteModel.cadastrarComponente(nome, fornecedor, modelo, maxima, minima, total, Servidor, UnidadeMedida, TipoComponente)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do Usuário! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    buscarServidores,
    buscarMedidas,
    buscarComponentes,
    buscarFuncionarios,
    cadastrarComponente
    // buscarNivelPermissao
}
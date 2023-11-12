var perfilModel = require("../models/perfilModels");

function inserirImg(req, res) {

    var idFuncionario = req.body.idServer;
    var imagem = req.body.imgServer;
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    perfilModel.inserirImg(fkFuncionario, imagem)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultar(req, res) {
    var idFuncionario = req.body.idServer;

    perfilModel.consultar(idFuncionario)
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado.length == 1) {
                    console.log(resultado);
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("ERRO");
                } else {
                    res.status(403).send("MAIS DE UM LOGIN COM O MESMO USUARIO");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarNome(req, res) {
    var nome = req.body.nomeServer
    var idFuncionario = req.body.idServer

    perfilModel.atualizarNome(nome, Funcionario)
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
function atualizarEmail(req, res) {
    var email = req.body.emailServer;
    var idFuncionario = req.body.idServer

    perfilModel.atualizarEmail(email, idFuncionario)
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
function atualizarEndereco(req, res) {
    var Endereco = req.body.EnderecoServer;
    var idFuncionario = req.body.idServer

    perfilModel.atualizarEndereco(Endereco, idFuncionario)
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

function atualizarTelefone(req, res) {
    var telefone = req.body.telefoneServer;
    var idFuncionario = req.body.idServer

    perfilModel.atualizarTelefone(telefone, idFuncionario)
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

function atualizarDescricao(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkFuncionario = req.body.idServer;
    var descricao = req.body.descricaoServer;

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    perfilModel.atualizarDescricao(fkFuncionario, descricao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function verificar(req, res) {
    var fkFuncionario = req.body.idServer;
    perfilModel.verificar(fkFuncionario)
        .then(function (resultado) {
            if (resultado.length == 1) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    inserirImg,
    consultar,
    atualizarNome,
    atualizarEmail,
    atualizarEndereco,
    atualizartelefone,
    atualizarDescricao,
    verificar
}

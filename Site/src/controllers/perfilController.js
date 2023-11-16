var perfilModel = require("../models/perfilModel");

function AtualizarImg(req, res) {

    var idFuncionario = req.body.idFuncionarioServer;
    var imagem = req.body.imgServer;
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    perfilModel.AtualizarImg(idFuncionario, imagem)
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
    var idFuncionario = req.body.idFuncionarioServer;

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

function atualizarPerfil(req, res) {    

    var idFuncionario = req.body.idFuncionarioServer;
    var nome = req.body.nomeServer;    
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var descricao = req.body.descricaoServer;
    

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    }else if (email == undefined) {
        res.status(400).send("O email está undefined!");
    }else if (telefone == undefined) {
        res.status(400).send("O telefone está undefined!");
    }else if (idFuncionario == undefined) {
        res.status(400).send("O idFuncionário está undefined!");
    }else if (descricao == undefined) {
        res.status(400).send("A descrição está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        perfilModel.atualizarPerfil(idFuncionario, nome, email, telefone, descricao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização do Perfil! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    AtualizarImg,
    consultar,
    atualizarPerfil
}
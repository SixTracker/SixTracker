var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
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

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
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

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    // nomeEmpServer: nomeEmpVar,
    // cnpjServer: cnpjVar,
    // cepServer: cepVar,
    // estadoServer: estadoVar,
    // ruaServer: ruaVar,
    // numeroServer: numeroVar,
    // bairroServer: bairroVar,
    // cidadeServer: cidadeVar

    var nomeEmp = req.body.nomeEmpServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var estado = req.body.estadoServer;
    var rua = req.body.ruaServer;
    var numero = req.body.numeroServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;


    // Faça as validações dos valores
    if (nomeEmp == undefined) {
        res.status(400).send("O nome da empresa está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("O cnpj está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("O cep está undefined!");
    }else if (estado == undefined) {
        res.status(400).send("O estado está undefined!");
    }else if (rua == undefined) {
        res.status(400).send("A rua está undefined!");
    }else if (numero == undefined) {
        res.status(400).send("O número está undefined!");
    }else if (bairro == undefined) {
        res.status(400).send("O bairro está undefined!");
    }else if (cidade == undefined) {
        res.status(400).send("A cidade está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeEmp, cnpj, cep, estado, rua, numero, bairro, cidade)
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
}

function cadastrarADM(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

                // nomeServer: nomeVar,
                // cpfServer: cpfVar,
                // emailServer: emailVar,
                // telefoneServer: telefoneVar,
                // senhaServer: senhaVar

    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;
    var fkempresa = req.body.fkempresaServer

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("O cpf está undefined!");
    } else if (email == undefined) {
        res.status(400).send("O email está undefined!");
    }else if (telefone == undefined) {
        res.status(400).send("O telefone está undefined!");
    }else if (senha == undefined) {
        res.status(400).send("A senha está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarADM(nome, cpf, email, telefone, senha, fkempresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do ADM! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarUser(req, res) {
  

    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var nivelPermissao = req.body.nivelPermissaoServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;
    var fkempresa = req.body.fkempresaServer

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("O cpf está undefined!");
    } else if (email == undefined) {
        res.status(400).send("O email está undefined!");
    } else if (nivelPermissao == undefined) {
        res.status(400).send("O nivelPermissao está undefined!");
    }else if (telefone == undefined) {
        res.status(400).send("O telefone está undefined!");
    }else if (senha == undefined) {
        res.status(400).send("A senha está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarUser(nome, cpf, email, nivelPermissao, telefone, senha, fkempresa)
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
        usuarioModel.cadastrarComponente(nome, fornecedor, modelo, maxima, minima, total, Servidor, UnidadeMedida, TipoComponente)
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

function buscaridEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

                // nomeEmpresaServer: nomeEmpreVar,

    var nomeEmp = req.body.nomeEmpresaServer;


    // Faça as validações dos valores
    if (nomeEmp == undefined) {
        res.status(400).send("O nome da empresa está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.buscaridEmpresa(nomeEmp)
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

module.exports = {
    entrar,
    cadastrar,    
    cadastrarADM,
    cadastrarUser,
    cadastrarComponente,
    buscaridEmpresa,
    listar,
    testar
}
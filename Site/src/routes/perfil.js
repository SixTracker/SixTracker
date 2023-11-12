var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

router.put("/inserirImg", function (req, res) {
    perfilController.inserirImg(req, res);
});

router.post("/consultar", function (req, res) {
    perfilController.consultar(req, res);
});

router.put("/atualizarNome", function (req, res) {
    perfilController.atualizarNome(req, res);
});

router.put("/atualizarEmail", function (req, res) {
    perfilController.atualizarEmail(req, res);
});

router.put("/atualizarEndereco", function (req, res) {
    perfilController.atualizarEndereco(req, res);
});

router.put("/atualizarTelefone", function (req, res) {
    perfilController.atualizarTelefone(req, res);
});

router.put("/AtualizarDescricao", function (req, res) {
    perfilController.atualizarDescricao(req, res);
})

router.post("/verificar", function (req, res) {
    perfilController.verificar(req, res);
})


module.exports = router;

MODELS

var database = require("../database/config")

function inserirImg(fkFuncionario, imagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idUsuario,imagem);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        UPDATE perfil SET imagem = '${imagem}' WHERE fkFuncionario = ${fkFuncionario} ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultar(idFuncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idFuncionario)
    var instrucao = `
        SELECT * FROM perfil WHERE fkFuncionario = '${fkFuncionario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarNome(nome, idFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", nome, idFuncionario)
    var instrucao = `
    UPDATE Funcionario SET nome = '${nome}' WHERE idFuncionario = ${idFuncionario};
    `;
    console.log(instrucao);
    return database.executar(instrucao);
}

function atualizarEmail(email, idFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", email, idFuncionario)
    var instrucao = `
    UPDATE Funcionario SET email = '${email}' WHERE idFuncionario = ${idFuncionario}; 
    `;
    console.log(instrucao);
    return database.executar(instrucao);
}

function atualizarEndereco(fkEndereco, fkFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", fkEndereco, idFuncionario)
    var instrucao = `
    UPDATE perfil SET fkEndereco = '${fkEndereco}' WHERE fkFuncionario = ${idFuncionario}; 
    `;
    console.log(instrucao);
    return database.executar(instrucao);
}

function atualizarTelefone(telefone, idFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", telefone, idFuncionario)
    var instrucao = `
    UPDATE Funcionario SET telefone = '${telefone}' WHERE idFuncionario = ${idFuncionario}; 
    `;
    console.log(instrucao);
    return database.executar(instrucao);
}

function atualizarDescricao(fkFuncionario, descricao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkFuncionario, descricao);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO perfil (fkFuncionario, descricao) VALUES ('${fkFuncionario}', '${descricao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificar(fkFuncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(${fkFuncionario}))");
    var instrucao = `
        SELECT * FROM perfil WHERE fkFuncionario = '${idFuncionario}' ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    inserirImg,
    consultar,
    atualizarNome,
    atualizarEmail,
    atualizarEndereco,
    atualizarTelefone,
    atualizarDescricao,
    verificar
}

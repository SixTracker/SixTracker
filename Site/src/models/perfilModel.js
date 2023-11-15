var database = require("../database/config")

function inserirImg(idFuncionario, imagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idFuncionario,imagem);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO perfil (imagem, fkFuncionario) VALUES ('${imagem}', '${idFuncionario}');;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultar(idFuncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idFuncionario)
    var instrucao = `
        SELECT * FROM perfil WHERE fkFuncionario = '${idFuncionario}';
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

function atualizarEndereco(fkEndereco, idFuncionario) {
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

function atualizarDescricao(idFuncionario, descricao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idFuncionario, descricao);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO perfil (fkFuncionario, descricao) VALUES ('${idFuncionario}', '${descricao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificar(idFuncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(${idFuncionario}))");
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
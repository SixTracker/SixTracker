var database = require("../database/config")

function AtualizarImg(idFuncionario, imagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idFuncionario, imagem);

    var instrucao = `
    UPDATE Funcionario
    SET imagem = '${imagem}'
    WHERE idFuncionario = ${idFuncionario};    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultar(idFuncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idFuncionario)
    var instrucao = `
        SELECT nome, email, telefone, descricao FROM Funcionario WHERE idFuncionario = '${idFuncionario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

async function atualizarPerfil(idFuncionario, nome, email, telefone, descricao) {
    console.log("ACESSEI O USUARIO MODEL - function cadastrarUser():", idFuncionario, nome, email, telefone, descricao);

    try {
        var instrucao = `
            UPDATE Funcionario
            SET nome = '${nome}', email = '${email}', telefone = '${telefone}', descricao = '${descricao}'
            WHERE idFuncionario = ${idFuncionario};
            `;
        console.log("Executando a instrução SQL: \n" + instrucao);

        return database.executar(instrucao);

    } catch (erro) {
        console.error("Erro ao realizar a atulização do Perfil:", erro);
        throw erro;
    }
}


module.exports = {
    AtualizarImg,
    consultar,
    atualizarPerfil
}
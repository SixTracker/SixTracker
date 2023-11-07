var database = require("../database/config");

// function listar() {
//     console.log("ACESSEI O SERVIDOR  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
//     var instrucao = `
//         SELECT * FROM Servidor;
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// function pesquisarDescricao(texto) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
//     var instrucao = `
//         SELECT 
//             a.id AS idSala,
//             a.titulo,
//             a.descricao,
//             a.fk_usuario,
//             u.id AS idUsuario,
//             u.nome,
//             u.email,
//             u.senha
//         FROM aviso a
//             INNER JOIN usuario u
//                 ON a.fk_usuario = u.id
//         WHERE a.descricao LIKE '${texto}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// function listarPorUsuario(idUsuario) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
//     var instrucao = `
//         SELECT 
//             a.id AS idSala,
//             a.titulo,
//             a.descricao,
//             a.fk_usuario,
//             u.id AS idUsuario,
//             u.nome,
//             u.email,
//             u.senha
//         FROM aviso a
//             INNER JOIN usuario u
//                 ON a.fk_usuario = u.id
//         WHERE u.id = ${idUsuario};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function publicar(nomeSala, andarSala, fkEmpresa) {
    console.log("ACESSEI O SALA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", nomeSala, andarSala);
    var instrucao = `
        INSERT INTO Salas (nomeSala, andarSala, fkEmpresa) VALUES ('${nomeSala}', ${andarSala}, ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(nomeSala, andarSala, idSala) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idSala);
    var instrucao = `
        UPDATE salas SET nomeSala = '${nomeSala}', andarSala = ${andarSala} WHERE idSalas = ${idSala};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idSala) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idSala);
    var instrucao = `
        DELETE FROM salas WHERE idSalas = ${idSala};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarSalas(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `select * from Salas`;
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}




module.exports = {
    buscarSalas,
    // listar,
    // listarPorUsuario,
    // pesquisarDescricao,
    publicar,
    editar,
    deletar
}
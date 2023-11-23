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
//             a.id AS idAviso,
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
//             a.id AS idAviso,
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

function publicar(nome, codigo, so, usb, salaSelect) {
    console.log("ACESSEI O SERVIDOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", nome, codigo, so, usb, salaSelect);
    var instrucao = `
        INSERT INTO Servidor (nome, codigo, sistemaOperacional, ip, fkSalas) VALUES ('${nome}', '${codigo}',' ${so}', '${usb}', ${salaSelect});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(nome, codigo, so, usb, salaSelect) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", nome, codigo, so, usb, salaSelect);
    var instrucao = `
    UPDATE servidor set nome = '${nome}', codigo = '${codigo}', sistemaOperacional = '${so}', fkSalas = ${salaSelect} WHERE idServidor = ${idServidor};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function deletar(idServidor) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idServidor);
    var instrucao = `
        DELETE FROM servidor WHERE idServidor = ${idServidor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarServidores(fkempresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `SELECT
       Servidor.idServidor,
       Servidor.nome,
       Salas.nomeSala as nomeSala,
       Servidor.codigo as cod,
       Servidor.sistemaOperacional as so,
       Servidor.ip as ip,
       Servidor.fkSalas as fkS
       
           FROM Servidor JOIN Salas on fkSalas = idSalas
           WHERE Salas.fkEmpresa = ${fkempresa};`;
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}




module.exports = {
    buscarServidores,
    // listar,
    // listarPorUsuario,
    // pesquisarDescricao,
    publicar,
    editar,
    deletar
}
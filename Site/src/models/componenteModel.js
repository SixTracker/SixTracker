const database = require("../database/config");


function listarComponentes(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `SELECT 
       Componente.nome as nomeComponente, 
       Componente.modelo, 
       Servidor.nome 
       FROM Componente JOIN Servidor 
       ON fkServidor = idServidor 
       JOIN Salas on fkSalas = idSalas 
       WHERE fkEmpresa = ${fkEmpresa};`;
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}


function buscarMedidas(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `select 
        *
           from UnidadeMedida`;
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

function buscarComponentes(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `
        select 
            *
           from TipoComponente;`;
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

// function buscarNivelPermissao(){
//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//        instrucaoSql = `SELECT nomeCargo FROM NivelAcesso;`;
//    } else {
//        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//        return
//    }

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }

function buscarFuncionarios(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `SELECT nome,email,telefone FROM Funcionario where fkEmpresa = ${fkEmpresa} ORDER BY nome ASC;`;
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

function cadastrarComponente(nome, fornecedor, modelo, Servidor, UnidadeMedida, TipoComponente) {
    console.log("ACESSEI O componente MODEL - function cadastrarComponente():", nome, fornecedor, modelo, Servidor, UnidadeMedida, TipoComponente);

      var instrucao = `
                INSERT INTO Componente (nome, modelo, fabricante, fkServidor, fkUnidadeMedida, fkTipoComponente) VALUES ('${nome}', '${modelo}', '${fornecedor}', ${Servidor}, ${UnidadeMedida}, ${TipoComponente});
            `;
            console.log("Executando a instrução SQL: \n" + instrucao);

            return database.executar(instrucao);
}

function editarComponente(idComponente, nome, modelo, fabricante, fkServidor, fkUnidadeMedida, fkTipoComponente, fkMetrica) {
    var instrucao = `
    UPDATE componente set nome = '${nome}', modelo = '${modelo}', fabricante = '${fabricante}', fkServidor = ${fkServidor}, fkTipoComponente = ${fkTipoComponente}, fkMetrica = ${fkMetrica} WHERE idComponente = ${idComponente};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarComponente(nome) {
    console.log("ACESSEI O Componente MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", nome);
    
    // Início da transação
    var instrucao = `
        START TRANSACTION;

        DELETE FROM registro WHERE fkComponente IN (SELECT idComponente FROM componente WHERE nome = ?);
        DELETE FROM componente WHERE nome = ?;

        COMMIT;
    `;

    // Substitui os placeholders pelos parâmetros

    // Substitua a linha abaixo com a lógica real para executar a instrução no banco de dados
    // Certifique-se de usar um método seguro para evitar injeção de SQL
    console.log("Executando a instrução SQL: \n" + instrucao + "\ncom parâmetros:", parametros);
    return database.executar(instrucao);
}






module.exports = {
    listarComponentes,    
    buscarMedidas,
    buscarComponentes,
    buscarFuncionarios,
    cadastrarComponente,
    editarComponente,
    deletarComponente
    // buscarNivelPermissao
};
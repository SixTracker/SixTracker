var database = require("../database/config");

function buscarServidores(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `select 
       Servidor.idServidor,
       Servidor.nome 
           from Componente 
               join Servidor 
                   on Servidor.idServidor = Componente.fkServidor;`;
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

async function cadastrarComponente(nome, fornecedor, modelo, maxima, minima, total, Servidor, UnidadeMedida, TipoComponente) {
    console.log("ACESSEI O USUARIO MODEL - function cadastrarComponente():", nome, fornecedor, modelo, maxima, minima, total, Servidor, UnidadeMedida, TipoComponente);

    // const buscarEmpresa = `
    //     SELECT idEmpresa FROM Empresa WHERE nome = '${fkempresa}';
    // `;

    var instrucao = `
                INSERT INTO Componente (nome, modelo, fabricante, fkServidor, fkUnidadeMedida, fkTipoComponente) VALUES ('${nome}', '${modelo}', '${fornecedor}', ${Servidor}, ${UnidadeMedida}, ${TipoComponente});
            `;
            console.log("Executando a instrução SQL: \n" + instrucao);

            return database.executar(instrucao);
}


module.exports = {
    buscarServidores,
    buscarMedidas,
    buscarComponentes,
    buscarFuncionarios,
    cadastrarComponente
    // buscarNivelPermissao
};
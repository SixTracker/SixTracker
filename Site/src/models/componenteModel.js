const database = require("../database/config");


function listarComponentes(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `SELECT 
       Componente.nome, 
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

function buscarServidoresComponente(fkEmpresa) {

  }
  

function buscarServidoresComponente(fkEmpresa){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `select 
       Componente.tipoComponente,
       Componente.modelo 
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

function cadastrarComponente(nome, fornecedor, modelo, Servidor, UnidadeMedida, TipoComponente) {
    console.log("ACESSEI O USUARIO MODEL - function cadastrarComponente():", nome, fornecedor, modelo, Servidor, UnidadeMedida, TipoComponente);

      var instrucao = `
                INSERT INTO Componente (nome, modelo, fabricante, fkServidor, fkUnidadeMedida, fkTipoComponente) VALUES ('${nome}', '${modelo}', '${fornecedor}', ${Servidor}, ${UnidadeMedida}, ${TipoComponente});
            `;
            console.log("Executando a instrução SQL: \n" + instrucao);

            return database.executar(instrucao);
}


module.exports = {
    listarComponentes,
    buscarServidoresComponente,
    buscarMedidas,
    buscarComponentes,
    buscarFuncionarios,
    cadastrarComponente
    // buscarNivelPermissao
};
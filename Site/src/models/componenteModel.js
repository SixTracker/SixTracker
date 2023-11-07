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

function buscarNivelPermissao(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `select 
        NivelAcesso.nomeCargo
            from NivelAcesso join Funcionario 
                on fkNivelAcesso = idNivelAcesso;`;
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

module.exports = {
    buscarServidores,
    buscarMedidas,
    buscarComponentes,
    buscarNivelPermissao
};
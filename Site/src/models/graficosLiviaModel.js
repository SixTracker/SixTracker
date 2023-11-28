const database = require("../database/config");


function buscarConectado(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `
       SELECT 
    valorRegistro,
    COUNT(*) * 100 / (SELECT COUNT(*) FROM registro WHERE fkComponente = 16) AS porcentagem
FROM 
    registro
WHERE 
    fkComponente = 16 and valorRegistro = 1
GROUP BY 
    valorRegistro;
   `
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

function buscarDesconectado(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `
       SELECT 
    valorRegistro,
    COUNT(*) * 100 / (SELECT COUNT(*) FROM registro WHERE fkComponente = 16) AS porcentagem
FROM 
    registro
WHERE 
    fkComponente = 16 and valorRegistro = 0
GROUP BY 
    valorRegistro;
   `
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

module.exports = {        
    buscarDesconectado,
    buscarConectado
};
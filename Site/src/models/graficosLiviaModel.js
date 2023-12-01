const database = require("../database/config");


function buscarConectado(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `
       SELECT 
    valorRegistro,
    CAST(COUNT(*) * 100 / (SELECT COUNT(*) FROM registro WHERE fkComponente = 16) AS DECIMAL(10, 4)) AS porcentagem
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
function buscarUSB(fkServidor) {

    instrucaoSql = `SELECT DATE_FORMAT(usb.dataInicio, '%d/%m/%Y às %H:%i:%s') AS dataInicio, DATE_FORMAT(usb.dataFinal, '%d/%m/%Y às %H:%i:%s') AS dataFinal, servidor.nome
    FROM usb JOIN servidor ON usb.fkServidor = servidor.idServidor
    WHERE usb.fkServidor = ${fkServidor}
    ORDER BY usb.dataFinal DESC;`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {        
    buscarDesconectado,
    buscarConectado,
    buscarUSB
};
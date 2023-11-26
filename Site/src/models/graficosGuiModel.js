const database = require("../database/config");


function buscarMedidasCPU(idSalas){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `
       SELECT 
           AVG(valorRegistro) as CPU,
           DATE_FORMAT(dataRegistro, '%Hh:%i') AS intervalo_tempo
       FROM 
           Registro 
       JOIN 
           Componente ON fkComponente = idComponente 
       JOIN 
           Servidor ON fkServidor = idServidor
       JOIN 
           Salas ON fkSalas = idSalas
       WHERE 
           fkComponente = 1 AND idSalas = 3
       GROUP BY 
           intervalo_tempo
       ORDER BY 
           intervalo_tempo DESC LIMIT 4;
   `
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

function buscarMedidasRAM(idSalas){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
       instrucaoSql = `
       SELECT 
           AVG(valorRegistro) as RAM,
           DATE_FORMAT(dataRegistro, '%Hh:%i') AS intervalo_tempo
       FROM 
           Registro 
       JOIN 
           Componente ON fkComponente = idComponente 
       JOIN 
           Servidor ON fkServidor = idServidor
       JOIN 
           Salas ON fkSalas = idSalas
       WHERE 
           fkComponente = 5 AND idSalas = 3
       GROUP BY 
           intervalo_tempo
       ORDER BY 
           intervalo_tempo DESC LIMIT 4;
   `
   } else {
       console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
       return
   }

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}


module.exports = {        
    buscarMedidasCPU,
    buscarMedidasRAM
};
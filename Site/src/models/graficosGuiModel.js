const database = require("../database/config");


function buscarMedidasCPU(idSalas){
     
       instrucaoSql = `
       SELECT
       AVG(valorRegistro) as CPU,
       DATE_FORMAT(dataRegistro, '%Hh:%i') AS intervalo_tempo,
       MAX(Servidor.nome) as nome_servidor
   FROM
       Registro
   JOIN
       Componente ON fkComponente = idComponente
   JOIN
       Servidor ON fkServidor = idServidor
   JOIN
       Salas ON fkSalas = idSalas
   WHERE
       fkTipoComponente = 1 AND idSalas = ${idSalas}
   GROUP BY
       intervalo_tempo
   ORDER BY
       intervalo_tempo DESC
   LIMIT 4;
   `
  
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

function buscarMedidasRAM(idSalas){
       instrucaoSql = `
       SELECT
       AVG(valorRegistro) as RAM,
       DATE_FORMAT(dataRegistro, '%Hh:%i') AS intervalo_tempo,
       MAX(Servidor.nome) as nome_servidor
   FROM
       Registro
   JOIN
       Componente ON fkComponente = idComponente
   JOIN
       Servidor ON fkServidor = idServidor
   JOIN
       Salas ON fkSalas = idSalas
   WHERE
       fkTipoComponente = 2 AND idSalas = ${idSalas}
   GROUP BY
       intervalo_tempo
   ORDER BY
       intervalo_tempo DESC
   LIMIT 4;
   `
  
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}


function buscarMedidasAtualizadaCPU(idSalas){
       instrucaoSql = `
       SELECT
       AVG(valorRegistro) as CPU,
       DATE_FORMAT(dataRegistro, '%Hh:%i') AS intervalo_tempo,
       MAX(Servidor.nome) as nome_servidor
   FROM
       Registro
   JOIN
       Componente ON fkComponente = idComponente
   JOIN
       Servidor ON fkServidor = idServidor
   JOIN
       Salas ON fkSalas = idSalas
   WHERE
       fkTipoComponente = 1 AND idSalas = ${idSalas}
   GROUP BY
       intervalo_tempo
   ORDER BY
       intervalo_tempo DESC;
   `
   
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

function buscarMedidasAtualizadaRAM(idSalas){
       instrucaoSql = `
       SELECT
       AVG(valorRegistro) as RAM,
       DATE_FORMAT(dataRegistro, '%Hh:%i') AS intervalo_tempo,
       MAX(Servidor.nome) as nome_servidor
   FROM
       Registro
   JOIN
       Componente ON fkComponente = idComponente
   JOIN
       Servidor ON fkServidor = idServidor
   JOIN
       Salas ON fkSalas = idSalas
   WHERE
       fkTipoComponente = 2 AND idSalas = ${idSalas}
   GROUP BY
       intervalo_tempo
   ORDER BY
       intervalo_tempo DESC;
   `
   
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}


function obterDadosDesempenhoMaxCPU(idSalas){
       instrucaoSql = `
       SELECT MAX(valorRegistro) AS maximo_valor, TipoComponente.tipoComponente AS nome_tipo, fkTipoComponente, MAX(DATE_FORMAT(dataRegistro, '%Hh:%i')) AS intervalo_tempo
FROM Registro
JOIN Componente ON fkComponente = idComponente
JOIN TipoComponente ON fkTipoComponente = idTipoComponente
JOIN Servidor ON fkServidor = idServidor
JOIN Salas ON fkSalas = idSalas
WHERE idSalas = ${idSalas}
GROUP BY fkTipoComponente, nome_tipo;
   `
   
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}


// function atualizarListaServidores(idSalas){
//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//        instrucaoSql = `
//        SELECT nome FROM Servidor JOIN Salas ON fkSalas = idSalas WHERE idSalas = ${idSalas};
//    `
//    } else {
//        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//        return
//    }

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }


module.exports = {        
    buscarMedidasCPU,
    buscarMedidasRAM,
    buscarMedidasAtualizadaRAM,
    buscarMedidasAtualizadaCPU,
    obterDadosDesempenhoMaxCPU,
    // atualizarListaServidores
};
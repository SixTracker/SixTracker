const database = require("../database/config");


function buscarMedidasCPU(idSalas){
       instrucaoSql = `
       SELECT
    AVG(valorRegistro) as CPU,
    FORMAT(dataRegistro, 'HH:mm') AS intervalo_tempo,
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
    FORMAT(dataRegistro, 'HH:mm')
ORDER BY
    FORMAT(dataRegistro, 'HH:mm') DESC
OFFSET 0 ROWS
FETCH NEXT 4 ROWS ONLY;
   `
   
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

function buscarMedidasRAM(idSalas){
       instrucaoSql = `
       SELECT
       AVG(valorRegistro) as RAM,
       FORMAT(dataRegistro, 'HH:mm') AS intervalo_tempo,
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
       FORMAT(dataRegistro, 'HH:mm')
   ORDER BY
       FORMAT(dataRegistro, 'HH:mm') DESC
   OFFSET 0 ROWS
   FETCH NEXT 4 ROWS ONLY;   
   `
  
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}


function buscarMedidasAtualizadaCPU(idSalas){
       instrucaoSql = `
       SELECT
       AVG(valorRegistro) as CPU,
       FORMAT(dataRegistro, 'HH:mm') AS intervalo_tempo,
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
       FORMAT(dataRegistro, 'HH:mm')
   ORDER BY
       FORMAT(dataRegistro, 'HH:mm') DESC;
   `
   
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

function buscarMedidasDISCO(idSalas){
       instrucaoSql = `
       SELECT r.valorRegistro AS DISCO
FROM registro r
JOIN Componente c ON r.fkComponente = c.idComponente
WHERE c.nome = 'Porcentagem do Disco';
   `
  
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}


function buscarMedidasAtualizadaDISCO(idSalas){
       instrucaoSql = `
       SELECT r.valorRegistro AS DISCO
FROM registro r
JOIN Componente c ON r.fkComponente = c.idComponente
WHERE c.nome = 'Porcentagem do Disco';
   `
   
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}

function buscarMedidasAtualizadaRAM(idSalas){
       instrucaoSql = `
       SELECT
       AVG(valorRegistro) as RAM,
       FORMAT(dataRegistro, 'HH:mm') AS intervalo_tempo,
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
       FORMAT(dataRegistro, 'HH:mm')
   ORDER BY
       FORMAT(dataRegistro, 'HH:mm') DESC;
   `
   
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
}


function obterDadosDesempenhoMaxCPU(idSalas){
       instrucaoSql = `
       SELECT
       MAX(valorRegistro) AS maximo_valor,
       tipoComponente AS nomeTipo,
       fkTipoComponente,
       MAX(FORMAT(dataRegistro, 'HH:mm')) AS intervalo_tempo
   FROM
       Registro
   JOIN
       Componente ON fkComponente = idComponente
   JOIN
       TipoComponente ON fkTipoComponente = idTipoComponente
   JOIN
       Servidor ON fkServidor = idServidor
   JOIN
       Salas ON fkSalas = idSalas
   WHERE
       idSalas = ${idSalas}
   GROUP BY
       fkTipoComponente, tipoComponente, FORMAT(dataRegistro, 'HH:mm')
   ORDER BY
       fkTipoComponente, tipoComponente, FORMAT(dataRegistro, 'HH:mm') DESC;
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
    buscarMedidasDISCO,
    buscarMedidasAtualizadaDISCO,
    buscarMedidasAtualizadaCPU,
    obterDadosDesempenhoMaxCPU,
    // atualizarListaServidores
};
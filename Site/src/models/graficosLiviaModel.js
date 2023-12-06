const database = require("../database/config");


function buscarConectado() {
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
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
    valorRegistro,
    CAST(COUNT(*) * 100 / (SELECT COUNT(*) FROM registro WHERE fkComponente = 485) AS DECIMAL(10, 4)) AS porcentagem
FROM 
    registro
WHERE 
    fkComponente = 485 and valorRegistro = 1
GROUP BY 
    valorRegistro;
        `
    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDesconectado() {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
       SELECT 
    (COUNT(CASE WHEN valorRegistro = 0 THEN 1 END) * 100 / COUNT(*)) AS porcentagem,
    (SELECT valorRegistro 
     FROM registro 
     WHERE fkComponente = 16 
     ORDER BY dataRegistro DESC 
     LIMIT 1) AS ultimovalor,
    (SELECT COUNT(*) 
     FROM registro 
     WHERE fkComponente = 16 
       AND valorRegistro = 2 
       AND DATE(dataRegistro) = CURDATE() - INTERVAL 1 DAY) AS ultimodia,
    (SELECT COUNT(*) 
     FROM registro 
     WHERE fkComponente = 16 
       AND valorRegistro = 2 
       AND dataRegistro >= CURDATE() - INTERVAL 7 DAY 
       AND dataRegistro <= CURDATE()) AS ultimasemana
FROM 
    registro
WHERE 
    fkComponente = 16;
   `
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `    
SELECT (COUNT(CASE WHEN valorRegistro = 0 THEN 1 END) * 100.0 / COUNT(*)) AS porcentagem,
(SELECT TOP 1 valorRegistro
FROM registro WHERE fkComponente = 485
ORDER BY dataRegistro DESC) AS ultimovalor,
(SELECT COUNT(*) FROM registro
WHERE fkComponente = 485
AND valorRegistro = 2 AND CONVERT(DATE, dataRegistro) = DATEADD(DAY, -1, GETDATE())) AS ultimoDia,
(SELECT COUNT(*) FROM registro WHERE fkComponente = 485
AND valorRegistro = 2 AND CONVERT(DATE, dataRegistro) >= DATEADD(DAY, -7, GETDATE())
AND CONVERT(DATE, dataRegistro) <= GETDATE()) AS ultimaSemana FROM
registro WHERE fkComponente = 485;
`
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarUSB() {

    instrucaoSql = `SELECT 
    FORMAT(USBconectado.dataInicio, 'dd/MM/yyyy ''às'' HH:mm:ss') AS dataInicio,
    FORMAT(USBconectado.dataFinal, 'dd/MM/yyyy ''às'' HH:mm:ss') AS dataFinal,
    servidor.nome AS nome
FROM 
    USBconectado 
JOIN 
    servidor ON USBconectado.fkServidor = servidor.idServidor
WHERE 
    USBconectado.fkServidor = 2
ORDER BY 
    USBconectado.dataFinal DESC;
`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDesconectado,
    buscarConectado,
    buscarUSB
};
var database = require("../database/config");

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

function obterDadosDesempenhoMedio(idSalas){
    instrucaoSql = `
    SELECT
    ROUND(AVG(valorRegistro), 2) AS media_valor,
    fkTipoComponente,
    FORMAT(MIN(dataRegistro), 'HH') AS intervalo_tempo
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
    idSalas = ${idSalas} AND fkTipoComponente = 2
GROUP BY
    fkTipoComponente,
    DATEPART(HOUR, dataRegistro);
`

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function obterDadosqtdRAM(idSalas){
    instrucaoSql = `
    SELECT
    COUNT(*) AS total_componentes
FROM
    Componente JOIN TipoComponente ON fkTipoComponente = idTipoComponente
JOIN Servidor ON fkServidor = idServidor
JOIN Salas ON fkSalas = idSalas
WHERE
    fkTipoComponente = 2
    AND fkSalas = ${idSalas};
`

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function obterDadosHoras(idSalas){
    instrucaoSql = `
    SELECT
    FORMAT(MAX(dataRegistro), 'HH:mm:ss') AS ultima_data_registro_formatada
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
    idSalas = ${idSalas} AND fkTipoComponente = 2;
`

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}


module.exports = {
    buscarMedidasRAM,
    buscarMedidasAtualizadaRAM,
    obterDadosDesempenhoMedio,
    obterDadosqtdRAM,
    obterDadosHoras
};

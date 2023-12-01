var database = require("../database/config");




function tempoRealTempCPU(idServidor) {
    var instrucaoSql = `
	SELECT TOP 1 idRegistro, valorRegistro, FORMAT(dataRegistro, 'HH:mm:ss') AS dataRegistro
FROM Registro
WHERE
    fkComponente IN (
        SELECT idComponente
        FROM Componente
        WHERE fkServidor = 12 AND nome = 'Temperatura CPU'
    )
ORDER BY idRegistro DESC;

    `;

    console.log("Executando a instrução SQL no tiagoModel: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idServidor]);
}

function buscarMedidasTempCPU(idServidor) {
    var instrucaoSql = `
    SELECT TOP 4 idRegistro, valorRegistro, FORMAT(dataRegistro, 'HH:mm:ss') AS dataRegistro
    FROM Registro
    WHERE
        fkComponente IN (
            SELECT idComponente
            FROM Componente
            WHERE fkServidor = 12 AND nome = 'Temperatura CPU'
        )
    ORDER BY idRegistro DESC;

    
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idServidor]);
}

module.exports = {
    tempoRealTempCPU,
    buscarMedidasTempCPU
};

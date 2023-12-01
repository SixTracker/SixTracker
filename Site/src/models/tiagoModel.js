var database = require("../database/config");




function tempoRealTempCPU(idServidor) {
    var instrucaoSql = `
	SELECT TOP 1 valorRegistro, FORMAT(dataRegistro, 'HH:mm') AS dataRegistro
FROM Registro
WHERE
    fkComponente IN (
        SELECT idComponente
        FROM componente
        WHERE fkServidor = 12 AND nome = 'Temperatura CPU'
    )
ORDER BY dataRegistro DESC;

    `;

    console.log("Executando a instrução SQL no tiagoModel: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idServidor]);
}

function buscarMedidasTempCPU(idServidor) {
    var instrucaoSql = `
    SELECT TOP 4 valorRegistro, FORMAT(dataRegistro, 'HH:mm') AS dataRegistro
    FROM Registro
    WHERE
        fkComponente IN (
            SELECT idComponente
            FROM componente
            WHERE fkServidor = 12 AND nome = 'Temperatura CPU'
        )
    ORDER BY dataRegistro DESC;
    
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idServidor]);
}

module.exports = {
    tempoRealTempCPU,
    buscarMedidasTempCPU
};

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
    select valorRegistro, DATE_FORMAT(dataRegistro, '%H:%i') AS dataRegistro
    from registro 
        where 
        fkComponente = 
        (select idComponente from 
            componente 
            where fkServidor = 29
            and nome = "Temperatura CPU" order by idComponente desc limit 4);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idServidor]);
}

module.exports = {
    tempoRealTempCPU,
    buscarMedidasTempCPU
};

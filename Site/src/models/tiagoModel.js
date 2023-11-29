var database = require("../database/config");

function tempoRealTempCPU(idServidor) {
    var instrucaoSql = `
    SELECT 
    valorRegistro,
    DATE_FORMAT(dataRegistro, '%H:%i') AS horaRegistro
FROM registro
ORDER BY dataRegistro DESC
LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
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

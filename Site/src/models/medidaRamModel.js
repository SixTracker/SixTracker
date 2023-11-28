var database = require("../database/config");

function buscarMedidasRAM(idSalas) {

    instrucaoSql = `SELECT
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
        fkTipoComponente = 1 AND idSalas = ${idSalas}
    GROUP BY
        intervalo_tempo
    ORDER BY
        intervalo_tempo DESC
    LIMIT 4;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRAM(idSalas) {

    instrucaoSql = `SELECT
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
        fkTipoComponente = 1 AND idSalas = ${idSalas}
    GROUP BY
        intervalo_tempo
    ORDER BY
        intervalo_tempo DESC;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarMedidasRAM,
    buscarMedidasEmTempoRealRAM
};

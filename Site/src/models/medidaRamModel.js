var database = require("../database/config");

function buscarMedidasRAM(idSalas) {

    instrucaoSql = ''

     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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
       
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRAM(idSalas) {

    instrucaoSql = ''

     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarMedidasRAM,
    buscarMedidasEmTempoRealRAM
};

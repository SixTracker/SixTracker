var database = require("../database/config")

function selectRede(fkServidor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkServidor)
    var instrucao = `
    SELECT bytesEnviados FROM rede WHERE fkServidor = 11;
    `;
   
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selectDisco() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
    select valorRegistro from Registro where fkComponente = 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function buscarMedidasDisco(){
//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//        instrucaoSql = `
//        SELECT
//        AVG(valorRegistro) as DISCO,
//        DATE_FORMAT(dataRegistro, '%Hh:%i') AS intervalo_tempo,
//        MAX(Servidor.nome) as nome_servidor
//    FROM
//        Registro
//    JOIN
//        Componente ON fkComponente = 10
//    JOIN
//        Servidor ON fkServidor = idServidor
//    WHERE
//        fkTipoComponente = 3
//    GROUP BY
//        intervalo_tempo
//    ORDER BY
//        intervalo_tempo DESC
//    LIMIT 4;
//    `
//    } else {
//        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//        return
//    }

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }

// function buscarMedidasRede(){
//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//        instrucaoSql = `
//        SELECT
//        AVG(bytesEnviados) as Rede,
//        DATE_FORMAT(dataHora, '%Hh:%i') AS intervalo_tempo,
//        MAX(Servidor.nome) as nome_servidor
//    FROM
//        Rede
//    JOIN
//        Servidor ON fkServidor = idServidor
//    GROUP BY
//        intervalo_tempo
//    ORDER BY
//        intervalo_tempo DESC
//    LIMIT 4;
//    `
//    } else {
//        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//        return
//    }

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }


// function buscarMedidasAtualizadaDisco(){
//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//        instrucaoSql = `
//        SELECT
//        AVG(valorRegistro) as DISCO,
//        DATE_FORMAT(dataRegistro, '%Hh:%i') AS intervalo_tempo,
//        MAX(Servidor.nome) as nome_servidor
//    FROM
//        Registro
//    JOIN
//        Componente ON fkComponente = 10
//    JOIN
//        Servidor ON fkServidor = idServidor
//    WHERE
//        fkTipoComponente = 3
//    GROUP BY
//        intervalo_tempo
//    ORDER BY
//        intervalo_tempo DESC;
//    `
//    } else {
//        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//        return
//    }

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }

// function buscarMedidasAtualizadaRede(){
//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//        instrucaoSql = `
//        SELECT
//        AVG(bytesEnviados) as Rede,
//        DATE_FORMAT(dataHora, '%Hh:%i') AS intervalo_tempo,
//        MAX(Servidor.nome) as nome_servidor
//    FROM
//        Rede
//    JOIN
//        Servidor ON fkServidor = idServidor
//    GROUP BY
//        intervalo_tempo
//    ORDER BY
//        intervalo_tempo DESC;
//    `
//    } else {
//        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//        return
//    }

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }

module.exports = {
    // buscarMedidasDisco,
    // buscarMedidasRede,
    // buscarMedidasAtualizadaDisco,
    // buscarMedidasAtualizadaRede,
    selectDisco,
    selectRede
}
var database = require("../database/config");

// function buscarUltimasMedidas(idServidor, limite_linhas) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select top ${limite_linhas}
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,  
//                         momento,
//                         FORMAT(momento, 'HH:mm:ss') as momento_grafico
//                     from medida
//                     where fk_aquario = ${idAquario}
//                     order by id desc`;
//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         momento,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
//                     from medida
//                     where fk_aquario = ${idAquario}
//                     order by id desc limit ${limite_linhas}`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


function buscarMetricas(idServidor) {

    instrucaoSql = `
            WITH RankedData AS (
                SELECT
                    C.idComponente AS ID,
                    C.nome AS NomeDoComponente,
                    R.valorRegistro AS ValorDoRegistro,
                    U.unidadeMedida AS UnidadeDeMedida,
                    TC.tipoComponente AS TipoDeComponente,
                    M.tipo_dado AS Metrica,
                    R.dataRegistro AS DataDoRegistro,
                    c.fkServidor,
                    ROW_NUMBER() OVER (PARTITION BY TC.tipoComponente ORDER BY R.dataRegistro) AS RowNum
                FROM Componente C
                LEFT JOIN Servidor S ON C.fkServidor = S.idServidor
                LEFT JOIN UnidadeMedida U ON C.fkUnidadeMedida = U.idUnidadeMedida
                LEFT JOIN TipoComponente TC ON C.fkTipoComponente = TC.idTipoComponente
                LEFT JOIN Metrica M ON C.fkMetrica = M.idMetrica
                LEFT JOIN Registro R ON C.idComponente = R.fkComponente
                WHERE idUnidadeMedida = 1 AND idTipoComponente IN (1, 2, 3)
                )
            SELECT
                ID,
                NomeDoComponente,
                ValorDoRegistro,
                UnidadeDeMedida,
                TipoDeComponente,
                Metrica,
                DataDoRegistro,
                fkServidor
            FROM RankedData
            WHERE RowNum = 1
            ORDER BY DataDoRegistro;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasDisco() {
    var instrucaoSql = `
    SELECT
    MAX(valorRegistro) as Disco,
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
    idComponente = 403
GROUP BY
    FORMAT(dataRegistro, 'HH:mm')
ORDER BY
    FORMAT(dataRegistro, 'HH:mm') DESC
	OFFSET 0 ROWS FETCH NEXT 4 ROWS ONLY; `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}


function tempoRealDisco(){
    instrucaoSql = `
    SELECT
    MAX(valorRegistro) as Disco,
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
    idComponente = 403
GROUP BY
    FORMAT(dataRegistro, 'HH:mm')
ORDER BY
    FORMAT(dataRegistro, 'HH:mm') DESC
    `
    console.log("Executando instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasRAM() {
    var instrucaoSql = `
    SELECT
    ROUND(AVG(valorRegistro),2) as RAM,
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
    fkTipoComponente = 2
GROUP BY
    FORMAT(dataRegistro, 'HH:mm')
ORDER BY
    FORMAT(dataRegistro, 'HH:mm') DESC
	OFFSET 0 ROWS FETCH NEXT 4 ROWS ONLY;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}


function tempoRealRAM(){
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
    fkTipoComponente = 2 
GROUP BY
    FORMAT(dataRegistro, 'HH:mm')
ORDER BY
    FORMAT(dataRegistro, 'HH:mm') DESC;
    `
    console.log("Executando instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasCPU() {
    var instrucaoSql = `
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
    fkTipoComponente = 1 AND idServidor = 12
GROUP BY
    FORMAT(dataRegistro, 'HH:mm')
ORDER BY
    FORMAT(dataRegistro, 'HH:mm') DESC
	OFFSET 0 ROWS FETCH NEXT 4 ROWS ONLY;
`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}


function tempoRealCPU(){
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
    fkTipoComponente = 1 AND idServidor = 12
GROUP BY
    FORMAT(dataRegistro, 'HH:mm')
ORDER BY
    FORMAT(dataRegistro, 'HH:mm') DESC;
    `
    console.log("Executando instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarMedidasDisco,
    // buscarUltimasMedidas,
    buscarMetricas,
    tempoRealDisco,
    buscarMedidasRAM,
    tempoRealRAM,
    buscarMedidasCPU,
    tempoRealCPU
}

/*
var database = require("../database/config");

function buscarUltimasMedidas() {

    
    instrucaoSql = ''

    // if (process.env.AMBIENTE_PROCESSO == "producao") {
    //     instrucaoSql = `select top ${limite_linhas}
    //     dht11_temperatura as temperatura, 
    //     dht11_umidade as umidade,  
    //                     momento,
    //                     FORMAT(momento, 'HH:mm:ss') as momento_grafico
    //                 from medida
    //                 where fk_aquario = ${idUsuario}
    //                 order by id desc`;
// }
     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select count(joel) as Joel, count(ellie) as Ellie, count(bill) as Bill, count(infectados) as Infectados, count(tess) as Tess from personagens join usuario on usuario.id = fkusuario;
       `;
       
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal() {

    instrucaoSql = ''

    // if (process.env.AMBIENTE_PROCESSO == "producao") {
    //     instrucaoSql = `select top 1
    //     dht11_temperatura as temperatura, 
    //     dht11_umidade as umidade,  
    //                     CONVERT(varchar, momento, 108) as momento_grafico, 
    //                     fk_aquario 
    //                     from medida where fk_aquario = ${idUsuario} 
    //                 order by id desc`;

    // } 
     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select count(joel) as Joel, count(ellie) as Ellie, count(bill) as Bill, count(infectados) as Infectados, count(tess) as Tess from personagens join usuario on usuario.id = fkusuario;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
*/
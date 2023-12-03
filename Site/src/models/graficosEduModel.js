const database = require("../database/config");


// function buscarMedidasCPU(idServidor){

//        instrucaoSql = `
//        SELECT
//     AVG(valorRegistro) as CPU,
//     FORMAT(dataRegistro, 'HH:mm') AS intervalo_tempo,
//     MAX(Servidor.nome) as nome_servidor
// FROM
//     Registro
// JOIN
//     Componente ON fkComponente = idComponente
// JOIN
//     Servidor ON fkServidor = idServidor
// JOIN
//     Salas ON fkSalas = idServidor
// WHERE
//     fkTipoComponente = 1 AND idServidor = ${idServidor}
// GROUP BY
//     FORMAT(dataRegistro, 'HH:mm')
// ORDER BY
//     FORMAT(dataRegistro, 'HH:mm') DESC
// OFFSET 0 ROWS
// FETCH NEXT 4 ROWS ONLY;

//    `

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }

// function buscarMedidasRAM(idServidor){
//        instrucaoSql = `
//        SELECT
//     AVG(valorRegistro) as RAM,
//     FORMAT(dataRegistro, 'HH:mm') AS intervalo_tempo,
//     MAX(Servidor.nome) as nome_servidor
// FROM
//     Registro
// JOIN
//     Componente ON fkComponente = idComponente
// JOIN
//     Servidor ON fkServidor = idServidor
// JOIN
//     Salas ON fkSalas = idServidor
// WHERE
//     fkTipoComponente = 2 AND idServidor = ${idServidor}
// GROUP BY
//     FORMAT(dataRegistro, 'HH:mm')
// ORDER BY
//     FORMAT(dataRegistro, 'HH:mm') DESC
// OFFSET 0 ROWS
// FETCH NEXT 4 ROWS ONLY;

//    `

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }

// function buscarMedidasAtualizadaCPU(idServidor){
//        instrucaoSql = `
//        SELECT
//     AVG(valorRegistro) as CPU,
//     FORMAT(dataRegistro, 'HH:mm') AS intervalo_tempo,
//     MAX(Servidor.nome) as nome_servidor
// FROM
//     Registro
// JOIN
//     Componente ON fkComponente = idComponente
// JOIN
//     Servidor ON fkServidor = idServidor
// JOIN
//     Salas ON fkSalas = idServidor
// WHERE
//     fkTipoComponente = 1 AND idServidor = ${idServidor}
// GROUP BY
//     FORMAT(dataRegistro, 'HH:mm')
// ORDER BY
//     FORMAT(dataRegistro, 'HH:mm') DESC;
//    `

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }

// function buscarMedidasAtualizadaRAM(idServidor){
//        instrucaoSql = `
//        SELECT
//     AVG(valorRegistro) as RAM,
//     FORMAT(dataRegistro, 'HH:mm') AS intervalo_tempo,
//     MAX(Servidor.nome) as nome_servidor
// FROM
//     Registro
// JOIN
//     Componente ON fkComponente = idComponente
// JOIN
//     Servidor ON fkServidor = idServidor
// JOIN
//     Salas ON fkSalas = idServidor
// WHERE
//     fkTipoComponente = 2 AND idServidor = ${idServidor}
// GROUP BY
//     FORMAT(dataRegistro, 'HH:mm')
// ORDER BY
//     FORMAT(dataRegistro, 'HH:mm') DESC;
//    `

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }

function tempoRealEdu(idServidor) {
    var instrucaoSql = `
    SELECT s.idServidor, s.nome AS NomeServidor,
r_disco.valorRegistro AS ValorRegistro_DISCO,
r_cpu.valorRegistro AS ValorRegistro_CPU,
r_memoria.valorRegistro AS ValorRegistro_Memoria FROM Servidor AS s INNER JOIN Componente 
AS c_disco ON s.idServidor = c_disco.fkServidor INNER JOIN Registro AS r_disco ON
c_disco.idComponente = r_disco.fkComponente INNER JOIN TipoComponente 
AS tc_disco ON c_disco.fkTipoComponente = tc_disco.idTipoComponente
AND tc_disco.tipoComponente = 'DISCO' INNER JOIN Componente AS c_cpu 
ON s.idServidor = c_cpu.fkServidor INNER JOIN Registro AS r_cpu ON c_cpu.idComponente = r_cpu.fkComponente 
INNER JOIN TipoComponente AS tc_cpu ON c_cpu.fkTipoComponente = tc_cpu.idTipoComponente
AND tc_cpu.tipoComponente = 'CPU' INNER JOIN Componente AS c_memoria ON s.idServidor = c_memoria.fkServidor
INNER JOIN Registro AS r_memoria ON c_memoria.idComponente = r_memoria.fkComponente INNER JOIN TipoComponente 
AS tc_memoria ON c_memoria.fkTipoComponente = tc_memoria.idTipoComponente
AND tc_memoria.tipoComponente = 'RAM' WHERE s.nome = 'Chris Server'
AND c_disco.fkServidor = idServidor ORDER BY r_disco.idRegistro OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idServidor]);
}

function buscarMedidas() {
    var instrucaoSql = `
    SELECT 
    s.idServidor,
    s.nome AS NomeServidor,
    MAX(CASE WHEN c.nome = 'Total do Disco' THEN r.valorRegistro END) AS ValorRegistro_DISCO,
    MAX(CASE WHEN c.nome = 'Porcentagem da CPU' THEN r.valorRegistro END) AS ValorRegistro_CPU,
    MAX(CASE WHEN c.nome = 'Porcentagem da Memoria' THEN r.valorRegistro END) AS ValorRegistro_Memoria
FROM Servidor AS s
    LEFT JOIN Componente AS c 
        ON s.idServidor = c.fkServidor
    LEFT JOIN Registro AS r 
        ON c.idComponente = r.fkComponente
WHERE s.nome = 'Servidor Principal'
GROUP BY s.idServidor, s.nome;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idServidor]);
}

module.exports = {
    tempoRealEdu,
    buscarMedidas
};


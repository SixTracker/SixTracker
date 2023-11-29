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

function buscarMedidas(idServidor) {
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


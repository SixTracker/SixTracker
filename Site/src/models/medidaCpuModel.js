var database = require("../database/config");

// function listarGuias(fkGuia) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select nomeGuia, count(*) as contagem from cadastro 
//                         inner join guia on fkGuia = idGuia	
                       
//                         group by nomeGuia`
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }
//     return database.executar(instrucaoSql);
// }

// function buscarUltimasMedidas(fkGuia, limite_linhas) {

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
//     }
    // else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    //     instrucaoSql = `select fkGuia from cadastro 
    //                     where fkGuia = ${fkGuia}  
    //                     order by id desc limit ${limite_linhas}`;
    // } 
    // else {
    //     console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    //     return
    // }

    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    // return database.executar(instrucaoSql);
//}

function capturar() {



    // if (process.env.AMBIENTE_PROCESSO == "producao") {
    //     instrucaoSql = `select top 1
    //     dht11_temperatura as temperatura, 
    //     dht11_umidade as umidade,  
    //                     CONVERT(varchar, momento, 108) as momento_grafico, 
    //                     fk_aquario 
    //                     from medida where fk_aquario = ${idAquario} 
    //                 order by id desc`;

    // } 
    
        instrucaoSql = `
        SELECT * FROM Registro JOIN Componente ON fkComponente = idComponente WHERE tipo = "Processador" AND fkServidor = 1;
`
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    // listarGuias,
    capturar
}

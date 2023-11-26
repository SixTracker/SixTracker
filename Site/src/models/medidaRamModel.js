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
        instrucaoSql = ``;
       
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

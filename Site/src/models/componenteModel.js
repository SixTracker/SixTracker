const database = require("../database/config");


function listarComponentes(fkEmpresa) {
    instrucaoSql = `SELECT 
       idComponente, 
       Componente.nome as nomeComponente, 
       Componente.modelo,
       Componente.fabricante, 
       Componente.fkUnidadeMedida, 
       Componente.fkServidor, 
       Componente.fkTipoComponente, 
       Servidor.nome, 
       UnidadeMedida.unidadeMedida,
       TipoComponente.tipoComponente
       FROM Componente JOIN Servidor 
       ON fkServidor = idServidor
       JOIN UnidadeMedida ON fkUnidadeMedida = idUnidadeMedida
       JOIN TipoComponente ON fkTipoComponente = idTipoComponente
       JOIN Salas ON fkSalas = idSalas 
       WHERE fkEmpresa = ${fkEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidas() {
    instrucaoSql = `select 
        *
           from UnidadeMedida`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarComponentes() {
    instrucaoSql = `
        select 
            *
           from TipoComponente;`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function buscarNivelPermissao(){
//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//        instrucaoSql = `SELECT nomeCargo FROM NivelAcesso;`;
//    } else {
//        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//        return
//    }

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
// }

function buscarFuncionarios(fkEmpresa) {

    instrucaoSql = `SELECT nome,email,telefone FROM Funcionario where fkEmpresa = ${fkEmpresa} ORDER BY nome ASC;`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarComponente(nome, fornecedor, modelo, Servidor, UnidadeMedida, TipoComponente) {
    console.log("ACESSEI O componente MODEL - function cadastrarComponente():", nome, fornecedor, modelo, Servidor, UnidadeMedida, TipoComponente);

    var instrucao = `
                INSERT INTO Componente (nome, modelo, fabricante, fkServidor, fkUnidadeMedida, fkTipoComponente) VALUES ('${nome}', '${modelo}', '${fornecedor}', ${Servidor}, ${UnidadeMedida}, ${TipoComponente});
            `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function editarComponente(idComponente, nome, fornecedor, modelo, servidorSelect2, medidaSelect2, componenteSelect2) {
    var instrucao = `
    UPDATE Componente SET nome = '${nome}', modelo = '${modelo}', fabricante = '${fornecedor}', fkServidor = ${servidorSelect2}, fkUnidadeMedida = ${medidaSelect2}, fkTipoComponente = ${componenteSelect2} WHERE idComponente = ${idComponente};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarComponente(idComponente) {
    console.log("ACESSEI O Componente MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idComponente);

    // Início da transação
    var instrucaoRegistro = `
    DELETE FROM registro WHERE fkComponente = ${idComponente}; 
    `;

    var instrucaoComponente = `
    DELETE FROM componente WHERE idComponente = ${idComponente};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoRegistro);
    console.log("Executando a instrução SQL: \n" + instrucaoComponente);

    database.executar(instrucaoRegistro);
    return database.executar(instrucaoComponente);
}




module.exports = {
    listarComponentes,
    buscarMedidas,
    buscarComponentes,
    buscarFuncionarios,
    cadastrarComponente,
    editarComponente,
    deletarComponente
    // buscarNivelPermissao
};
var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM funcionario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
async function cadastrar(nomeEmp, cnpj, cep, estado, rua, numero, bairro, cidade) {
    console.log("ACESSEI O USUARIO MODEL - function cadastrar():", nomeEmp, cnpj, cep, estado, rua, numero, bairro, cidade);

    // 1. Primeiro, insira os dados na tabela Empresa
    const inserirEmpresa = `
        INSERT INTO Empresa (nome, CNPJ) VALUES ('${nomeEmp}', '${cnpj}')
    `;

    try {
        const resultadoEmpresa = await database.executar(inserirEmpresa);
        
        if (resultadoEmpresa && resultadoEmpresa.insertId) {
            const userId = resultadoEmpresa.insertId;
            
            // 2. Em seguida, insira os dados na tabela Endereco usando o ID da empresa
            const inserirEndereco = `
                INSERT INTO Endereco (CEP, estado, rua, numero, bairro, cidade, fkEmpresa)
                VALUES ('${cep}', '${estado}', '${rua}', '${numero}', '${bairro}', '${cidade}', ${userId})
            `;

            console.log("Executando a instrução SQL para Endereco: \n" + inserirEndereco);

            const resultadoEndereco = await database.executar(inserirEndereco);

            console.log("Dados inseridos com sucesso.");
            return resultadoEndereco;
        } else {
            console.error("Houve um erro ao inserir na tabela Empresa.");
            throw new Error("Erro ao cadastrar.");
        }
    } catch (erro) {
        console.error("Erro ao realizar o cadastro:", erro);
        throw erro;
    }
}



async function buscaridEmpresa(nomeEmp) {
    console.log("ACESSEI O USUARIO MODEL - function buscaridEmpresa():", nomeEmp);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    // e na ordem de inserção dos dados.
    var instrucao = `
        SELECT idEmpresa FROM Empresa WHERE nome = '${nomeEmp}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    try {
        const resultado = await database.executar(instrucao);
        return resultado;
    } catch (erro) {
        // Lide com erros aqui
        console.error("Erro ao buscar o ID da empresa:", erro);
        throw erro; // Lançar o erro para que possa ser tratado posteriormente
    }
}


async function cadastrarADM(nome, cpf, email, telefone, senha, fkempresa) {
    console.log("ACESSEI O USUARIO MODEL - function cadastrarADM():", nome, cpf, email, telefone, senha, fkempresa);

    const buscarEmpresa = `
        SELECT idEmpresa FROM Empresa WHERE nome = '${fkempresa}';
    `;

    try {
        const resultadoEmpresa = await database.executar(buscarEmpresa);

        if (resultadoEmpresa && resultadoEmpresa.length > 0) {
            // Extraia o ID da empresa do resultado da consulta
            const userId = resultadoEmpresa[0].idEmpresa;

            var instrucao = `
                INSERT INTO Funcionario (nome, cpf, email, telefone, senha, fkEmpresa, fkNivelAcesso) VALUES ('${nome}', '${cpf}', '${email}', '${telefone}', '${senha}', ${userId},1);
            `;
            console.log("Executando a instrução SQL: \n" + instrucao);

            return database.executar(instrucao);
        } else {
            console.error("Nenhum resultado encontrado para a empresa com o nome:", fkempresa);
            throw new Error("Erro ao cadastrar.");
        }
    } catch (erro) {
        console.error("Erro ao realizar o cadastro:", erro);
        throw erro;
    }
}

async function cadastrarUser(nome, cpf, email, nivelPermissao, telefone, senha, fkempresa) {
    console.log("ACESSEI O USUARIO MODEL - function cadastrarUser():", nome, cpf, email, nivelPermissao, telefone, senha, fkempresa);

    const buscarEmpresa = `
        SELECT idEmpresa FROM Empresa WHERE nome = '${fkempresa}';
    `;

    try {
        const resultadoEmpresa = await database.executar(buscarEmpresa);

        if (resultadoEmpresa && resultadoEmpresa.length > 0) {
            // Extraia o ID da empresa do resultado da consulta
            const userId = resultadoEmpresa[0].idEmpresa;

            var instrucao = `
                INSERT INTO Funcionario (nome, cpf, email, telefone, senha, fkEmpresa, fkNivelAcesso) VALUES ('${nome}', '${cpf}', '${email}', '${telefone}', '${senha}', ${userId},${nivelPermissao});
            `;
            console.log("Executando a instrução SQL: \n" + instrucao);

            return database.executar(instrucao);
        } else {
            console.error("Nenhum resultado encontrado para a empresa com o nome:", fkempresa);
            throw new Error("Erro ao cadastrar.");
        }
    } catch (erro) {
        console.error("Erro ao realizar o cadastro:", erro);
        throw erro;
    }
}

async function cadastrarComponente(nome, fornecedor, modelo, maxima, minima, total, Servidor, UnidadeMedida, TipoComponente) {
    console.log("ACESSEI O USUARIO MODEL - function cadastrarComponente():", nome, fornecedor, modelo, maxima, minima, total, Servidor, UnidadeMedida, TipoComponente);

    // const buscarEmpresa = `
    //     SELECT idEmpresa FROM Empresa WHERE nome = '${fkempresa}';
    // `;

    var instrucao = `
                INSERT INTO Componente (nomeComponente, modeloComponente, fabricante, metricaMin, metricaMax, valorTotal, fkServidor, fkUnidadeMedida, fkTipoComponente) VALUES ('${nome}', '${modelo}', '${fornecedor}', '${minima}', '${maxima}', ${total},${Servidor}, ${UnidadeMedida}, ${TipoComponente}, );
            `;
            console.log("Executando a instrução SQL: \n" + instrucao);

            return database.executar(instrucao);
}





module.exports = {
            entrar,
            cadastrar,            
            cadastrarADM,
            cadastrarUser,
            cadastrarComponente,
            buscaridEmpresa,
            listar,
        };
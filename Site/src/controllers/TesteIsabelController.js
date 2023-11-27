const fs = require('fs');
const os = require('os');
const IsabelModel = require('../models/IsabelModel');

function capturar(req, res) {
    console.log(`Recuperando medidas em tempo real`);

    // Obter informações de uso de disco
    const diskPath = '/'; // Caminho do disco que você deseja monitorar
    const diskUsage = obterUsoDeDisco(diskPath);

    // Obter informações de uso da rede
    const networkUsage = obterUsoDeRede();

    // Adicione os dados ao seu modelo ou manipule conforme necessário
    IsabelModel.capturar().then(function (resultado) {
        if (resultado.length > 0) {
            // Adicione os dados de uso de disco e rede ao resultado
            resultado.push({
                diskUsage: diskUsage,
                networkUsage: networkUsage,
            });

            res.status(200).json(resultado);
        } else {
            res.status(204).send('Nenhum resultado encontrado!');
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log('Houve um erro ao buscar as últimas medidas.', erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterUsoDeDisco(path) {
    try {
        const stats = fs.statSync(path);
        const total = stats.blocks * stats.blksize;
        const livre = stats.blocks * stats.blksize - stats.size;
        const usoPercentual = (livre / total) * 100;
        return {
            total: total,
            livre: livre,
            usoPercentual: usoPercentual,
        };
    } catch (erro) {
        console.error('Erro ao obter informações de uso de disco:', erro.message);
        return null;
    }
}

function obterUsoDeRede() {
    try {
        const interfaces = os.networkInterfaces();
        return interfaces;
    } catch (erro) {
        console.error('Erro ao obter informações de uso de rede:', erro.message);
        return null;
    }
}

module.exports = {
    capturar,
};

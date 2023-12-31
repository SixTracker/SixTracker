var express = require("express");
var router = express.Router();

var graficoChrisController = require("../controllers/graficoChrisController");

router.get("/medidasRAM/:idSalas", function (req, res) {
    graficoChrisController.buscarMedidasRAM(req, res);
});

router.get("/medidasAtualizadaRAM/:idSalas", function (req, res) {
    graficoChrisController.buscarMedidasAtualizadaRAM(req, res);
});

router.get("/obterDadosDesempenhoMedio/:idSalas", function (req, res) {
    graficoChrisController.obterDadosDesempenhoMedio(req, res);
});

router.get("/obterDadosqtdRAM/:idSalas", function (req, res) {
    graficoChrisController.obterDadosqtdRAM(req, res);
});

router.get("/obterDadosHoras/:idSalas", function (req, res) {
    graficoChrisController.obterDadosHoras(req, res);
});

module.exports = router;
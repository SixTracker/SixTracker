var express = require("express");
var router = express.Router();

var graficoChrisController = require("../controllers/graficoChrisController");

router.get("/medidasRAM/:idSalas", function (req, res) {
    graficoChrisController.buscarMedidasRAM(req, res);
});

router.get("/medidasAtualizadaRAM/:idSalas", function (req, res) {
    graficoChrisController.buscarMedidasAtualizadaRAM(req, res);
});

module.exports = router;
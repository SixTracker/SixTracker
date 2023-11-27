var express = require("express");
var router = express.Router();

var graficoChrisController = require("../controllers/graficoChrisController");

router.get("/medidasRAM/:idSalas", function (req, res) {
    graficoChrisController.buscarMedidasRAM(req, res);
});

router.get("/medidasAtualizadasRAM/:idSalas", function (req, res) {
    graficoChrisController.buscarMedidasEmTempoRealRAM(req, res);
});

module.exports = router;
var express = require("express");
var router = express.Router();

var graficosGuiController = require("../controllers/graficosGuiController");

router.get("/medidasRAM/:idSalas", function (req, res) {
    graficosGuiController.buscarMedidasRAM(req, res);
});

router.get("/medidasAtualizadaRAM/:idSalas", function (req, res) {
    graficosGuiController.buscarMedidasAtualizadaRAM(req, res);
});

module.exports = router;
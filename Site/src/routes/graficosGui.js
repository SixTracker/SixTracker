var express = require("express");
var router = express.Router();

var graficosGuiController = require("../controllers/graficosGuiController");

router.get("/medidasCPU/:idSalas", function (req, res) {
    graficosGuiController.buscarMedidasCPU(req, res);
});

router.get("/medidasRAM/:idSalas", function (req, res) {
    graficosGuiController.buscarMedidasRAM(req, res);
});

router.get("/medidasAtualizadaCPU/:idSalas", function (req, res) {
    graficosGuiController.buscarMedidasAtualizadaCPU(req, res);
});

router.get("/medidasAtualizadaRAM/:idSalas", function (req, res) {
    graficosGuiController.buscarMedidasAtualizadaRAM(req, res);
});

module.exports = router;
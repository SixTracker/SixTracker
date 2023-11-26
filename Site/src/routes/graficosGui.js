var express = require("express");
var router = express.Router();

var graficosGuiController = require("../controllers/graficosGuiController");

router.get("/medidasCPU/:idSalas", function (req, res) {
    graficosGuiController.buscarMedidasCPU(req, res);
});

router.get("/medidasRAM/:idSalas", function (req, res) {
    graficosGuiController.buscarMedidasRAM(req, res);
});

module.exports = router;
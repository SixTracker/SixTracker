var express = require("express");
var router = express.Router();

var dashAnalistaController = require("../controllers/dashAnalistaController");

router.get("/medidasCPU/:idSalas", function (req, res) {
    dashAnalistaController.buscarMedidasCPU(req, res);
});

router.get("/medidasRAM/:idSalas", function (req, res) {
    dashAnalistaController.buscarMedidasRAM(req, res);
});

router.get("/medidasAtualizadaCPU/:idSalas", function (req, res) {
    dashAnalistaController.buscarMedidasAtualizadaCPU(req, res);
});

router.get("/medidasAtualizadaRAM/:idSalas", function (req, res) {
    dashAnalistaController.buscarMedidasAtualizadaRAM(req, res);
});

router.get("/obterDadosDesempenhoMaxCPU/:idSalas", function (req, res) {
    dashAnalistaController.obterDadosDesempenhoMaxCPU(req, res);
});

router.get("/medidasDISCO/:idSalas", function (req, res) {
    dashAnalistaController.buscarMedidasDISCO(req, res);
});

router.get("/medidasAtualizadaDISCO/:idSalas", function (req, res) {
    dashAnalistaController.buscarMedidasAtualizadaDISCO(req, res);
});

// router.get("/atualizarListaServidores/:idSalas", function (req, res) {
//     graficosGuiController.atualizarListaServidores(req, res);
// });

module.exports = router;
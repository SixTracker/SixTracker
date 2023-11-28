var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idMedidas", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/metricas/:idServidor", function (req, res) {
    medidaController.buscarMetricas(req, res);
})

router.get("/disco/:idServidor", function (req, res) {
    medidaController.buscarMedidasDisco(req, res);
})
router.get("/ultimasDisco/:idServidor", function (req, res) {
    medidaController.buscarMedidasDisco(req, res);
});

router.get("/tempoRealDisco/:idServidor", function (req, res) {
    medidaController.tempoRealDisco(req, res);
});

router.get("/ultimasRAM/:idServidor", function (req, res) {
    medidaController.buscarMedidasRAM(req, res);
});

router.get("/tempoRealRAM/:idServidor", function (req, res) {
    medidaController.tempoRealRAM(req, res);
});



module.exports = router;
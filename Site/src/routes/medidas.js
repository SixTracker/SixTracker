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

router.get("/ultimasDisco/", function (req, res) {
    medidaController.buscarMedidasDisco(req, res);
});

router.get("/tempoRealDisco/", function (req, res) {
    medidaController.tempoRealDisco(req, res);
});

router.get("/ultimasRAM/", function (req, res) {
    medidaController.buscarMedidasRAM(req, res);
});

router.get("/tempoRealRAM/", function (req, res) {
    medidaController.tempoRealRAM(req, res);
});


router.get("/ultimasCPU/", function (req, res) {
    medidaController.buscarMedidasCPU(req, res);
});

router.get("/tempoRealCPU/", function (req, res) {
    medidaController.tempoRealCPU(req, res);
});



module.exports = router;
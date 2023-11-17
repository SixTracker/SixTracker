var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/metricas/:idServidor", function (req, res) {
    medidaController.buscarMetricas(req, res);
})


module.exports = router;
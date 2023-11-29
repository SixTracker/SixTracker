const express = require("express");
const router = express.Router();

var tiagoController = require("../controllers/tiagoController");

router.get("/ultimasTempCPU/:idServidor", function (req, res) {
    tiagoController.buscarMedidasTempCPU(req, res);
});

router.get("/tempoRealTempCPU/:idServidor", function (req, res) {
    tiagoController.tempoRealTempCPU(req, res);
});

module.exports = router;
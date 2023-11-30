var express = require("express");
var router = express.Router();

var graficosEduController = require("../controllers/graficosEduController");

router.get("/medidasGeral/:idServidor", function (req, res) {
    graficosEduController.buscarMedidas(req, res);
});

router.get("/tempoRealEdu/:idServidor", function (req, res) {
    graficosEduController.tempoRealEdu(req, res);
});

module.exports = router;
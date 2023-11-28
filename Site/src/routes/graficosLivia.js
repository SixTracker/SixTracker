var express = require("express");
var router = express.Router();

var graficosLiviaController = require("../controllers/graficosLiviaController");

router.get("/medidasConectado/", function (req, res) {
    graficosLiviaController.buscarConectado(req, res);
});

router.get("/medidasDesconectado/", function (req, res) {
    graficosLiviaController.buscarDesconectado(req, res);
});


module.exports = router;
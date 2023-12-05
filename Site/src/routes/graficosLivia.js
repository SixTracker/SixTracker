const express = require("express");
const router = express.Router();

var graficosLiviaController = require("../controllers/graficosLiviaController");

router.get("/medidasConectado/", function (req, res) {
    graficosLiviaController.buscarConectado(req, res);
});

router.get("/medidasDesconectado/", function (req, res) {
    graficosLiviaController.buscarDesconectado(req, res);
});
router.get("/buscarUSB/", function (req, res) {
    graficosLiviaController.buscarUSB(req, res);
});


module.exports = router;
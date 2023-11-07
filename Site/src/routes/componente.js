var express = require("express");
var router = express.Router();

var componenteController = require("../controllers/componenteController");


router.get("/buscar/", function (req, res) {
    componenteController.buscarServidores(req, res);
})

router.get("/unidade/", function (req, res) {
    componenteController.buscarMedidas(req, res);
})

router.get("/tipo/", function (req, res) {
    componenteController.buscarComponentes(req, res);
})

router.get("/buscarNivelPermissao/", function (req, res) {
    componenteController.buscarNivelPermissao(req, res);
})

module.exports = router;
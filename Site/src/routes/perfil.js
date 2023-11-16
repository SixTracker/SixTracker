var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

router.put("/AtualizarImg", function (req, res) {
    perfilController.AtualizarImg(req, res);
});

router.post("/consultar", function (req, res) {
    perfilController.consultar(req, res);
});

router.post("/atualizarPerfil", function (req, res) {
    perfilController.atualizarPerfil(req, res);
});

module.exports = router;
var express = require("express");
var router = express.Router();

var salaController = require("../controllers/salaController");

router.get("/", function (req, res) {
    salaController.testar(req, res);
});

// router.get("/listar", function (req, res) {
//     servidorController.listar(req, res);
// });

// router.get("/listar/:idUsuario", function (req, res) {
//     avisoController.listarPorUsuario(req, res);
// });

// router.get("/pesquisar/:descricao", function (req, res) {
//     avisoController.pesquisarDescricao(req, res);
// });

router.post("/publicar", function (req, res) {
    salaController.publicar(req, res);
});

router.put("/editar/:idSala", function (req, res) {
    salaController.editar(req, res);
});

router.delete("/deletar/:idSala", function (req, res) {
    salaController.deletar(req, res);
});

router.get("/buscar/", function (req, res) {
    salaController.buscarSalas(req, res);
})


module.exports = router;
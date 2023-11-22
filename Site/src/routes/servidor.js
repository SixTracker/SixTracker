var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.get("/", function (req, res) {
    servidorController.testar(req, res);
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
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    servidorController.publicar(req, res);
});

router.put("/editar/:idServidor", function (req, res) {
    servidorController.editar(req, res);
});

router.delete("/deletar/:idServidor", function (req, res) {
    servidorController.deletar(req, res);
});

router.get("/buscar/", function (req, res) {
    servidorController.buscarServidores(req, res);
})


module.exports = router;
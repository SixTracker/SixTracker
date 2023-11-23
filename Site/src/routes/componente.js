var express = require("express");
var router = express.Router();

var componenteController = require("../controllers/componenteController");


router.get("/buscar/", function (req, res) {
    componenteController.buscarServidoresComponente(req, res);
})

router.get("/unidade/", function (req, res) {
    componenteController.buscarMedidas(req, res);
})

router.get("/tipo/", function (req, res) {
    componenteController.buscarComponentes(req, res);
})

router.post("/listarComponentes/", function (req, res) {
    componenteController.listarComponentes(req, res);
})

// router.get("/buscarNivelPermissao/", function (req, res) {
//     componenteController.buscarNivelPermissao(req, res);
// })

router.post("/cadastrarComponente", function (req, res) {
    componenteController.cadastrarComponente(req, res);
})

router.post("/buscarFuncionarios/", function (req, res) {
    componenteController.buscarFuncionarios(req, res);
})
router.post("/editar/:idComponente", function (req, res) {
    componenteController.editarModal(req, res);
})

module.exports = router;
var express = require("express");
var router = express.Router();

var dashIsabelController = require("../controllers/dashIsabelController")

router.post("/selectDisco", (req, res) => {
    dashIsabelController.selectDisco(req, res)
})

router.post("/selectRede", (req, res) => {
    dashIsabelController.selectRede(req, res)
})

// router.get("/medidasDisco", function (req, res) {
//     dashIsabelController.buscarMedidasCPU(req, res);
// });

// router.get("/medidasRede", function (req, res) {
//     dashIsabelController.buscarMedidasRAM(req, res);
// });

// router.get("/medidasAtualizadaDisco", function (req, res) {
//     dashIsabelController.buscarMedidasAtualizadaDisco(req, res);
// });

// router.get("/medidasAtualizadaRede", function (req, res) {
//     dashIsabelController.buscarMedidasAtualizadaRede(req, res);
// });

module.exports = router;
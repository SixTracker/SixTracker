var express = require("express");
var router = express.Router();
const cpuController = require("../controllers/cpuController")

router.get("/capturar", (req, res) => {
    cpuController.capturar(req, res)
})

module.exports = router
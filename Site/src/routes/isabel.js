var express = require("express");
var router = express.Router();

var dashIsabelController = require("../controllers/dashIsabelController")

router.post("/selectDisco", (req, res) => {
    dashIsabelController.selectDisco(req, res)
})

router.post("/selectRede", (req, res) => {
    dashIsabelController.selectRede(req, res)
})

module.exports = router;
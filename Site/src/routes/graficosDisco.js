var express = require("express");
var router = express.Router();

var graficosController = require("../controllers/graficosController");


router.post("/pegarQuiz", function (req, res) {
    graficosController.pegarQuiz(req, res);
})
module.exports = router;
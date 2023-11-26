process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 80;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var graficosGuiRouter = require("./src/routes/graficosGui");
var graficosChrisRouter = require("./src/routes/graficosChris");
var servidorRouter = require("./src/routes/servidor");
var salaRouter = require("./src/routes/sala");
var componenteRouter = require("./src/routes/componente");
var perfilRouter = require("./src/routes/perfil");
const cpuRouter = require("./src/routes/dadosCpu");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter)
app.use("/graficosGui", graficosGuiRouter)
app.use("/servidor", servidorRouter)
app.use("/sala", salaRouter)
app.use("/componente", componenteRouter)
app.use("/perfil", perfilRouter)
app.use("/dadosCpu",cpuRouter);


app.listen(PORTA, function () {
    console.log(`Olá lindo(a) 
O servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});

//-----------------------iniciando as variáveis do perfil para select------------------------------------------//
// var perfilRouter = require("./src/routes/perfil");
// app.use("/perfil", perfilRouter);
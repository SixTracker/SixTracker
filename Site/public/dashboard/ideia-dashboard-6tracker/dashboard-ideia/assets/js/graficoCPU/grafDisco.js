
  demo = {
    initPickColor: function () {
      $(".pick-class-label").click(function () {
        var new_class = $(this).attr("new-class");
        var old_class = $("#display-buttons").attr("data-class");
        var display_div = $("#display-buttons");
        if (display_div.length) {
          var display_buttons = display_div.find(".btn");
          display_buttons.removeClass(old_class);
          display_buttons.addClass(new_class);
          display_div.attr("data-class", new_class);
        }
      });
    },

    initChartsPages: function (dados) {

      

      chartColor = "#FFFFFF";

      ctx = document.getElementById("analiseDisco")

      myChart = new Chart(ctx, {
        type: "line",

        data: {
          labels: [
            "12:00",
            "12:05",
            "12:10",
            "12:15",
            "12:20",
            "12:25",
            "12:30",
            "12:35",
            "12:40",
            "12:45",
            "12:50",
            "12:55",
            "13:00",
          ],
          datasets: [
            {
              label: "Disco",
              borderColor: "#000000",
              backgroundColor: "#6bd098",
              pointRadius: 8,
              pointHoverRadius: 15,
              borderWidth: 0.1,
              data: [10, 20, 25, 15, 45, 68, 10, 74, 11, 95, 55, 50, 20],
              fill: false,
            },
            {
              label: "Rede",
              borderColor: "#0004ff",
              backgroundColor: "#b011c2",
              pointRadius: 8,
              pointHoverRadius: 15,
              borderWidth: 0.1,
              data: [25, 35, 45, 50, 55, 40, 75, 30, 75, 30, 85, 90, 95],
              fill: false,
            },
          ],
        },
        options: {
          legend: {
            display: false,
            position: "top",
          },

          /*  tooltips: {
              enabled: false
            }, */

          scales: {
            yAxes: [
              {
                ticks: {
                  fontColor: "#9f9f9f",
                  beginAtZero: false,
                  maxTicksLimit: 5,
                  //padding: 20
                },
                gridLines: {
                  drawBorder: false,
                  zeroLineColor: "#ccc",
                  color: "rgba(255,255,255,0.05)",
                },
              },
            ],

            xAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(255,255,255,0.1)",
                  zeroLineColor: "transparent",
                  display: false,
                },
                ticks: {
                  padding: 20,
                  fontColor: "#9f9f9f",
                },
              },
            ],
          },
        },
      });


      var speedCanvas = document.getElementById("chartVelocidadeDisco");

      var dataFirst = {
        data: [
          4, 0, 1, 0, 5, 6, 3, 8, 2, 0, 9, 4, 6, 2, 3, 1, 15
        ],
        fill: false,
        label: "Atividade de leitura e gravações do disco",
        borderColor: "#181D27",
        backgroundColor: "transparent",
        pointBorderColor: "#3A7D44",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var speedData = {
        labels: [
          "12:00",

          "12:02",
          "12:04",
          "12:06",
          "12:08",
          "12:10",
          "12:12",
          "12:14",
          "12:16",
          "12:18",
          "12:19",
          "12:20",
          "12:22",
          "12:24",
          "12:26",
          "12:28",
          "12:30",
        ],
        datasets: [dataFirst],
      };

      var chartOptions = {
        legend: {
          display: false,
          position: "top",
        },
      };

      var lineChart = new Chart(speedCanvas, {
        type: "line",
        hover: false,
        data: speedData,
        options: chartOptions,
      });

    },
  };
  
  let graficoTodos;
 $(document).ready(function () {
  // Javascript method's body can be found in assets/assets-for-demo/js/demo.js

  fetch("/medidas/disco/29", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(data => {
      console.log(data);

      // Verifica se data é uma array e tem comprimento antes de continuar
      if (Array.isArray(data) && data.length > 0) {
        const data_reverse = data.reverse();
        graficoTodos = demo.initChartsPages(data_reverse);
        graficoCpu = demo.ChartsCPU(data_reverse);
        graficoRam = demo.ChartsRAM(data_reverse);
        graficoDisco = demo.ChartsDisco(data_reverse);
        graficoNet = demo.ChartsNET(data_reverse);

        setInterval(() => {
          atualizarGraficos();
        }, 3000);
      } else {
        console.error("Os dados não são uma array válida ou estão vazios:", data);
      }
    })
    .catch(error => {
      console.error("Erro na requisição:", error);
    });
});


  /* 

  async function botao() {

    const disco1 = await fetch ("/medidas/disco/29", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }

    })
    

    const discoJson = await disco1.json();
    console.log(discoJson)

    const ultimoDisco = discoJson[discoJson.length-1]
    console.log(ultimoDisco)
    
  }
   */
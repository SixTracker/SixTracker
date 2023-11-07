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
  
    initChartsPages: function () {
      chartColor = "#FFFFFF";
  
      ctx = document.getElementById("analiseDisco").getContext("2d");
  
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
              label: "Porcentagem de tempo que o disco processa solicitações de leitura ou gravações",
              borderColor: "#000000",
              backgroundColor: "#6bd098",
              pointRadius: 8,
              pointHoverRadius: 15,
              borderWidth: 0.1,
              data: [1,1,2,1,1,0,1,1,1,0,1,0,2],
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
          4,0,1,0,5,6,3,8,2,0,9,4,6,2,3,1,15
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
          display: false ,
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
  
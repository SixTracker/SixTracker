// demo = {
//   initPickColor: function () {
//     $(".pick-class-label").click(function () {
//       var new_class = $(this).attr("new-class");
//       var old_class = $("#display-buttons").attr("data-class");
//       var display_div = $("#display-buttons");
//       if (display_div.length) {
//         var display_buttons = display_div.find(".btn");
//         display_buttons.removeClass(old_class);
//         display_buttons.addClass(new_class);
//         display_div.attr("data-class", new_class);
//       }
//     });
//   },

//   initChartsPages: function () {
//     chartColor = "#FFFFFF";

//     ctx = document.getElementById("analiseSistema").getContext("2d");

//     myChart = new Chart(ctx, {
//       type: "line",

//       data: {
//         labels: [
//           "Janeiro",
//           "Fevereiro",
//           "Março",
//           "Abril",
//           "Maio",
//           "Junho",
//           "Julho",
//           "Agosto",
//           "Setembro",
//           "Outubro",
//           "Novembro",
//           "Dezembro",
//         ],
//         datasets: [
//           {
//             label: "CPU e RAM",
//             borderColor: "#000000",
//             backgroundColor: "#6bd098",
//             pointRadius: 8,
//             pointHoverRadius: 15,
//             borderWidth: 0.1,
//             data: [1,2,3,4,5,6,7,8,9,10,11,12],
//           },
//         ],
//       },
//       options: {
//         legend: {
//           //display: false
//           position: "top",
//         },

//         /*  tooltips: {
//             enabled: false
//           }, */

//         scales: {
//           yAxes: [
//             {
//               ticks: {
//                 fontColor: "#9f9f9f",
//                 beginAtZero: false,
//                 maxTicksLimit: 5,
//                 //padding: 20
//               },
//               gridLines: {
//                 drawBorder: false,
//                 zeroLineColor: "#ccc",
//                 color: "rgba(255,255,255,0.05)",
//               },
//             },
//           ],

//           xAxes: [
//             {
//               barPercentage: 1.6,
//               gridLines: {
//                 drawBorder: false,
//                 color: "rgba(255,255,255,0.1)",
//                 zeroLineColor: "transparent",
//                 display: false,
//               },
//               ticks: {
//                 padding: 20,
//                 fontColor: "#9f9f9f",
//               },
//             },
//           ],
//         },
//       },
//     });

//     var speedCanvas = document.getElementById("chartVelocidade");

//     var dataFirst = {
//       data: [
//         25,35,35,39,42,45,56,65,66,68,69,70,71,73,74,75,78
//       ],
//       fill: false,
//       borderColor: "#181D27",
//       backgroundColor: "transparent",
//       pointBorderColor: "#3A7D44",
//       pointRadius: 4,
//       pointHoverRadius: 4,
//       pointBorderWidth: 8,
//     };

//     var speedData = {
//       labels: [
//         "12:00",
//         "12:02",
//         "12:04",
//         "12:06",
//         "12:08",
//         "12:10",
//         "12:12",
//         "12:14",
//         "12:16",
//         "12:18",
//         "12:19",
//         "12:20",
//         "12:22",
//         "12:24",
//         "12:26",
//         "12:28",
//         "12:30",
//       ],
//       datasets: [dataFirst],
//     };

//     var chartOptions = {
//       legend: {
//         display: false,
//         position: "top",
//       },
//     };

//     var lineChart = new Chart(speedCanvas, {
//       type: "line",
//       hover: false,
//       data: speedData,
//       options: chartOptions,
//     });

//     ctx = document.getElementById("chartEstado").getContext("2d");

//     myChartRosca = new Chart(ctx, {
//       type: "doughnut",
//       data: {
//         labels: ["Seguro", "Alerta", "Risco"],
//         datasets: [
//           {
//             fill: false,
//             pointRadius: 0,
//             pointHoverRadius: 0,
//             backgroundColor: ["#3A7D44","#69b5789e","#EA2309"],
//             borderWidth: 0,
//             data: [85, 10,5],
//           },
//         ],
//       },

//       options: {
//         legend: {
//           display: false,
//         },

//         pieceLabel: {
//           render: "percentage",
//           fontColor: ["white"],
//           precision: 2,
//         },

//         /* tooltips: {
//             enabled: false
//           }, */

//         scales: {
//           yAxes: [
//             {
//               ticks: {
//                 display: false,
//               },
//               gridLines: {
//                 drawBorder: false,
//                 zeroLineColor: "transparent",
//                 color: "69B578",
//               },
//             },
//           ],

//           xAxes: [
//             {
//               barPercentage: 1.6,
//               gridLines: {
//                 drawBorder: true,
//                 color: "69B578",
//                 zeroLineColor: "transparent",
//               },
//               ticks: {
//                 display: true,
//               },
//             },
//           ],
//         },
//       },
//     });
//   },
// };



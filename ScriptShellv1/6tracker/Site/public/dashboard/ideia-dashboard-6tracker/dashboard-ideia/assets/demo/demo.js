demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  initDocChart: function() {
    chartColor = "#000000";

    ctx = document.getElementById('chartHour').getContext("2d");

    myChart = new Chart(ctx, {
      type: 'line',

      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [{
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
          },
          {
            borderColor: "#f17e5d",
            backgroundColor: "#000000",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
          },
          {
            borderColor: "#fcc468",
            backgroundColor: "#fcc468",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });

  },

  initChartsPages: function(){
    chartColor = "#FFFFFF";

    ctx = document.getElementById('teste').getContext("2d");
    myChart = new Chart(ctx, {
    
        type: 'line',
        data: data,

        data: {
          labels: labels,
          datasets: [{
            label: 'Meu teste 123',
            data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },

          
      
    })
  },

  initChartsPages: function() {
    chartColor = "#FFFFFF";

    ctx = document.getElementById('chartHours').getContext("2d");

    myChart = new Chart(ctx, {
      type: 'line',

      data: {
   
        labels: [
          '12:00',
          '12:01',
          '12:02',
          '12:03',
          '12:04',
          '12:05',
          '12:06',
          '12:07',
          '12:08',
          '12:09',
          '12:10',
          '12:11',
          '12:12',
          '12:13',
          '12:14',
          '12:15',
          '12:16',
          '12:17',
          '12:18',
          '12:19',
          '12:20',
          '12:21',
          '12:22',
          '12:23',
          '12:24',
          '12:25',
          '12:26',
          '12:27',
          '12:28',
          '12:29',
          '12:30',
          '12:31',
          '12:32',
          '12:33',
          '12:34',
          '12:35',
          '12:36',
          '12:37',
          '12:38',
          '12:39',
          '12:40',
          '12:41',
          '12:42',
          '12:43',
          '12:44',
          '12:45',
          '12:46',
          '12:47',
          '12:48',
          '12:49',
          '12:50',
          '12:51',
          '12:52',
          '12:53',
          '12:54',
          '12:55',
          '12:56',
          '12:57',
          '12:58',
          '12:59',
          '13:00'
        ],
        datasets: [{
            label: 'Utilização da CPU em %',
            borderColor: "#",
            backgroundColor: "#6bd098",
            pointRadius: 8,
            pointHoverRadius: 15,
            data: [12, 18, 23, 29, 34, 40, 45, 51, 56, 60, 56, 51, 45, 40, 34, 29, 23, 18, 12, 7, 1, 7, 12, 18, 23, 29, 34, 40, 45, 51, 56, 60, 56, 51, 45, 40, 34, 29, 23, 18, 12, 7, 1, 7, 12, 18, 23, 29, 34, 40, 45, 51, 56, 60,18, 12, 7, 1, 7, 12, 18, 23, 29, 34, 40, 45, 51]
          }
        ]
      },
      options: {
        legend: {
          //display: false
          position:'top'
        },

       /*  tooltips: {
          enabled: false
        }, */

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });


    ctx = document.getElementById('chartEmail').getContext("2d");

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [1, 2, 3,4,5,6],
        datasets: [{
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: 
            '#69b5789e',
          borderWidth: 0,
          data: [1.6, 0.2, 0.3, 1.3, 1.4, 0.5]
        }]
      },

      options: {

        legend: {
          display: false
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        /* tooltips: {
          enabled: false
        }, */

        scales: {
          yAxes: [{

            ticks: {
              display: true
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: '69B578'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: true,
              color: '69B578',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: true,
            }
          }]
        },
      }
    });

    var speedCanvas = document.getElementById("speedChart");

    var dataFirst = {
      data: [12, 18, 23, 29, 34, 40, 45, 51, 56, 20, 56, 51, 45, 40, 34, 29, 23, 18, 12, 7, 1, 7, 12, 18, 23, 29, 34, 10, 45, 51, 56, 45, 46, 51, 45, 40, 34, 29, 23, 18, 12, 7, 1, 7, 12, 18, 23, 29, 34, 40, 45, 51, 56, 30,18, 12, 7, 1, 7, 12, 18, 23, 29, 34, 40, 45, 21],
      fill: false,
      borderColor: '#181D27',
      backgroundColor: 'transparent',
      pointBorderColor: '#3A7D44',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var speedData = {
      labels: [ 
      '12:00',
      '12:01',
      '12:02',
      '12:03',
      '12:04',
      '12:05',
      '12:06',
      '12:07',
      '12:08',
      '12:09',
      '12:10',
      '12:11',
      '12:12',
      '12:13',
      '12:14',
      '12:15',
      '12:16',
      '12:17',
      '12:18',
      '12:19',
      '12:20',
      '12:21',
      '12:22',
      '12:23',
      '12:24',
      '12:25',
      '12:26',
      '12:27',
      '12:28',
      '12:29',
      '12:30',
      '12:31',
      '12:32',
      '12:33',
      '12:34',
      '12:35',
      '12:36',
      '12:37',
      '12:38',
      '12:39',
      '12:40',
      '12:41',
      '12:42',
      '12:43',
      '12:44',
      '12:45',
      '12:46',
      '12:47',
      '12:48',
      '12:49',
      '12:50',
      '12:51',
      '12:52',
      '12:53',
      '12:54',
      '12:55',
      '12:56',
      '12:57',
      '12:58',
      '12:59',
      '13:00'],
      datasets: [dataFirst]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  },

  initGoogleMaps: function() {
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [{
        "featureType": "water",
        "stylers": [{
          "saturation": 43
        }, {
          "lightness": -11
        }, {
          "hue": "#0088ff"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
          "hue": "#ff0000"
        }, {
          "saturation": -100
        }, {
          "lightness": 99
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#808080"
        }, {
          "lightness": 54
        }]
      }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ece2d9"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ccdca1"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#767676"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#b8cb93"
        }]
      }, {
        "featureType": "poi.park",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.sports_complex",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.medical",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "simplified"
        }]
      }]

    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  },

  showNotification: function(from, align) {
    color = 'primary';

    $.notify({
      icon: "nc-icon nc-bell-55",
      message: "Welcome to <b>Paper Dashboard</b> - a beautiful bootstrap dashboard for every web developer."

    }, {
      type: color,
      timer: 8000,
      placement: {
        from: from,
        align: align
      }
    });
  }

};


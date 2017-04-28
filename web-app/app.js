angular.module('studentPerformance', ['angularCharts'])
        .controller('MainCtrl', [function ($scope){

            var vm = this;
            vm.barGraph = undefined;

            vm.config = {
              title: 'Grades',
              tooltips: true,
              labels: true, //shows value on each bar
              mouseover: function() {},
              mouseout: function() {},
              click: function() {},
              legend: {
                display: true,
                position: 'right' //left || right
                }
            };

            vm.barGraph = {
                series: ['Overall Grade'],
                data: [{
                    x: 1,
                    y: [1],
                    tooltip: "A"
                },{
                    x: 2,
                    y: [2],
                    tooltip: "B"
                },{
                    x: 3,
                    y: [3],
                    tooltip: "C"
                },{
                    x: 4,
                    y: [4],
                    tooltip: "D"
                },{
                    x: 5,
                    y: [5],
                    tooltip: "F"
                }
                ]
            };

                vm.bartest = {
                series: ['Trimester 1', 'Trimester 2', 'Trimester 3'],
                data: [{
                  x: "A",
                  y: [10, 5, 1],
                  tooltip: "Grade 1: A"
                }, {
                  x: "B",
                  y: [3, 1, 7]
                }, {
                  x: "C",
                  y: [3, 5, 1]
                }, {
                  x: "D",
                  y: [4, 2, 2]
                }, {
                  x: ["F"],
                  y: [3, 5, 10]
                }
                ]
              };



        }]);

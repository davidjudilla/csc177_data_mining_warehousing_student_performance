angular.module('studentPerformance', ['angularCharts','ngResource'])
        .controller('MainCtrl', ['$scope','$http','AllStatsPerGrade', function ($scope, $http, AllStatsPerGrade){


            google.charts.load('current', {packages: ['corechart', 'line']});

            var vm = this;
            vm.barGraph = undefined;
            vm.changeTupleBarGraph = undefined;
            vm.dropdown1Selected = undefined;
            vm.loadingGraph = true;
var testFlag = false;






            function getTupleKey(key) {
                if(key === 'Family Size'){
                    console.log('Family Size: returning famsize');
                    return 'famsize';
                }else if (key === 'Failures') {
                    return 'failures';
                }
            };





            //google.charts.setOnLoadCallback(drawBackgroundColor);
            vm.drawLineGraph = function () {
                vm.loadingGraph = true;

                var tupleKey = getTupleKey(vm.dropdown1Selected);

                /*
                $http({
                          method: 'GET',
                          url: 'http://localhost:5000/gradeAvgStats/?grade=14'
                    }).then(function successCallback(response) {
                            // this callback will be called asynchronously
                            // when the response is available
                    }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                    });
                    */

                $http.get('localhost:5000/gradeAvgStats?grade=12').then(function (response) {
                    var grades = response;
                    console.log('SUCCESS AllStatsPerGrade.get: ', response);
                }, function (error) {
                    console.log('Err AllStatsPerGrade.get: ', error);
                });
                

                /*
                var grade = 14;
                AllStatsPerGrade.get(grade).$promise.then(function (response) {
                    var grades = response;
                    console.log('SUCCESS AllStatsPerGrade.get: ', response);
                }, function (error) {
                    console.log('Err AllStatsPerGrade.get: ', error);
                });
                */

                  var data = new google.visualization.DataTable();
                  data.addColumn('number', 'X');
                  data.addColumn('number', 'Cats');

                  if(testFlag){
                      data.addRows([
                        [0, 0],   [1, 3/20],  [2, 2/20],  [3, 4/20],  [4, 5/20],  [5, 6/20]
                    ]);

                  } else {
                      data.addRows([
                        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9]
                    ]);

                  }
                  testFlag = !testFlag;

                  /*data.addRows([
                    [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
                    [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
                    [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
                    [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
                    [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
                    [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
                    [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
                    [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
                    [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
                    [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
                    [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
                    [66, 70], [67, 72], [68, 75], [69, 80]
                ]);*/

                  var options = {
                    hAxis: {
                      title: 'Drinks'
                    },
                    vAxis: {
                      title: 'Grade %'
                    },
                    backgroundColor: '#f1f8e9'
                  };

                  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                  chart.draw(data, options);
                  vm.loadingGraph = false;
                }






















/******************************************************************************************************

*****************************************************************************************************
*/

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

            vm.dropdown1 = "Select One";
            vm.changeTupleBarGraph = function (tuple){
                    if(tuple !== undefined){

                    } else {

                    }
            };

            function getTupleKey(key) {
                if(key === 'Family Size'){
                    console.log('Family Size: returning famsize');
                    return 'famsize';
                }else if (key === 'Failures') {
                    return 'failures';
                }
            };

            vm.barGraphTuples = ['Family Size','Failures','Health','Absences'];

            vm.submit = function(){
                var tupleKey = getTupleKey(vm.dropdown1Selected);
            AllStatsPerGrade.get(tupleKey).$promise.then(function (response) {

                }, function (error) {
                    console.log('No Assigned Rides: ', error);
                });
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

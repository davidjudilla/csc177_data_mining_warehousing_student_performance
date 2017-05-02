angular.module('studentPerformance', ['angularCharts','ngResource'])
        .controller('MainCtrl', ['$scope','$http','AllStatsPerGrade','GradesPerCol', function ($scope, $http, AllStatsPerGrade, GradesPerCol){


            google.charts.load('current', {packages: ['corechart', 'line']});

            var vm = this;
            vm.barGraph = undefined;
            vm.changeTupleBarGraph = undefined;
            vm.dropdown1Selected = undefined;
            vm.loadingGraph = true;

            vm.currentStatsObj = undefined;
            vm.currentLineObj = undefined;

            vm.tupleSelected = undefined;
            vm.graphNiceDescription = undefined;

            vm.gradeSelected = undefined;
            vm.usrSelGradePer = undefined;
            vm.gradePercentages = [0,20,40,60,80,100];

            var testFlag = false;
            vm.grade = 14;
            vm.multY = 1;
            vm.multX = 5;

            vm.barGraphTuples = ['Age', 'Absences', 'Failures', 'Family Relationship', 'Free Time', 'Going Out',
                                 'Daily Alcohol Consumption', 'Weekly Alcohol Consumption', 'Health' ];

            function setData(){
                var data = new google.visualization.DataTable();
                data.addColumn('number', 'X');
                data.addColumn('number', vm.graphNiceDescription);

                vm.currentLineObj[2] = (vm.currentLineObj[1]+vm.currentLineObj[4])/2;
                vm.currentLineObj[3] = (vm.currentLineObj[2]+vm.currentLineObj[4])/2;

              var options = {
                  title: 'Average grade '+vm.graphNiceDescription+' for year with amoung students with X amout of failures',
                  curveType: 'function',
                  legend: { position: 'top-right' },
                  hAxis: {
                      title: 'Grade %'
                  },
                  vAxis: {
                      title: vm.graphNiceDescription
                  },
                  backgroundColor: '#fafbfc'
              };


              data.addRows([
                  //[x,y]
                [0*vm.multX, vm.currentLineObj[0]*vm.multY],   [1*vm.multX, vm.currentLineObj[1]*vm.multY],  [2*vm.multX, vm.currentLineObj[2]*vm.multY],  [3*vm.multX, vm.currentLineObj[3]*vm.multY],  [4*vm.multX, vm.currentLineObj[4]*vm.multY],
                [5*vm.multX, vm.currentLineObj[5]*vm.multY],   [6*vm.multX, vm.currentLineObj[6]*vm.multY],  [7*vm.multX, vm.currentLineObj[7]*vm.multY],  [8*vm.multX, vm.currentLineObj[8]*vm.multY],  [9*vm.multX, vm.currentLineObj[9]*vm.multY],
                [10*vm.multX, vm.currentLineObj[10]*vm.multY],   [11*vm.multX, vm.currentLineObj[11]*vm.multY],  [12*vm.multX, vm.currentLineObj[12]*vm.multY],  [13*vm.multX, vm.currentLineObj[13]*vm.multY],  [14*vm.multX, vm.currentLineObj[14]*vm.multY],
                [15*vm.multX, vm.currentLineObj[15]*vm.multY],   [16*vm.multX, vm.currentLineObj[16]*vm.multY],  [17*vm.multX, vm.currentLineObj[17]*vm.multY],  [18*vm.multX, vm.currentLineObj[18]*vm.multY],  [19*vm.multX, vm.currentLineObj[19]*vm.multY]

            ]);

              var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
              chart.draw(data, options);
            }

            vm.showLineGraph = function () {
                var key = vm.graphNiceDescription;
                var tupleKey = undefined;
                                if(key === 'Family Size'){
                                    tupleKey = 'famsize';
                                }else if (key === 'Age') {
                                    tupleKey = 'age';
                                }else if (key === 'Absences') {
                                    tupleKey = 'absences';
                                }else if (key === 'Failures') {
                                    tupleKey = 'failures';
                                }else if (key === 'Family Relationship') {
                                    tupleKey = 'famrel';
                                }else if (key === 'Free Time') {
                                    tupleKey = 'freetime';
                                }else if (key === 'Going Out') {
                                    tupleKey = 'goout';
                                }else if (key === 'Daily Alcohol Consumption') {
                                    tupleKey = 'Dalc';
                                }else if (key === 'Weekly Alcohol Consumption') {
                                    tupleKey = 'Walc';
                                }else if (key === 'Health') {
                                    tupleKey = 'health';
                                }

                vm.loadingStats = true;
                    if(tupleKey !== undefined){

                    GradesPerCol.get({tuple: tupleKey}).$promise.then(function (response) {
                        vm.currentLineObj = response;
                        console.log('SUCCESS GradesPerCol.get: ' + vm.currentLineObj[0], response);
                        setData();
                    }, function (error) {
                        console.log('Err GradesPerCol.get: ', error);
                    });
                } else {
                    console.log('Err tupleKey is undefined');
                }
                vm.loadingStats = false;
            };

            //Need a way to set meaning of tuples here
            vm.showStats = function() {
                    if(vm.usrSelGradePer !== undefined){
                    vm.gradeSelected = vm.usrSelGradePer/5;
                    AllStatsPerGrade.get({grade: vm.gradeSelected}).$promise.then(function (response) {
                             vm.currentStatsObj = response;
                            console.log('SUCCESS AllStatsPerGrade: '+vm.currentStatsObj['Dalc'].toFixed(2));
                        },function(err){
                            console.log('err AllStatsPerGrade: '+response);
                        });

                    }
            };

            // Defines the meaning of the values in the tuples with Low to High scale
            vm.getMeaningLowHigh = function(tuple){
              if (tuple <= 1 && tuple >= 0){
                return "Very Low"
              } else if (tuple > 1 && tuple <= 2){
                return "Low"
              } else if (tuple > 2 && tuple <= 3){
                return "Medium"
              } else if (tuple > 3 && tuple <= 4){
                return "High"
              } else if (tuple > 4 && tuple <= 5){
                return "Very High"
              } else if (tuple < 0){
                return "Error: negative value"
              } else{
                // return "Testing"
              }
            };

            // Defines the meaning of the values in the tuples with Bad to Good scale
            vm.getMeaningBadGood = function(tuple){
              if (tuple <= 1 && tuple >= 0){
                return "Very Bad"
              } else if (tuple > 1 && tuple <= 2){
                return "Bad"
              } else if (tuple > 2 && tuple <= 3){
                return "Normal"
              } else if (tuple > 3 && tuple <= 4){
                return "Good"
              } else if (tuple > 4 && tuple <= 5){
                return "Very Good"
              } else if (tuple < 0){
                return "Error: negative value"
              } else{
                // return "Testing"
              }
            };
            //Binary Yes or No
            vm.getMeaningYesNo = function(tuple){
              if (tuple == 1){
                return "Yes"
              } else if (tuple == 0){
                return "No"
              } else if (tuple < 0){
                return "Error: not binary"
              } else{
                // return "Testing"
              }
            };

            vm.getMeaningStudyTime = function(tuple){
              if (tuple <= 1 && tuple >= 0){
                return "(Less than 2 hours)"
              } else if (tuple > 1 && tuple <= 2){
                return "(Between 2 to 5 hours)"
              } else if (tuple > 2 && tuple <= 3){
                return "(Between 5 to 10 hours)"
              } else if (tuple > 3 && tuple <= 4){
                return "(Greater than 10 hours)"
              } else if (tuple < 0){
                return "(Error: negative value)"
              } else{
                // return "Testing"
              }
            };

            vm.getMeaningTravelTime = function(tuple){
              if (tuple <= 1 && tuple >= 0){
                return "(Less than 15 minutes)"
              } else if (tuple > 1 && tuple <= 2){
                return "(Between 15 to 30 minutes)"
              } else if (tuple > 2 && tuple <= 3){
                return "(Between 30 minutes to an hour)"
              } else if (tuple > 3 && tuple <= 4){
                return "(Greater than 1 hour)"
              } else if (tuple < 0){
                return "(Error: negative value)"
              } else{
                // return "Testing"
              }
            };
        }]);

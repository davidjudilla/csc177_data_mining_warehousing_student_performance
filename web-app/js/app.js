angular.module('studentPerformance', ['angularCharts','ngResource'])
        .controller('MainCtrl', ['$scope','$http','AllStatsPerGrade','GradesPerCol', 'GradeDist', function ($scope, $http, AllStatsPerGrade, GradesPerCol, GradeDist){


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

            vm.uiTimeFactors = ['Travel Time', 'Study Time', 'Free Time', 'Going Out'];
            vm.uiTimeScale4 = [4,3,2,1];
            vm.uiTimeScale5 = [1,2,3,4,5];
            vm.uiDonutTimeSelected = undefined;
            vm.userSelectedTimeFactor = undefined;
             vm.userSelectedTimeScale = undefined;
             vm.tkey = undefined;

            var testFlag = false;
            vm.grade = 14;
            vm.multY = 1;
            vm.multX = 5;
            vm.gradeArray =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];

            vm.barGraphTuples = ["Students Age", 'Absences', 'Failures', 'Family Relationship', 'Free Time', 'Travel Time', 'Going Out',
                                 'Daily Alcohol Consumption', 'Weekly Alcohol Consumption', 'Health' ];

         function drawDChart() {


                 var data = google.visualization.arrayToDataTable([
                   ['Grade', 'How many recieved'],
                   ['Poor',     vm.gradeArray[0]+vm.gradeArray[1]+vm.gradeArray[2]],
                   ['Weak',     vm.gradeArray[3]+vm.gradeArray[4]+ vm.gradeArray[5]+vm.gradeArray[6]],
                   ['Sufficient',    vm.gradeArray[7]+vm.gradeArray[8]
                                        +vm.gradeArray[9]+vm.gradeArray[10]+vm.gradeArray[11]+vm.gradeArray[12]+vm.gradeArray[13]],
                   ['Good',     vm.gradeArray[14]+vm.gradeArray[15]+vm.gradeArray[16]],
                   ['Very Good',     vm.gradeArray[17]+vm.gradeArray[18]+vm.gradeArray[19]],
                   ['Excellent',     vm.gradeArray[20]]
                 ]);


                 var options = {
                   title: 'Grade Distribution',
                   pieHole: 0.4,
                 };

                 var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                 chart.draw(data, options);
               }

               vm.showDonut = function(){

                   if(vm.userSelectedTimeFactor !== undefined){
                      var key = vm.userSelectedTimeFactor;
                       if (key === 'Free Time') {
                           vm.tkey = 'freetime';
                           console.log('vm.tkey: '+vm.tkey);
                       } else if (key === 'Going Out') {
                          vm.tkey = 'goout';
                          console.log('vm.tkey: '+vm.tkey);
                       } else if (key === 'Study Time') {
                           vm.tkey = 'studytime';
                           console.log('vm.tkey: '+vm.tkey);
                       }else if (key === 'Travel Time') {
                           vm.tkey = 'traveltime';
                           console.log('vm.tkey: '+vm.tkey);
                       }
                   }


                       GradeDist.get({colName: vm.tkey, colValue: vm.userSelectedTimeScale}).$promise.then(function (response) {
                           vm.DonutObj = response;
                           console.log('SUCCESS GradeDist.get:', response);

                           vm.DonutObj.forEach(function(element, index){
                               if(element === 0){ //if the grade is 0, then count grade 0 ++
                                   vm.gradeArray[0]++;
                               } else if (element === 1){
                                   vm.gradeArray[1]++;
                               } else if (element === 2){
                                   vm.gradeArray[2]++;
                               } else if (element === 3){
                                   vm.gradeArray[3]++;
                               } else if (vm.DonutObj[index] === '4'){
                                   vm.gradeArray[4]++;
                               } else if (element === 5){
                                   vm.gradeArray[5]++;
                               } else if (element === 6){
                                   vm.gradeArray[6]++;
                               } else if (element === 7){
                                   vm.gradeArray[7]++;
                               } else if (element === 8){
                                   vm.gradeArray[8]++;
                               } else if (element === 9){
                                   vm.gradeArray[9]++;
                               } else if (element === 10){
                                   vm.gradeArray[10]++;
                               } else if (element === 11){
                                   vm.gradeArray[11]++;
                               } else if (element === 12){
                                   vm.gradeArray[12]++;
                               } else if (element === 13){
                                   vm.gradeArray[13]++;
                               } else if (element === 14){
                                   vm.gradeArray[14]++;
                               } else if (element === 15){
                                   vm.gradeArray[15]++;
                               } else if (element === 16){
                                   vm.gradeArray[16]++;
                               } else if (element === 17){
                                   vm.gradeArray[17]++;
                               } else if (element === 18){
                                   vm.gradeArray[18]++;
                               } else if (element === 19){
                                   vm.gradeArray[19]++;
                               } else if (element === 20){
                                   vm.gradeArray[20]++;
                               }
                           });
                           drawDChart();

                       }, function (error) {
                           console.log('Err GradeDist.get: ', error);
                       });

               };

            function setData(){
                var data = new google.visualization.DataTable();
                data.addColumn('number', 'X');
                data.addColumn('number', vm.graphNiceDescription);

                vm.currentLineObj[2] = (vm.currentLineObj[1]+vm.currentLineObj[4])/2;
                vm.currentLineObj[3] = (vm.currentLineObj[2]+vm.currentLineObj[4])/2;

              var options = {
                  title: 'Average grade for '+ '"' + vm.graphNiceDescription + '" ' + 'among students with X amount of failures during the school year',
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
                                }else if (key === "Students Age") {
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
                                }else if (key === 'Study Time') {
                                    tupleKey = 'studytime';
                                }else if (key === 'Travel Time') {
                                    tupleKey = 'traveltime';
                                } else if (key === 'Going Out') {
                                    tupleKey = 'goout';
                                } else if (key === 'Study Time') {
                                    tupleKey = 'studytime';
                                }else if (key === 'Travel Time') {
                                    tupleKey = 'traveltime';
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

            vm.getScale = function(tuple){
              if (tuple == "Student's Age" ){
                return "student's age (numeric: from 15 to 22)"
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

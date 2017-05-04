angular.module('studentPerformance', ['angularCharts','ngResource'])
        .controller('donutCtrl', ['$scope','$http','AllStatsPerGrade','GradesPerCol', function ($scope, $http, AllStatsPerGrade, GradesPerCol){


            google.charts.load('current', {packages: ['corechart', 'line']});

        }]);

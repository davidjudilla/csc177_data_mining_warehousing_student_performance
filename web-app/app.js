angular.module('studentPerformance', ['angularCharts']);

function MainCtrl($scope) {
  $scope.config = {
    title: 'Grades',
    tooltips: true,
    labels: false, //shows value on each bar
    mouseover: function() {},
    mouseout: function() {},
    click: function() {},
    legend: {
      display: true,
      position: 'right' //left || right
    }
  };

  $scope.bartest = {
    series: ['Trimester 1', 'Trimester 2', 'Trimester 3'],
    data: [{
      x: "F",
      y: [10, 5, 1],
      tooltip: "Grade 1: F"
    }, {
      x: "D",
      y: [3, 1, 7]
    }, {
      x: "C",
      y: [3, 5, 1]
    }, {
      x: "B",
      y: [4, 2, 2]
    }, {
      x: ["A"],
      y: [3, 5, 10]
    }
    ]
  };
}

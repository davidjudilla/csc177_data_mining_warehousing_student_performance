'use strict';

angular.module('studentPerformance')
    .factory('AllStatsPerGrade', function ($resource) {
        var testapi = 'http://localhost:5000/';
        var api = '';
        return $resource('http://localhost:5000/gradeAvgStats?grade=12', {
            grade: '@grade'
        }, {
            get: {
                method: 'GET',
                isArray: false
            }
        });

    });

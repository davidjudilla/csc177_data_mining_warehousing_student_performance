'use strict';

angular.module('studentPerformance')
    .factory('AllStatsPerGrade', function ($resource) {
        var testapi = 'localhost:5000/';
        var api = '';
        return $resource(testapi + 'gradeAvgStats/?grade=:grade', {
            grade: '@grade'
        }, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

    });

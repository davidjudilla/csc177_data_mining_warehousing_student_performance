'use strict';

angular.module('studentPerformance')
    .factory('AllStatsPerGrade', function ($resource, ENV) {
        var testapi = 'http://localhost:5000/';
        var api = '';
        return $resource(ENV.testapi + 'gradeAvgStats/?grade=:grade', {
            grade: '@grade'
        }, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

    });

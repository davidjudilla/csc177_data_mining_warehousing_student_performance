'use strict';

angular.module('studentPerformance')
    .factory('AllStatsPerGrade', function ($resource) {
        var api = 'http://localhost:5000/';
        return $resource(api + 'gradeAvgStats?grade=:grade', {
            grade: '@grade'
        }, {
            get: {
                method: 'GET',
                isArray: false
            }
        });

    });

    angular.module('studentPerformance')
        .factory('GradesPerCol', function ($resource) {
            var api = 'http://localhost:5000/';
            return $resource(api + 'gradesToCol?&col=:tuple', {
                tuple: '@tuple'
            }, {
                get: {
                    method: 'GET',
                    isArray: true
                }
            });

        });

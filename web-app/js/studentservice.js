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
/*
{verb:'greet', salutation:'Hello'} results in URL /path/greet?salutation=Hello.
*/
//http://localhost:5000/getGradeFromCol?colName=traveltime&colValue=2
            angular.module('studentPerformance')
                .factory('GradeDist', function ($resource) {
                    var api = 'http://localhost:5000/';
                    return $resource(api + 'getGradeFromCol?', {
                        colName: '@col',
                        colValue: '@val'
                    }, {
                        get: {
                            method: 'GET',
                            isArray: true
                        }
                    });

        });

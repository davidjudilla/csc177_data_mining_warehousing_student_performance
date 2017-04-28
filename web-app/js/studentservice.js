'use strict';

angular.module('studentPerformance')
    .factory('DriverRidesService', function ($resource, ENV) {
        var testapi = 'http://localhost:8080/';
        var api = '';
        return $resource(testapi + 'students/:id', {
            id: '@id'
        }, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

    });

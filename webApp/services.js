(function() {

    'use strict';


    /* Services */

    /*
    Those following lines declare factory for corresponding resources
    */

    console.log('servicesUCG');

    angular.module('servicesUCG', ['ngResource']);

    angular.module('servicesUCG').factory('eventsService', ['$resource', eventsServiceFactory]);

    angular.module('servicesUCG').factory('entrainementsService', ['$resource', entrainementsServiceFactory]);


    /*
    This function is needed to convert Date
    */
    function transformResponseDate(data, headersGetter) {
        var key, value;
        var angData = angular.fromJson(data)
        for (var i = angData.length - 1; i >= 0; i--) {
            angData[i]["date"] = new Date(angData[i]["date"])
        };
        return angData;
    }


    /*
    Factory for event
    */
    function eventsServiceFactory($resource) {
        return $resource('./events/:id', {}, {
            query: {
                method: 'GET',
                transformResponse: transformResponseDate,
                isArray: true,
                cache: false
            },
            get: {
                method: 'GET',
                isArray: true,
                cache: false
            },
            save: {
                method: 'POST',
                isArray: false,
                cache: false
            }
        });
    }


    /*
    Factory for entrainement
    */
    function entrainementsServiceFactory($resource) {

        return $resource('./entrainements/:id', {}, {
            query: {
                method: 'GET',
                transformResponse: transformResponseDate,
                isArray: true,
                cache: false
            },
            get: {
                method: 'GET',
                isArray: true,
                cache: false
            },
            save: {
                method: 'POST',
                isArray: false,
                cache: false
            }
        });
    }




    
    
})()

(function() {

    'use strict';

    angular.module('appUCG', ['ngRoute','homeModule','adminModule','loginModule']) //, 'waypoint-module'])
    //angular.module('appUCG', ['ngRoute','homeModule']) //, 'waypoint-module'])


    angular.module('appUCG').config(['$routeProvider','$locationProvider', function($rp,$lp) {
        $rp.
        when('/admin', {
            templateUrl: 'views/admin/adminView.html',
            controller: 'adminController'
        }).
        otherwise({
            templateUrl: 'views/home/homeView.html',
            controller: 'homeController'
        });

        $lp.html5Mode(true);
    }])

})()

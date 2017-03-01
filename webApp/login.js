(function() {
    'use strict';

    angular.module('loginModule', []);

    angular.module('loginModule').constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated'
    })


    angular.module('loginModule').factory('loginService', ['$http', loginServiceFactory]);

    function loginServiceFactory($http) {
        var loginService = {};

        loginService.login = function(credentials, ferr, fsuccess) {

            $http
                .post('/login', credentials)
                .then(fsuccess, ferr);
        }
        return loginService;
    }


    angular.module('loginModule').controller('loginController', ['$scope', loginControllerFactory]);

    function loginControllerFactory($scope) {
        $scope.isAuthenticated = false;
        $scope.token = '';

        $scope.setToken = function(t) {
            $scope.token=t;
        }

        $scope.setAuthenticated = function(a) {
            $scope.isAuthenticated=a;
        }
    }
})()

(function() {
    'use strict';


    angular.module('adminModule').controller('loginFormController', ['$scope', '$rootScope' , 'AUTH_EVENTS' , 'loginService',
        loginFormControllerFactory
    ])

    function loginFormControllerFactory($scope , $rootScope , AUTH_EVENTS, loginService ) {
    	$scope.credentials = {username:'',password:''};

    	$scope.login = function(credentials) {
            console.log("form login");
    		loginService.login(credentials, 
                function(response){//Error
                    //console.log("nok");
                    //console.log(response);
                    $scope.mauvais_login= 'mauvais username/password';
                }, 
                function(response){//Sucess
                    //console.log("ok");
                    //console.log(response);
                    $scope.mauvais_login=undefined;
                    $scope.setToken(response.data);
                    $scope.setAuthenticated(true);
                });
    	}
    }
})()
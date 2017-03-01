(function() {

    'use strict';


    console.log("directive ucgEvents factory is registered");

    angular.module('homeModule').directive('ucgEvents', ucgEventsFactory);

    function ucgEventsFactory() {
    	console.log("directive ucgEvents factory has been called");
        return {
            restrict: 'E',
            templateUrl: 'views/home/events/ucg-events.html'
        };
    };
})();

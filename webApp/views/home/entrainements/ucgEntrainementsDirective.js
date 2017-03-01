(function() {

    'use strict';

    angular.module('homeModule').directive('ucgEntrainements', ucgEntrainementsFactory);

    function ucgEntrainementsFactory() {
        return {
            restrict: 'E',
            templateUrl: 'views/home/entrainements/ucg-entrainements.html',
            controller: ['$scope', function($scope) {
                var calendar = $("#calendar").calendar({
                    tmpl_path: "bower_components/bootstrap-calendar/tmpls/",
                    language: 'fr-FR',
                    events_source: './entrainements'
                });
                $scope.calendar = calendar;
            }]
        };
    };
})();

(function() {

    'use strict';

    angular.module('homeModule').directive('ucgEntrainements', ucgEntrainementsFactory);

    function ucgEntrainementsFactory() {
        return {
            restrict: 'E',
            templateUrl: 'views/home/entrainements/ucg-entrainements.html',
            controller: ['$scope', 'entrainementsService', 'inscriptionsService',
                function($scope, $entrainementsService, $inscriptionsService) {

                    $scope.entrainements_visibles = $entrainementsService.query({
                        'visible': true
                    });

                    var calendar = $("#calendar").calendar({
                        tmpl_path: "bower_components/bootstrap-calendar/tmpls/",
                        language: 'fr-FR',
                        events_source: './entrainements'
                    });
                    $scope.calendar = calendar;


                    //modal inscription
                    $scope.showModal = function() {
                        $scope.$broadcast('new_entrainement_inscription')

                        $('#inscription-modal').modal('show')
                    }

                    $scope.hideModal = function() {
                        $('#inscription-modal').modal('hide')
                    }



                    $scope.showInscrits = function(event) {
                        $scope.show_inscrits = []
                        $inscriptionsService.query({
                            event_id: event._id
                        }, function(inscriptions) {
                            $scope.show_inscrits = inscriptions
                        })
                        $('#liste-inscrits').modal('show')
                    }

                }
            ]
        };
    };
})();

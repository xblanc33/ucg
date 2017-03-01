(function() {

    'use strict';

    angular.module('adminModule').controller('adminController', ['$scope', 'eventsService', 'entrainementsService', adminControllerFactory])

    function adminControllerFactory($scope, $eventsService, $entrainementsService) {
        $scope.events = [];


        //Events
        $eventsService.query(function(query_events) {
            $scope.events = query_events;
        });


        $scope.showNewEvent = function() {
            $scope.$broadcast('new_event');
            $('#event-modal').modal('show');
        };

        $scope.showEvent = function(event) {
            $scope.$broadcast('open_event', event)
            $('#event-modal').modal('show');
        };

        $scope.removeEvent = function(event) {
            var answer = confirm("Voulez-vous réellement supprimer cet évènement ?")
            if (answer) {
                console.log('test');
                event.token = $scope.token;
                $eventsService.remove(event);
                $eventsService.query(function(query_events) {
                    $scope.events = query_events;
                });
            }
        };




        $scope.entrainements = [];


        //Events
        $entrainementsService.query(function(query_entrainements) {
            $scope.entrainements = query_entrainements;
        });


        $scope.showNewEntrainement = function() {
            $scope.$broadcast('new_entrainement');
            $('#entrainement-modal').modal('show');
        };

        $scope.showEntrainement = function(entrainement) {
            $scope.$broadcast('open_entrainement', entrainement)
            $('#entrainement-modal').modal('show');
        };

        $scope.removeEntrainement = function(entrainement) {
            var answer = confirm("Voulez-vous réellement supprimer cet entrainement ?")
            if (answer) {
                console.log('test');
                entrainement.token = $scope.token;
                $entrainementsService.remove(entrainement);
                $entrainementsService.query(function(query_entrainements) {
                    $scope.entrainements = query_entrainements;
                });
            }
        };



    };


})()

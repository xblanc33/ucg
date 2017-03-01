(function() {

    'use strict';

    angular.module('adminModule').controller('eventModalController', ['$scope', 'eventsService', eventModalControllerFactory])

    function eventModalControllerFactory($scope, $eventsService) {
        $scope.event_modal = {};

        var initEvent = function() {
            $scope.event_modal = {};
        }

        var setEvent = function(event) {
            $scope.event_modal = angular.copy(event);
        }

        $scope.$on('new_event', initEvent);

        $scope.$on('open_event' , function(event, args) {
            setEvent(args)
        })



        $scope.saveEvent = function() {
            var copy_event = angular.copy($scope.event_modal);
            copy_event.token = $scope.token;
            $eventsService.save(copy_event, function(save) {
                $scope.event_modal.success = true
            })
        }


    };


})()

(function() {

    'use strict';

    angular.module('adminModule').controller('entrainementModalController', ['$scope', 'entrainementsService', entrainementModalControllerFactory])

    function entrainementModalControllerFactory($scope, $entrainementsService) {
        $scope.entrainement_modal = {};

        var initEntrainement = function() {
            $scope.entrainement_modal = {};
        }

        var setEntrainement = function(entrainement) {
            $scope.entrainement_modal = angular.copy(entrainement);
        }

        $scope.$on('new_entrainement', initEntrainement);

        $scope.$on('open_entrainement' , function(entrainement, args) {
            setEntrainement(args)
        })



        $scope.saveEntrainement = function() {
            var copy_entrainement = angular.copy($scope.entrainement_modal);
            copy_entrainement.token = $scope.token;
            $entrainementsService.save(copy_entrainement, function(save) {
                $scope.entrainement_modal.success = true
            })
        }


    };


})()

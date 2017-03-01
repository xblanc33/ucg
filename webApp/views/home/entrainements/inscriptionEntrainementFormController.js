(function() {

    'use strict';

    angular.module('homeModule').controller('inscriptionEntrainementFormController', ['$scope', 'inscriptionsService', inscriptionEntrainementFormControllerFactory])

    function inscriptionEntrainementFormControllerFactory($scope, $inscriptionsService) {
        var newInscription = function() {
            $scope.new_inscription = {};
            $scope.new_inscription.success = false;
            $scope.new_inscription.already = false;
        }

        $scope.$on('new_entrainement_inscription', newInscription)


        $scope.saveNewInscription = function() {
            if (!$scope.form_inscription.$valid) {
                $scope.form_inscription.$saved = false
            } else {
                //var copy_inscription = angular.copy($scope.new_inscription)
                $inscriptionsService.save($scope.new_inscription, function(response) {
                    $scope.form_inscription.$saved = true
                    if (response.result === 1) $scope.new_inscription.success = true
                    else if (response.result === 2) $scope.new_inscription.already = true
                })
            }
            //$scope.hideModal()
        }

    };


})()

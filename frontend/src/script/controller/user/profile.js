/*global define*/
'use strict';

define([
    'app',
    'lodash'
], function (app, _) {

    return app.controller('UserProfile', [
        '$scope',
        '$keycloak',
        '$state',
        '$owner',
        '$interval',
        function Controller($scope, $keycloak, $state, $owner, $interval) {

            var dogsRefresh = function () { 
                if (!$scope.owner) return;
                $scope.owner.one('dog').getList().then(function(dogs) {
                    $scope.dogs = dogs;
                });
            };


            // Refresh dogs once we have an owner
            $scope.$watch('owner', function(owner) {
                dogsRefresh();
            });

            // Refresh dogs every 3 seconds
            $interval(dogsRefresh, 3000);
            

        }
    ]);
});

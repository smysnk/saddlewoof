/*global define*/
'use strict';

define([
    'app',
    'lodash'
], function (app, _) {

    return app.controller('AdminDashboard', [
        '$scope',
        '$keycloak',
        '$state',
        '$dog',
        '$owner',
        function Controller($scope, $keycloak, $state, $dog, $owner) {
        
            // Set the dogs to scope once its ready
            $dog.then(function (dogs) {
                $scope.dogs = dogs;
            });

            // Set the owners to scope once its ready
            $owner.then(function (owners) {
                $scope.owners = owners;
            });

        }
    ]);
});

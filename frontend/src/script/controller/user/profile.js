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
        function Controller($scope, $keycloak, $state, $owner) {

            // Get a list of dogs for this owner
            $scope.$watch('owner', function(owner) {

                if (!owner) return;
                owner.one('dog').getList().then(function(dogs) {
                    $scope.dogs = dogs;
                });

            });

        }
    ]);
});

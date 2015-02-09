/*global define*/
'use strict';

define([
    'app',
], function (app) {

    return app.controller('Principle', [
        '$scope',
        '$keycloak',
        '$owner',
        function Controller($scope, $keycloak, $owner) {

            // Set the owners to scope once its ready
            $owner.then(function (owners) {
                
                if (!$keycloak.authenticated) return;

                var owner;
                try {
                    owner = owners.getByUuid($keycloak.subject);
                    owner.id = $keycloak.subject; // Required because id is not on put, for some reason if we don't
                } catch (e) {
                    owner = owners.one($keycloak.subject);
                }
                $scope.owner = owner;

                // If anything has changed from auth server, update local copy from authenticated
                if (owner.uuid == $keycloak.subject 
                    && owner.email == $keycloak.idToken.email 
                    && owner.nameOwner == $keycloak.idToken.name) return;

                owner.uuid = $keycloak.subject;
                owner.email = $keycloak.idToken.email;
                owner.nameOwner = $keycloak.idToken.name;
                owner.put();

            });

            $scope.$keycloak = $keycloak;


        }
    ]);
});

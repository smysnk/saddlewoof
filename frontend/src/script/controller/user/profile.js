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
        function Controller($scope, $keycloak, $state) {

            if (!$keycloak.authenticated) 
                return $state.go('home');


        }
    ]);
});

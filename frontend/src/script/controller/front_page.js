/*global define*/
'use strict';

define([
    'app',
    'lodash'
], function (app, _) {

    return app.controller('FrontPage', [
        '$scope',
        '$rootScope',
        '$location',
        '$anchorScroll',
        'Restangular',
        '$timeout',
        '$keycloak',
        '$state',
        function Controller($scope, $rootScope, $location, $anchorScroll, Restangular, $timeout, $keycloak, $state) {

            if ($keycloak.hasRealmRole('admin'))
                return $state.go('admin.dashboard');
            else if ($keycloak.hasRealmRole('user'))
                return $state.go('user.profile');
            
            $scope.createAccountUrl = $keycloak.createLoginUrl().replace("/login", "/registrations");
            
        }
    ]);
});

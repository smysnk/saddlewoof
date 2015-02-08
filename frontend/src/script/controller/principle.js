/*global define*/
'use strict';

define([
    'app',
], function (app) {

    return app.controller('Principle', [
        '$scope',
        'Restangular',
        '$keycloak',
        '$rootScope',
        '$anchorScroll',
        '$location',
        '$timeout',
        function Controller($scope, Restangular, $keycloak, $rootScope, $anchorScroll, $location, $timeout) {

            $scope.head = {
                'title': 'null'
            };

            $scope.$keycloak = $keycloak;
            // When user enters the website via url with a hash, this fix will bring the user to the appropriate section
            // if ($location.hash()) {
            //     $timeout(function() {
            //         $scope.scrollTo($location.hash());
            //     }, 500);                
            // }

            // $scope.scrollTo = function(id) {
            //     var old = $location.hash();
            //     $location.hash(id);
            //     $anchorScroll();
            //     //reset to old to keep any additional routing logic from kicking in
            //     $location.hash(old);
            // };


        }
    ]);
});

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
            
            $scope.createAccountUrl = $keycloak.createAccountUrl({});


            // $scope.marker = {
            //     id: 0,
            //     coords: {
            //         latitude: 50.994857,
            //         longitude: -114.059951
            //     },
            //     options: {
            //         title: "Docker Construction Management Inc",
            //         animation: '2'
            //     },
            //     icon: 'image/docker-d-140x140.png'
            // };

            // $scope.map = {
            //     control: {},
            //     options: {
            //         mapTypeId: google.maps.MapTypeId.ROADMAP,
            //         disableDefaultUI: true,
            //         scrollwheel: false,
            //         draggable: false
            //     },
            //     center: {
            //         latitude: 50.994857,
            //         longitude: -114.0733192 // -114.0713192
            //     },
            //     zoom: 14
            // };

            // $scope.$watch('map.control', function (control) {
            //     //console.log(abc);
            //     var map = control.getGMap();

            //     // var icon = {
            //     //     url: 'image/map-marker_docker.svg',
            //     //     origin: new google.maps.Point(0, 0)
            //     // };

            //     // var marker = new google.maps.Marker({
            //     //     position: new google.maps.LatLng($scope.marker.coords.latitude, $scope.marker.coords.longitude),
            //     //     map: map,
            //     //     draggable: false,
            //     //     icon: icon
            //     // });

            // });

            
        }
    ]);
});

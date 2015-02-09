/*global define*/
'use strict';

define([
    'app',
    'lodash',
    'util/usgs_overlay'
], function (app, _, USGSOverlay) {

    return app.controller('UserMap', [
        '$scope',
        '$keycloak',
        '$state',
        '$interval',
        '$dog',
        function Controller($scope, $keycloak, $state, $interval, $dog) {

            var dogsRefresh = function () { 
	            
	            if (!$scope.dogs) {	            	
		            // Set the dogs to scope once its ready
		            $dog.then(function (dogs) {
		                $scope.dogs = dogs;
		            });
	            } else {
	            	$scope.dogs.getList();
	            }

            };

            // Refresh dogs every 3 seconds
            $interval(dogsRefresh, 3000);        	

            $scope.map = {
                control: {},
                options: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI: false,
                    scrollwheel: true,
                    draggable: true,
                    streetViewControl: false                    
                },
                center: {
                    latitude: 51.0375, // 51.0372687,-114.0519849
                    longitude: -114.0520 // -114.0713192
                },
                zoom: 20
            };

            $scope.$watch('map.control', function (control) {
                
                var map = control.getGMap();

                // var swBound = new google.maps.LatLng(0, 0);
                // var neBound = new google.maps.LatLng(0.2, 0.4);
                  
				var swBound = new google.maps.LatLng(51.0372, -114.0527);
				var neBound = new google.maps.LatLng(51.0377, -114.0512);
				var bounds = new google.maps.LatLngBounds(swBound, neBound);

				// The photograph is courtesy of the U.S. Geological Survey.
				var srcImage = '/image/hockey_rink.png';

				// The custom USGSOverlay object contains the USGS image,
				// the bounds of the image, and a reference to the map.
				var overlay = new USGSOverlay(bounds, srcImage, map);

                //console.log(map);

            });


        }
    ]);
});

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

		    var iconBlack = {
		        url: '/image/map-marker_dog-black.svg',
		        origin: new google.maps.Point(0, 0)
		    };

		    var iconRed = {
		        url: '/image/map-marker_dog-red.svg',
		        origin: new google.maps.Point(0, 0)
		    };

        	var dogs;
        	var map;
        	var markers = [];
            var dogsRefresh = function () { 
	            
	            if (!dogs) {	            	
		            // Set the dogs to scope once its ready
		            $dog.then(function (dogsNew) {
		                dogs = dogsNew;
		            });
	            } else {
	            	dogs.getList().then(function (dogsNew) {
	            		dogs = dogsNew;

		                for (var length = dogs.length, i=0; i < length; i++) {
		                	var dog = dogs[i];

		                	var icon;
		                	if (dog.owner && dog.owner.uuid == $scope.owner.uuid) {
		                		icon = iconRed;
		                	} else {
		                		icon = iconBlack;
		                	}

		                	if (!markers[dog.id]) {
				                markers[dog.id] = new google.maps.Marker({
				                    position: new google.maps.LatLng(dog.latitude, dog.longitude),
				                    map: map,
				                    draggable: false,
				                    title: "" + dog.id,
				                    icon: icon
				                });
				            } else {
				            	markers[dog.id].setPosition(new google.maps.LatLng(dog.latitude, dog.longitude));
				            }			                			               
			            }

            
	            	});
	            }

            };



            // Refresh dogs every 1 seconds
            var interval = $interval(dogsRefresh, 1000);        	

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
                
                map = control.getGMap();

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


            // Cleanup
            $scope.$on("$destroy", function() {
                $interval.cancel(interval);
            });        



        }
    ]);
});

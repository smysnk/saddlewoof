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

            function attachMarker(marker) {
                
                var infoWindow = new google.maps.InfoWindow({ 
                    content: "test",
                    size: new google.maps.Size(50,50)
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.open(map, marker);
                });

                return infoWindow;
            }

        	var dogs;
        	var map;
        	var markers = [];
            var infoWindows = [];
            var mc;

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
		                	var isOwner = false;
		                	var icon;
		                	if (dog.owner && dog.owner.uuid == $scope.owner.uuid) {
		                		icon = iconRed;
		                		isOwner = true;
		                	} else {
		                		icon = iconBlack;
		                	}

		                	if (!markers[dog.id]) {
				                
                                markers[dog.id] = new google.maps.Marker({
				                    position: new google.maps.LatLng(dog.latitude, dog.longitude),
				                    //map: map,
				                    draggable: false,
				                    title: "" + dog.id,
				                    icon: icon
				                });

                                infoWindows[dog.id] = attachMarker(markers[dog.id]);				                	
                                mc.addMarker(markers[dog.id]);

				            } else {
				            	markers[dog.id].setPosition(new google.maps.LatLng(dog.latitude, dog.longitude));

                                if (isOwner) {
                                    var html = '<div style="min-width: 200px;">' +
                                               '        <div class="row">' +   
                                               '            <div class="col-xs-7"><strong><i class="fa fa-paw fa-fw"></i> Name</strong></div>' +
                                               '            <div class="col-xs-5">' + dog.name + '</div>' +
                                               '        </div>' +
                                               '        <div class="row">' +   
                                               '            <div class="col-xs-7"><strong><i class="fa fa-heartbeat fa-fw"></i> Heart Rate</strong></div>' +
                                               '            <div class="col-xs-5">' + dog.heartRate + ' bpm</div>' +
                                               '        </div>' +
                                               '        <div class="row">' +   
                                               '            <div class="col-xs-7"><strong><i class="fa fa-tachometer fa-fw"></i> Temperature</strong></div>' +
                                               '            <div class="col-xs-5">' + dog.temperature + '&deg;C</div>' +
                                               '        </div>' +
                                               '</div>';
                                    infoWindows[dog.id].setContent(html);
                                }                                
				            }			                			               
			            }
	            	});
	            }

                mc.repaint();

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

                // Initialize marker cluster
                var mcOptions = {gridSize: 30, maxZoom: 25};
                mc = new MarkerClusterer(map, markers, mcOptions);

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

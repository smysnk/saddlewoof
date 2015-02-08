/*global require*/
'use strict';


require.config({
	paths: {
        angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular.min',
        angular_touch: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular-touch.min',
        angular_animate: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular-animate.min',
        angular_google_maps: '../js/angular-google-maps',
        angular_ui_bootstrap: '../js/ui-bootstrap-tpls',
        angular_ui_router: '../js/angular-ui-router',
        angular_ui_utils: '../js/ui-utils',
        angular_oc_modal: '../js/ocModal',
        angular_messages: '../js/angular-messages',

        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min',
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
        lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.underscore.min',

        keycloak: '../bower_components/keycloak/dist/keycloak',

        //angular: '../bower_components/angular/angular',
        //underscore: '../bower_components/underscore/underscore',
        //bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        //jquery: '../bower_components/jquery/jquery',

        modernizr: '../js/modernizr',
        restangular: '../js/restangular',
        spin: '../bower_components/spin.js/spin'
	},
	shim: {
        lodash: { exports: '_' },
        jquery: { exports: 'jQuery' },
        angular: { deps: ['jquery'], exports: 'angular' },
        angular_touch: { deps: ['angular'] },
        angular_animate: { deps: ['angular'] },
        angular_messages: { deps: ['angular'] },
        bootstrap: { deps: ['jquery'] }
	}
});

require([
    'keycloak',
    'angular', 
    'app',
    'bootstrap',
    'controller/user/profile',
    'controller/user/map',
    'controller/admin/dashboard',
    'controller/principle',
    'controller/front_page',
    'service/service',
    'filter/unsafe',
], function (Keycloak, angular, app) {

    var keycloak = Keycloak('/keycloak.json');
    window.keycloak = keycloak;

    app.factory('$keycloak', function () {
        return keycloak;
    });    

    keycloak.init({ onLoad: 'check-sso' }).success(function(authenticated) {
        angular.bootstrap(document, ['app']);
    }).error(function() {
        angular.bootstrap(document, ['app']);
    });

    

 
});

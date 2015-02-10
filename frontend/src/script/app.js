define([
    'angular',
    'angular_touch',    
    'angular_animate',
    'angular_messages',
    'angular_ui_router',
    'angular_ui_bootstrap',
    'angular_ui_utils',
    'angular_google_maps',
    'restangular'    
], function (angular) {

    return angular.module('app', [
            'ui.router',
            'ui.bootstrap',
            'ui.utils',            
            'restangular',
            'uiGmapgoogle-maps',            
            'ngMessages',
            'ngAnimate'
        ])
        .factory('keycloakIntercepter', ['$keycloak', '$q', function($keycloak, $q) {
            var keycloakIntercepter = {
                request: function(config) {

                    config.requestTimestamp = new Date().getTime();
                    var deferred = $q.defer();

                    // If authenticated check that we have an updated token before performing
                    // any requests.  If there was a failure performing the renew, forward
                    // to the login page.
                    if ($keycloak.authenticated) {
                        $keycloak.updateToken().success(function () {
                            config.headers.Authorization = 'Bearer ' + $keycloak.token;
                            deferred.resolve(config);
                        }).error(function () {
                            $keycloak.login();
                        });
                    } else {
                        deferred.resolve(config);
                    }

                    return deferred.promise;
                },
                response: function(response) {
                    response.config.responseTimestamp = new Date().getTime();
                    return response;
                }
            };
            return keycloakIntercepter;
        }])
        .config([
            '$provide',
            '$urlRouterProvider', 
            '$stateProvider',
            '$httpProvider',
            '$locationProvider',
            'RestangularProvider',
            function($provide, $urlRouterProvider, $stateProvider, $httpProvider, $locationProvider, RestangularProvider) {

                RestangularProvider.setBaseUrl('/api/');            
                RestangularProvider.addRequestInterceptor(function (element, operation, what, url) {
                    if (element && element.requestInterceptor) {
                        return element.requestInterceptor(element, operation, what, url);
                    } else {
                        return element;
                    }
                });
                RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                    if (data && data.responseInterceptor) {
                        return data.responseInterceptor(data, operation, what, url, response, deferred);
                    } else {
                        return data;
                    }
                });

                $locationProvider.html5Mode({
                    enabled: true
                }).hashPrefix('!');
            
                $httpProvider.interceptors.push('keycloakIntercepter');

                // For any unmatched url, redirect to /state1
                $urlRouterProvider.otherwise('/404');
                
                // Now set up the states
                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: 'view/front_page.html',
                        controller: 'FrontPage'
                    })  
                    .state('user', {
                        url: '/user',
                        templateUrl: 'view/user.html',
                        controller: function ($scope, $rootScope, $state, $keycloak) {
                            if (!$keycloak.authenticated) 
                                return $state.go('home');
                        }                        
                    })                        
                        .state('user.profile', {
                            url: '/profile',
                            templateUrl: 'view/user/profile.html',
                            controller: 'UserProfile'
                        })
                        .state('user.map', {
                            url: '/map',
                            templateUrl: 'view/user/map.html',
                            controller: 'UserMap'
                        })
                    .state('admin', {
                        url: '/admin',
                        templateUrl: 'view/admin.html',
                        controller: function ($scope, $rootScope, $state, $keycloak) {
                            if (!$keycloak.authenticated) 
                                return $state.go('home');
                        }                        
                    })                        
                        .state('admin.dashboard', {
                            url: '/dashboard',
                            templateUrl: 'view/admin/dashboard.html',
                            controller: 'AdminDashboard'
                        })
                    .state('404', {
                        url: "/404",
                        templateUrl: "view/404.html",
                        controller: function ($scope, $rootScope) {
                            $scope.$on('$destroy', function () {
                                $rootScope.notFound = false;
                            });
                            $rootScope.notFound = true;
                        }
                    });                        
                    
            }
        ])
        .run(['$rootScope', '$state', '$stateParams', '$anchorScroll', '$location', '$window',
            function ($rootScope, $state, $stateParams, $anchorScroll, $location, $window) {

                $anchorScroll.yOffset = 70;

                // It's very handy to add references to $state and $stateParams to the $rootScope
                // so that you can access them from any scope within your applications.For example,
                // <li ui-sref-active="active }"> will set the <li> // to active whenever
                // 'contacts.list' or one of its decendents is active.
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;                  

            }
        ]); 

});
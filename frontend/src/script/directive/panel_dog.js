'use strict';

define([
    'app',
], function (app, Index) {

    app.directive('panelDog', function ($dog, $owner) {
        
        return {
            restrict: "E",
            scope: {
                owners: "=owners",
                dog: "=dog"
            },
            templateUrl: 'view/directive/panel_dog.html',
            controller: function ($scope, $transclude, $timeout) {

                var first = true;

                // Use a timeout before applying rest call to update dog name
                var timeoutDirty;
                $scope.$watch('dog.name', function (nameDog) {
                    
                    if (nameDog == undefined) 
                        return;

                    // Ignore the first time, so checkmark doesn't show on dogs with existing names
                    if (first) {
                        first = false;
                        return;
                    }

                    if (timeoutDirty)
                        $timeout.cancel(timeoutDirty); 

                    $scope.nameDogCommitted = false;
                    $scope.nameDogDirty = true;
                    
                    timeoutDirty = $timeout(function () {
                        $scope.dog.put().then(function () {
                            $scope.nameDogDirty = false;
                            $scope.nameDogCommitted = true;                        
                        });
                    }, 2000);

                });

            }

        };
    });

});


'use strict';

define([
    'app',
], function (app, Index) {

    app.directive('ownerSelect', function ($dog, $owner) {
        
        return {
            restrict: "E",
            scope: {
                owners: "=owners",
                dog: "=dog"
            },
            template: '<select ng-model="myOwner" ng-options="owner.nameOwner for owner in owners" ng-change="setOwner(dog, myOwner)" class="form-control" ><option value="">-- choose owner --</option></select>',
            controller: function ($scope, $transclude) {

                // Handles selection of a new owner, performs rest put/delete                
                $scope.setOwner = function (dog, owner) {

                    if (owner == null) {
                        dog.one('owner').remove();
                        dog.owner = null;
                        return;
                    }
                
                    dog.owner = owner;
                    dog.one('owner', owner.uuid).put({});

                };

                // Updapte the view model to the owner of this dog, if there is an owner
                $scope.$watch('dog', function(a) {

                    if (!a.owner) return;
                    $scope.myOwner = $scope.owners.getByUuid(a.owner.uuid);

                });


            }

        };
    });

});


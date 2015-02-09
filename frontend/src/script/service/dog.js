/*global define*/
'use strict';

define([
    'app',
], function (app) {

    app.service('$dog', [
        'Restangular',
    function (Restangular) {

        Restangular.extendCollection('dog', function(obj) {
            return angular.extend(obj, {

                getById: function (id) {

                    for (var i = 0, len = this.length; i < len; i++) {
                        if (this[i].id == id) 
                            return this[i];
                    }
                    throw new Error("Service not found");

                }           
            });
        });

        Restangular.extendModel('dog', function(obj) {
            return angular.extend(obj, {

                getGroups: function (id) {

                    this.groups = this.groups || this.all('group').getList();
                    return this.groups;

                },

                requestInterceptor: function (element, operation, what, url) {

                    if (operation === 'put') {

                        // Cleanup restangular garbage
                        if (element.owner) {
                            delete element.owner.id;
                            delete element.owner.fromServer;
                            delete element.owner.parentResource;
                            delete element.owner.reqParams;
                            delete element.owner.restangularCollection;
                            delete element.owner.route;
                        }

                    }

                    return element;

                }


            });
        });


        return Restangular
            .all('dog')
            .getList()
            .then(function(dog) {
                return dog;
            });
        
    }]);
});

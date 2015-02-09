/*global define*/
'use strict';

define([
    'app',
], function (app) {

    app.service('$owner', [
        'Restangular',
    function (Restangular) {

        Restangular.extendCollection('owner', function(obj) {
            return angular.extend(obj, {

                getByUuid: function (uuid) {

                    for (var i = 0, len = this.length; i < len; i++) {
                        if (this[i].uuid == uuid) 
                            return this[i];
                    }
                    throw new Error("Owner not found");

                }           
            });
        });

        Restangular.extendModel('owner', function(obj) {
            return angular.extend(obj, {

                getGroups: function (id) {

                    this.groups = this.groups || this.all('group').getList();
                    return this.groups;

                },

                requestInterceptor: function (element, operation, what, url) {

                    if (operation === 'put') {
                        delete element.id;
                    }

                    return element;

                }


            });
        });


        return Restangular
            .all('owner')
            .getList()
            .then(function(owner) {
                return owner;
            });
        
    }]);
});

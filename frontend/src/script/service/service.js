/*global define*/
'use strict';

define([
    'app',
], function (app) {

    app.service('$service', [
        'Restangular',
    function (Restangular) {

        Restangular.extendCollection('service', function(obj) {
            return angular.extend(obj, {

                create: function (service) {

                    var self = this;
                    this.post(service)
                        .then(function(service) {
                            self.push(service);
                        });

                },
                delete: function (service) {

                    var self = this;
                    service.remove()
                        .then(function() {

                            var index = self.indexOf(service);
                            if (index > -1) self.splice(index, 1);

                        });

                },
                getById: function (id) {

                    for (var i = 0, len = this.length; i < len; i++) {
                        if (this[i].id == id) 
                            return this[i];
                    }
                    throw new Error("Service not found");

                }           
            });
        });

        Restangular.extendModel('service', function(obj) {
            return angular.extend(obj, {

                getGroups: function (id) {

                    this.groups = this.groups || this.all('group').getList();
                    return this.groups;

                },

                requestInterceptor: function (element, operation, what, url) {

                    if (operation === 'put') {
                        delete element.active;
                        delete element.products;
                    }

                    return element;

                }


            });
        });

        Restangular.extendCollection('group', function(obj) {
            return angular.extend(obj, {

                create: function (group) {

                    var self = this;
                    this.post(group)
                        .then(function(group) {
                            self.push(group);
                        });

                },
                delete: function (group) {

                    var self = this;
                    group.remove()
                        .then(function() {

                            var index = self.indexOf(group);
                            if (index > -1) self.splice(index, 1);

                        });

                },
                getById: function (id) {

                    for (var i = 0, len = this.length; i < len; i++) {
                        if (this[i].id == id) 
                            return this[i];
                    }
                    throw new Error("Group not found");
                }

            });
        });        


        Restangular.extendModel('group', function(obj) {
            return angular.extend(obj, {

                create: function (group) {

                    var self = this;
                    this.post(group)
                        .then(function(group) {
                            self.push(group);
                        });

                },
                delete: function (group) {

                    var self = this;
                    group.remove()
                        .then(function() {

                            var index = self.indexOf(group);
                            if (index > -1) self.splice(index, 1);

                        });

                },
                getById: function (id) {

                    for (var i = 0, len = this.length; i < len; i++) {
                        if (this[i].id == id) 
                            return this[i];
                    }
                    throw new Error("Group not found");
                },
                getImages: function () {

                    this.images = this.all('image').getList();
                    return this.images;

                },
                requestInterceptor: function (element, operation, what, url) {

                    if (operation === 'put') {
                        delete element.active;
                        delete element.images;
                    }

                    return element;

                }
                
            });
        });     

        Restangular.extendCollection('image', function(obj) {
            return angular.extend(obj, {

                getById: function (id) {

                    for (var i = 0, len = this.length; i < len; i++) {
                        if (this[i].id == id) 
                            return this[i];
                    }
                    throw new Error("Image not found");
                },
                delete: function (image) {

                    var self = this;
                    image.remove()
                        .then(function() {

                            var index = self.indexOf(image);
                            if (index > -1) self.splice(index, 1);

                        });

                },               

            });
        });        

        Restangular.extendModel('image', function(obj) {
            return angular.extend(obj, {

                
                delete: function (image) {

                    var self = this;
                    image.remove()
                        .then(function() {

                            var index = self.indexOf(image);
                            if (index > -1) self.splice(index, 1);

                        });

                }

            });
        });

        return Restangular
            .all('service')
            .getList()
            .then(function(service) {
                return service;
            });
        
    }]);
});

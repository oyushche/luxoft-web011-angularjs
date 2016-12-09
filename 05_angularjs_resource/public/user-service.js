

(function ()
{
    'use strict';

    var UserService = function ($resource)
    {
        this.resource = $resource('/user/:userId', { userId: '@id'}, { "update": { method: 'PUT' }});
    };

    UserService.prototype =
    {
        getUser: function (id)
        {
            return this.resource.get({userId: id});
        },

        addUser: function (id, name)
        {
            var user = new this.resource;
            user.id = id;
            user.name = name;
            user.$save();
        },

        updateUser: function (id, nameToUpdate)
        {
            var user = this.resource.get({userId: id}, function (user)
            {
                user.name = nameToUpdate;
                user.$update();
            });
        },

        removeUser: function (id)
        {
            var user = this.resource.get({userId: id}, function (user)
            {
                user.$remove(function ()
                {
                    console.log("---> user with id " + id + " removed");
                });
            });
        }
    };

    UserService.$inject = ['$resource'];

    angular.module('prod').service('UserService', UserService);
}
)();
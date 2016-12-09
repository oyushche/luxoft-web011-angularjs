

(function ()
{
    'use strict';

    var UserController = function ($scope, $routeParams, userService)
    {
        var _this = this;

        _this.scope = $scope;
        _this.routeParams = $routeParams;
        _this.userService = userService;


        _this.output = "empty";

        this.getUserById = function ()
        {
            _this.output = _this.userService.getUser(_this.scope.userId);
        };

        this.addUser = function ()
        {
            _this.userService.addUser(_this.scope.userId, _this.scope.userName);
        };

        this.updateUser = function ()
        {
            _this.output = _this.userService.updateUser(_this.scope.userId, _this.scope.userName);
        };

        this.removeUser = function ()
        {
            _this.userService.removeUser(_this.scope.userId);
        };

    };

    UserController.$inject = ['$scope', '$routeParams', 'UserService'];

    angular.module('prod').controller('UserCtrl', UserController);
}
)();

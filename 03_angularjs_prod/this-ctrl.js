

(function ()
    {
        'use strict';

        var GreetingController = function ($scope, greetingService)
        {
            var _this = this;

            this.greeting = "";

            this.update = function () {

                if ($scope.name) {
                    _this.greeting = "Hi " + $scope.name + " " + greetingService.getRandomSmile();
                }
            };

            this.getSmiles = function ()
            {
                return greetingService.getSmiles();
            }
        };

        GreetingController.$inject = ['$scope', 'GreetingService'];

        angular.module('prod').controller('GreetingCtrl', GreetingController);
    }
)();

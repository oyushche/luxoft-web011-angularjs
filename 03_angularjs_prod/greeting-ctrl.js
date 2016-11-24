

(function ()
{
    'use strict';

    var GreetingController = function ($scope, greetingService)
    {
        $scope.greeting = "";

        $scope.update = function () {

            if ($scope.name) {
                $scope.greeting = "Hi " + $scope.name + " " + greetingService.getRandomSmile();
            }
        };

        $scope.getSmiles = function ()
        {
            return greetingService.getSmiles();
        }
    };

    GreetingController.$inject = ['$scope', 'GreetingService'];

    angular.module('prod').controller('GreetingCtrl', GreetingController);
}
)();



(function ()
{
    'use strict';

    var GreetingController = function ($scope)
    {
        $scope.greeting = "";

        $scope.update = function () {

            if ($scope.name) {
                $scope.greeting = "Hi " + $scope.name;
            }
        };
    };

    GreetingController.$inject = ['$scope'];

    angular.module('custom-directive').controller('GreetingCtrl', GreetingController);
}
)();

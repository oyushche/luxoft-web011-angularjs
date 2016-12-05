

(function ()
{
    'use strict';

    var GreetingController = function ($scope)
    {
        $scope.counter = 0;
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


// $q.all([first, second, third])
//     .then(function (result) {
//         var tmp = [];
//         angular.forEach(result,
//             function (response) {
//                 tmp.push(response.data);
//             });
//         return tmp;
//     })
//     .then(function (tmpResult) {
//         $scope.combinedResult = tmpResult.join(", ");
//     });
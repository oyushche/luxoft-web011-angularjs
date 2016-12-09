

(function ()
    {
        'use strict';

        var GreetingController = function (greetingService)
        {
            var _this = this;

            this.greeting = "";
            this.name = "";

            this.test = "test";

            this.update = function update() {

                console.log("---> update");
                if (_this.name) {
                    _this.greeting = "Hi " + _this.name + " " + greetingService.getRandomSmile();
                }
            };

            this.getSmiles = function getSmiles()
            {
                console.log("---> getSmiles");
                return greetingService.getSmiles();
            }
        };

        GreetingController.$inject = ['GreetingService'];

        angular.module('prod').controller('GreetingController', GreetingController);
    }
)();

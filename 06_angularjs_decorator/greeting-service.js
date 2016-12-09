

(function ()
{
    'use strict';

    var GreetingService = function()
    {
        this.smiles = [":)", ":-)", ":]"];
    };

    GreetingService.prototype =
    {
        getRandomSmile: function()
        {
            return this.smiles[0];
        },

        getSmiles: function ()
        {
            var result = [];
            for (var i = 0; i < this.smiles.length; i++)
            {
                result.push(this.smiles[i]);
            }
            return result;
        }
    };

    GreetingService.$inject = [];

    angular.module('prod').service('GreetingService', GreetingService);

    angular.module('prod').decorator('GreetingService', ['$delegate', function FirstDecorator($delegate)
    {
        var fn = $delegate.getRandomSmile;

        $delegate.getRandomSmile = function ()
        {
            return " !!! " + fn.apply($delegate);
        };

        return $delegate;
    }]);

    angular.module('prod').decorator('GreetingService', ['$delegate', function SecondDecorator($delegate)
    {
        var fn = $delegate.getRandomSmile;

        $delegate.getRandomSmile = function ()
        {
            return " +++ " + fn.apply($delegate);
        };

        return $delegate;
    }]);
}
)();



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
}
)();

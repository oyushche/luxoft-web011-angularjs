

(function ()
{
    'use strict';

    angular.module("custom-directive", []);

    angular.module("custom-directive").directive('replace', function ()
    {
        var replace = {};

        replace.restrict = 'EACM';

        replace.template = "This data coming from my custom directive: {{ name }}";

        return replace;
    });

    angular.module("custom-directive").directive('innerContent', function ()
    {
        var config = {};

        config.restrict = 'EA';

        config.templateUrl = "./inner-content.html";

        return config;
    });

    angular.module("custom-directive").directive('bgColor', function ()
    {
        var config = {};

        config.restrict = 'A';

        config.link = function ($scope, el, attrs)
        {
            var color = el[0].getAttribute('bg-color');

            if (color.length < 6)
            {
                color = 'ffff00';
            }
            el.css("background-color", color);
        };

        return config;
    });

}
)();


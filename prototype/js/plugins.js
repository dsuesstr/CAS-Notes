// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

function loadLocalStorageValue(key, defaultValue) {
    var value = sessionStorage.getItem(key);
    if(!value) { return defaultValue }

    return JSON.parse(value);
}

function saveLocalStorageValue(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

function changeBackground(color) {
    $('body').css('background-color', color)
}

function changeForeground(color) {
    $('body, a').css('color', color);
}




// Place any jQuery/helper plugins in here.
(function ( $ ) {
    $.fn.ranking = function( options ) {

        // private vars
        var settings = $.extend({
            matchElement: 'span',
            readOnly: false,
            value: 0,
            activeClass: 'priority-active',
            inactiveClass: 'priority-inactive',
            dataValueAttribute : 'data-ranking-value',
            callbackFunction : function(value) {}
        }, options);

        // private methods
        var setRanking = function(element, value, setValue) {
            if(setValue === true) {
                $(element).attr(settings.dataValueAttribute, value);
                settings.callbackFunction(value);
            }

            $(element).children(settings.matchElement).each(function (index) {
                if(setValue === true) {
                    $(this).attr(settings.dataValueAttribute, index + 1);
                }

                if (index < value) {
                    $(this).removeClass(settings.inactiveClass);
                    $(this).addClass(settings.activeClass);
                }
                else {
                    $(this).removeClass(settings.activeClass);
                    $(this).addClass(settings.inactiveClass);
                }
            });

            return value;
        };

        var addHandlers = function(element) {
            $(element).children(settings.matchElement).mouseenter(function () {
                setRanking($(this).parent(), $(this).attr(settings.dataValueAttribute), false);
            });

            $(element).children(settings.matchElement).click(function () {
                var value = $(this).attr(settings.dataValueAttribute);
                setRanking($(this).parent(), value, true);
            });

            $(element).mouseout(function () {
                setRanking(this, $(this).attr(settings.dataValueAttribute), true);
            });
        };

        if(settings.readOnly === false) {
            addHandlers(this);
        }

        setRanking(this, settings.value, true);
    };

}( jQuery ));


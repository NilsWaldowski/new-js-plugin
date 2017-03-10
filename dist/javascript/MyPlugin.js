/*!
 * myPlugin v0.0.1: MyPlugin
 * (c) 2017 Nils Waldowski
 * MIT License
 * https://github.com/NilsWaldowski/MyPlugin
 */

/**
 * Plugin Pattern from Chris Ferdinandi
 * https://gomakethings.com/the-anatomy-of-a-vanilla-javascript-plugin/
 */

(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.myPlugin = factory(root);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function(root) {
    'use strict';

    //
    // Variables
    //

    var myPlugin = {}; // Object for public APIs
    var supports = !!document.querySelector && !!root.addEventListener; // Feature test
    var settings; // Placeholder variables

    // Default settings
    var defaults = {
        someVar: 123,
        initClass: 'js-myplugin',
        callbackBefore: function() {},
        callbackAfter: function() {}
    };


    //
    // Methods
    //

    /**
     * Merge two or more objects. Returns a new object.
     * @private
     * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
     * @param {Object}   objects  The objects to merge together
     * @returns {Object}          Merged values of defaults and options
     */
    var extend = function() {

        // Variables
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function(obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    // If deep merge and property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;

    };

    /**
     * Add a class to a link when it's clicked
     * @private
     * @param {Event} event The click event
     */
    var addClass = function(event) {

        // Get the thing that was clicked
        var toggle = event.target;

        // Check if the thing that was clicked has the [data-click-me] attribute
        if (toggle && toggle.hasAttribute('data-click-me')) {

            // Prevent default click event
            if (toggle.tagName.toLowerCase() === 'a') {
                console.log('link!');
                event.preventDefault();
            }

            // Set the [data-click-me] value as a class on the link
            toggle.classList.add(toggle.getAttribute('data-click-me'));

        }

    };


    /**
     * Handle events
     * @private
     */
    var eventHandler = function(event) {

        // Callback before the event handler runs
        settings.callbackBefore;

        // On click
        if (event.type === 'click') {
            addClass(event);
        }

        // On resize
        if (event.type === 'resize') {
            console.log('resize happened');
        }

        // Callback after the event handler runs
        settings.callbackAfter;
    };

    /**
     * Destroy the current initialization.
     * @public
     */
    myPlugin.destroy = function() {

        // If plugin isn't already initialized, stop
        if (!settings) {
            return;
        };

        // Remove init class for conditional CSS
        document.documentElement.classList.remove(settings.initClass);

        // @todo Undo any other init functions...

        // Remove event listeners
        document.removeEventListener('click', eventHandler, false);

        // Reset variables
        settings = null;

    };

    /**
     * Initialize Plugin
     * @public
     * @param {Object} options User settings
     */
    myPlugin.init = function(options) {

        // feature test
        if (!supports) {
            return;
        }

        // Destroy any existing initializations
        myPlugin.destroy();

        // Merge user options with defaults
        settings = extend(defaults, options || {});

        // Add class to HTML element to activate conditional CSS
        document.documentElement.classList.add(settings.initClass);

        // @todo Do stuff...

        // Listen for click events
        document.addEventListener('click', eventHandler, false);
        window.addEventListener('resize', eventHandler, false);

    };


    //
    // Public APIs
    //
    return myPlugin;

});

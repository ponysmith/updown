updown.js
=========

[![CircleCI](https://circleci.com/gh/ponysmith/updown.svg?style=svg)](https://circleci.com/gh/ponysmith/updown)

**updown.js** is a small JS utility script that publishes custom events at defined breakpoints.  **updown.js** fires a custom event any time the window is resized and passes one of the predefined (or user-defined) breakpoints.  Custom updown events use the breakpoint size for their name and are namespaced with `up` or `down` depending on the direction of the resize.  For example, resizing the window from 1000 pixels wide to 1100 pixels wide would pass the 1024 breakpoint, firing the `1024` event.  Since the window size has increased, the `up` namespace is used, meaning the fired event is `1024.up`.



## Usage ##

Once the library has been included, you can instantiate updown by calling the `updown()` function in jQuery's `document.ready`.  

    $(document).ready(function() {
        var UpDown = new updown();
    });

Once the library has been instantiated, you can bind your javascript to the custom events (events are fired on the window object):

    $(window).on('1024.up', function() {
        // This code will execute when the window width increases and passes 1024 pixels
    });
    $(window).on('768.down', function() {
        // This code will execute when the window width decreases and passes 768 pixels
    });




### Options ###
The `updown()` function takes an options object as its single (optional) parameter.  For more details on the available options, please visit http://ponysmith.github.io/updown

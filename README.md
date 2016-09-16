# updown

[![CircleCI](https://circleci.com/gh/ponysmith/updown.svg?style=svg)](https://circleci.com/gh/ponysmith/updown)

**updown.js** is a small JS utility script that publishes custom events at defined breakpoints.  **updown.js** fires a custom event any time the window is resized and passes one of the registered breakpoints.  Custom updown events use the breakpoint size for their name and are namespaced with `up` or `down` depending on the direction of the resize.  For example, if you registered a breakpoint of 1000px, resizing the window from 900 pixels wide to 1100 pixels wide would pass the breakpoint, firing the `1000` event.  Since the window size has increased, the `up` namespace is used, meaning the fired event is `1000.up`.


## Usage ##

Once the library has been included, you can instantiate **updown** by calling the global `updown()` method:

```
updown(breakpoints, [options]);
```
The method has one required parameter and one optional parameter:
* `breakpoints`: array of breakpoints to register (required)
* `options`: options object. Currently there is only one option
  * `lag`: debounce time to wait after resize event finishes before firing updown events. If no lag is defined, a default of 100 milliseconds is used.

Once the library has been instantiated, you can bind your javascript to the custom events (events are fired on the window object):

```
/**
 * Instantiate updown
 * Sets up events for the breakpoints 400 and 1000 and sets a debounce lag of 200 milliseconds
 */
updown([400, 1000], { lag: 200 });

/**
 * Plain javascript binding
 */
window.addEventListener('400.down', function() {
  // This code will execute when the window width decreases and passes 400 pixels
});

/**
 * jQuery
 */
$(window).on('1000.up', function() {
  // This code will execute when the window width increases and passes 1000 pixels
});
```

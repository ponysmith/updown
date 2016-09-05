/**
 * updown.js
 * @author Pony Smith, pony@ponysmith.com
 */

var updown = function(options) {

	var _options = { lag: 100, breakpoints: [320,480,768,1024,1280] }
  var _breakpoints = [];
	var _last = null;
	var _current = null;
	var _timeout = null;
  var _events = {};

	/**
	 * Private object for holding all our private methods
	 */
	var _private = {

    /**
     * Initialize updown
     */
		init: function(options) {
			// Extend options with user options
      for(o in options) {
        if(_options[o] != null) _options[o] = options[o];
      }

      // Filter out duplicate breakpoints
      _options.breakpoints.forEach(function(v) {
        if(_breakpoints.indexOf(v) == -1) _breakpoints.push(v);
      });

      // Sort the breakpoints array
      _breakpoints.sort(function(a,b) {
        switch(true) {
          case (a < b): return -1; break;
          case (a > b): return 1; break;
          default: return 0; break;
        }
      });

      // Create the events
      _breakpoints.forEach(function(v) {
        var up = document.createEvent('Event');
        var down = document.createEvent('Event');
        up.initEvent(v + '.up', true, true);
        down.initEvent(v + '.down', true, true);
        _events[v + '.up'] = up;
        _events[v + '.down'] = down;
      });

			// Initally set the _current and _last
			_current = window.innerWidth;
			_last = _current;
			// Bind resize event
			window.onresize = function() {
				clearInterval(_timeout);
				_timeout = setTimeout(function() {
					_current = window.innerWidth;
					_private.check();
				}, _options.lag);
			};

			return _breakpoints;
		},


		/**
		 * Get the array indexes for the breakpoints above and below the last width
		 * @return (obj) Object with properties for the min and max indexes
		 */
		getIndexes: function() {
			var above = null;
			var below = null;
			var l = _breakpoints.length;
			// Check the breakpoints
			switch(true) {
				// If width is smaller than the lowest breakpoint, set max to 0 and leave min null
				case (_last < _breakpoints[0]):
					above = 0;
					break;
				// If width is larger than the largest breakpoint, set min to highest index and leave max null
				case (_last > _breakpoints[l-1]):
					below = l-1;
					break;
				// If we're somewhere in the middle
				default:
          // _breakpoints.forEach(function(v, i) {
          for(i=0; i<l; i++) {
            if(_last < _breakpoints[i]) {
              below = i-1;
              above = i;
              break;
            }
          }
          break;
			}

			// Return the breakpoint
			return { below: below, above: above };
		},

		/**
		 * Check width against breakpoints and trigger events if necessary
		 */
		check: function() {
			var idx, bp, l = _breakpoints.length, cont = true;
			// If the current width is the same as the last, exit
			if(_current == _last) return false;
			// Get the breakpoint indexes for the last known width
			bp = _private.getIndexes();
			// Set starting index and direction based on if the window increased or decreased
			idx = (_current > _last) ? bp.above: bp.below;
			dir = (_current > _last) ? 'up' : 'down';
			// Trigger breakpoint(s)
			_private.trigger(idx, dir);
			// Update _last
			_last = _current;
		},

		/**
		 * Trigger the current breakpoint if necessary
		 * This function will call itself recursively until all necessary breakpoint events have been triggered
		 */
		trigger: function(idx, dir) {
			// Only trigger events and recurse if we're still outside the current breakpoint (_breakpoints[idx])
			if( (dir == 'up' && _current >= _breakpoints[idx]) || (dir == 'down' && _current < _breakpoints[idx]) ) {
				// Trigger event
        var event_name = _breakpoints[idx] + '.' + dir;
				window.dispatchEvent(_events[event_name]);
				// Update index
				(dir == 'up') ? idx++ : idx--;
				// Recurse
				_private.trigger(idx, dir);
			}
		}
	}

	// Instantiate
	return _private.init(options);

}

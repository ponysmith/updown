/** 
 * updown.js
 * @author Pony Smith, pony@ponysmith.com
 */
var updown = function(options) {

	var 
	/** 
	 * Options array 
	 * breakpoints: Array if integers with breakpoints to trigger events for
	 * lag: Lag time to wait after resize event finishes before triggering events.
     */
	_options = { lag: 100 },
	/* Explicit breakpoints reference (easier to reference than _options.breakpoints) */
	_breakpoints = [320,480,768,1024,1280],
	/* Store a reference to the window object */
	_window = $(window),
	/* The last known breakpoint before resize */
	_last = null,
	/* The breakpoint for the current width (after resize) */
	_current = null,
	/* Reference to the interval for tieout */
	_timeout = null,

	/** 
	 * Private object for holding all our private methods
	 */
	_private = {
		/** 
		 * Initialize updown
		 * @param (object) options: options object
		 * @return (array): Array of registered breakpoints
		 */
		init: function(options) {
			// Extend options with user options and breakpoints
			$.extend(_options, options);
			_breakpoints = _breakpoints.concat(_options.breakpoints);
			// Sort the array (must do this before removing duplicates)
			_breakpoints.sort(function(a,b) { return a-b; });
			// Do some filtering on the _breakpoints array (doing by hand since IE8 doesn't support array.filter)
			for(i=0; i<_breakpoints.length; i++) {
				if( _breakpoints[i] === _breakpoints[i-1]  || typeof _breakpoints[i] != 'number'  || _breakpoints[i] <=0 ) {
					_breakpoints.splice(i, 1)
				}
			}
			// Initally set the _current and _last
			_current = _window.width();
			_last = _current;
			// Bind resize event
			$(window).on('resize', function() {
				// Using a timeout (cleared on resize) to only trigger the event once per resize cycle
				clearInterval(_timeout);
				_timeout = setTimeout(function() {
					// Set the current breakpoing
					_current = _window.width();
					// Check for events
					_private.check();
				}, _options.lag);
			});
			return _breakpoints;
		},

		/** 
		 * Get the array indexes for the breakpoints above and below the last width
		 * @return (obj) Object with properties for the min and max indexes
		 */
		getIndexes: function() {
			var min = null;
			var max = null;
			var l = _breakpoints.length;
			// Check the breakpoints
			switch(true) {
				// If width is smaller than the lowest breakpoint, set max to 0 and leave min null
				case (_last < _breakpoints[0]): 
					max = 0;
					break;
				// If width is larger than the largest breakpoint, set min to highest index and leave max null
				case (_last > _breakpoints[l-1]):
					min = l-1;
					break;
				// If we're somewhere in the middle
				default: 
					// Loop through breakpoints from lowest to highest
					for(var i=0; i<l; i++) {
						// As soon as we find a breakpoint that is larger than the current width
						if(_last < _breakpoints[i]) {
							min = i-1;
							max = i
							break;
						}
					}
					break;
			}
			// Return the breakpoint
			return { min: min, max: max };
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
			idx = (_current > _last) ? bp.max : bp.min;
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
				_window.trigger(_breakpoints[idx] + '.' + dir);
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
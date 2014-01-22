updown.js
=========

**Dependencies:**
**updown.js** requires jQuery 1.7+ to run.

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
The `updown()` function takes an options object as its single (optional) parameter.  Any of the following options can be set using the options parameter.

<table summary="Object properties for the updown.js constructor function parameter">
	<thead>
		<tr>
			<th scope="col">Parameter</th>
			<th scope="col">Type</th>
			<th scope="col">Default</th>
			<th scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
        <tr>
			<td>lag</td>
			<td>int</td>
			<td>100</td>
			<td>Time in milliseconds to wait after a resize event finishes before checking for passed breakpoints.  The default of 100 should be fine in most cases.  Setting the number higher will improve performance but will create small delay before events are fired.</td>
		</tr>		
		<tr>
			<td>breakpoints</td>
			<td>array</td>
			<td>[320,480,768,1024,1280]</td>
			<td>Array of breakpoints to publish events for.  Any breakpoints passed in this parameter will be added to (not overwrite) the default</td>
		</tr>		
	</tbody>
</table>


		

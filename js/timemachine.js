/*!
 * Time Machine JavaScript
 * by Rakesh Mistry (http://rakeshmistry.ca/)
 */

// Fix to hide the Facebook 'Like' button
$(document).ready(function(){
   setFBLikeVisibility();
});

function setFBLikeVisibility(){
    if(typeof($('div.fb-like').html()) != 'undefined'){

        if($('div.fb-like iframe').css('visibility') == 'visible'){
            $('div.fb-like iframe').css('visibility', 'inherit');
        } else {
            setTimeout('setFBLikeVisibility()', 100);
        }
     }
}

// AJAX update the 'Worldwide total'
(function updateTotal() {
	$.get('db/get-total.php', function (data) {
		document.getElementById('live-total').innerHTML = "Worldwide total: " + calculateTime(data);
		setTimeout(updateTotal, 1500);
	});
}());


// Start and stop "Time Travel"
$(document).ready(function() {
	$('#header').css("visibility", "hidden");
	$('#top').on('touchstart mousedown', function(e){
		var start = 0;
		var diff = 0;

		e.preventDefault();

		$('#header').css("visibility", "hidden");
		$('#share').css("visibility", "hidden");
		$('footer').css("visibility", "hidden");
		$('#middle').fadeOut(0);

		start = new Date();
		beginAction();

		$('body').on('touchend mouseup', function(e){
			if (diff == 0) {
				$('#middle').fadeIn(0);

				diff = new Date() - start;
				endAction();

				document.getElementById('text').innerHTML = "You just travelled " + calculateTime(diff) + " through time!";
				$.post( "db/set-total.php", { usrtime: diff}).done(function() { 
					$.get('db/get-total.php', function( data ) {
						document.getElementById('live-total').innerHTML = "Worldwide total: " + calculateTime(data);
					});
				});
				$('#header').css("visibility", "visible");
				$('#share').css("visibility", "visible");
				$('footer').css("visibility", "visible");
			};
		});
	});			
});

// Change background to a random colour every 444ms until 'endAction()' is called
function beginAction() {
	setbackground();
	action_timeout = setInterval("setbackground()",444);
}

function endAction() {
	if (typeof(action_timeout) != "undefined") clearTimeout(action_timeout);
}

function setbackground() {
	$('body').css("background-color", get_random_color());
}

// Generate random colour
function get_random_color() {
    var color = 'rgb(' + (Math.floor(128 * Math.random()) + 128) + ',' + (Math.floor(128 * Math.random()) + 128) + ',' + (Math.floor(128 * Math.random()) + 128) + ')';
    return color;
}

// Calculate days, hours, minutes, and seconds from milliseconds
function calculateTime(diff) {
	var x = diff;
	var days, hours, minutes, seconds; 
	var output = "";

	if (x >= 86400000) {
		days = Math.floor(x/86400000);
		if (days > 1) { 
			output += days + " days, "; 
		} else { output += days + " day, "; };
		x = x%86400000;
		if (x < 1000) { output = output.substring(0, output.length - 2) + " and "; };
	};
	if (x >= 3600000) {
		hours = Math.floor(x/3600000);
		if (hours > 1) { 
			output += hours + " hours, "; 
		} else { output += hours + " hour, "; };
		x = x%3600000;
		if (x < 1000) { output = output.substring(0, output.length - 2) + " and "; };
	};
	if (x >= 60000) {
		minutes = Math.floor(x/60000);
		if (minutes > 1) { 
			output += minutes + " minutes and "; 
		} else { output += minutes + " minute and "; };
		x = x%60000;
	};

	seconds = x/1000;
	output += seconds + " seconds";
	return output;
}
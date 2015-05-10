// Invoked when template gets rendered
Template.results.rendered = function () {

    // =========================================================================
    // HIDE
    // =========================================================================

    $( ".section-body" ).hide();

	// =========================================================================
	// INK REACTION EFFECT
	// =========================================================================
	
    $('.ink-reaction').on('click', function(e) {
        var bound = $(this).get(0).getBoundingClientRect();
        var x = e.clientX - bound.left;
        var y = e.clientY - bound.top;
        var color = getBackground($(this));
        var inverse = (getLuma(color) > 183) ? ' inverse' : '';
        var ink = $('<div class="ink' + inverse + '"></div>');
        var btnOffset = $(this).offset();
        var xPos = e.pageX - btnOffset.left;
        var yPos = e.pageY - btnOffset.top;
        ink.css({
            top: yPos,
            left: xPos
        }).appendTo($(this));
        window.setTimeout(function() {
            ink.remove();
        }, 1500);
    });

    getBackground = function(item) {
        var color = item.css("background-color");
        var alpha = parseFloat(color.split(',')[3], 10);
        if (isNaN(alpha) || alpha > 0.8) {
            return color;
        }
        if (item.is("body")) {
            return false;
        } else {
            return this.getBackground(item.parent());
        }
    };
    
    getLuma = function(color) {
        var rgba = color.substring(4, color.length - 1).split(',');
        var r = rgba[0];
        var g = rgba[1];
        var b = rgba[2];
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma;
    };

    // =========================================================================
    // ANIMATION
    // =========================================================================

    $( ".section-body" ).fadeIn( "slow", function() {
        // Animation complete.
    });

}

// Helpers
Template.results.helpers ({

});

// Event listener for the template
Template.results.events({

	// =========================================================================
	// RESET FORMS
	// =========================================================================

	'click #downloadButton' : function (event) {

		// prevent the default behavior
		event.preventDefault();

        // Output the consolidated data
        var text = this.data;
        text = text.join('\n');

        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, 'ncIDP-'+SESSION_ID+'.txt');

    },

    'click #sendEmailButton' : function (event) {

        // prevent the default behavior
        event.preventDefault();
        
        // Output the consolidated data
        var text = this.data;
        text = text.join('\n\r');

        // Prepare email
        var email = '';
        var subject = '[AUTO] ncIDP Prediction - Session ID: ' + SESSION_ID;
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' +  text;

    },

    'click #shareToolButton' : function (event) {

        // prevent the default behavior
        event.preventDefault();
        
        // log
        console.log("Twitter...");
    },

    'click #startNewButton' : function (event) {

        // prevent the default behavior
        event.preventDefault();

        // Fade out animation
        $( ".section-body" ).fadeOut( "slow", function() {
            // Animation complete.
            // Initialize route to the core page
            Router.go('/');
        });
        
    },

});
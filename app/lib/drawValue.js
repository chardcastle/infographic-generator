/**
 * Custom pie chart
 *
 * Uses filled circles and an arc to connotate a pie chart
 *
 * Requires raphael js
 * @author chris hardcastle <me @ chrishardcastle dot co dot uk>
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function ( $ ) {

    $.fn.drawValue = function( options ) {
 
        // Greenify the collection based on the settings variable.
        return this.each(function(i, item) {

            // Set options
            var settings = $.extend({
                // These are the defaults.
                id: $(item).prop('id'),
                percentage: $(item).data("percentage"),
                name: $(item).data("name"),
            }, options );

            // Debug

            console.log('Running plugin with: ');
            console.log(settings);

            // Clear any existing element first
            $('#' + settings.id).empty();

            // Percent background
            var archtype = Raphael(settings.id, 200, 100),
            circle = archtype.circle(50, 50, 40).attr({stroke: "none", fill: "#96BDAA"}),
            
            // Percent lable
            text = archtype.text(50, 50, settings.percentage + "%")
            .attr({fill: "#fff", "font-size": 20, "font-family": "'Fauna One', serif"});

            // Title
            // <h4 class="value-title">{{value.name}}</h4>

            // Arch calculator            
            archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
                var alpha = 360 / total * value,
                    a = (90 - alpha) * Math.PI / 180,
                    x = xloc + R * Math.cos(a),
                    y = yloc - R * Math.sin(a),
                    path;
                if (total == value) {
                    path = [
                        ["M", xloc, yloc - R],
                        ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
                    ];
                } else {
                    path = [
                        ["M", xloc, yloc - R],
                        ["A", R, R, 0, +(alpha > 180), 1, x, y]
                    ];
                }
                return {
                    path: path
                };
            };

            //make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
            var my_arc = archtype.path().attr({
                "stroke": "#00AA86",
                "stroke-width": 10,
                arc: [50, 50, 0, 100, 40]
            });

            my_arc.animate({
                arc: [50, 50, settings.percentage, 100, 40]
            }, 1500, "bounce");

            // Update name
            // $('#' + settings.id).find('.value-title').html(settings.name);
            
            console.log($(settings.target).parent().find('h4').text(), settings.name);
            $(settings.target).parent().find('h4').text(settings.name)
        });
 
    };
 
}( jQuery ));
(function ( $ ) {

    $.fn.cholorPicker = function( options ) {

            var out = document.getElementById("output"),
                reg = /^#(.)\1(.)\2(.)\3$/;
            
            // this is where colorpicker created
            var cp = Raphael.colorpicker(40, 20, 300, "#eee");
            var cp2 = Raphael.colorwheel(360, 20, 300, "#eee");
            
            out.onkeyup = function () {
                cp.color(this.value);
                cp2.color(this.value);
            };
            // assigning onchange event handler
            cp.onchange = function (clr) {
                out.value = clr.replace(reg, "#$1$2$3");
                cp2.color(clr);
                out.style.background = clr;
                out.style.color = Raphael.rgb2hsb(clr).b < .5 ? "#fff" : "#000";
            };
            cp2.onchange = function (clr) {
                out.value = clr.replace(reg, "#$1$2$3");
                cp.color(clr);
                out.style.background = clr;
                out.style.color = Raphael.rgb2hsb(clr).b < .5 ? "#fff" : "#000";
            };            

    };
 
}( jQuery ));            
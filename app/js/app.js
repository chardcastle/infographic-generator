'use strict';

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

/**
 * Little bird / Infographics
 *
 * A hybrid of two projects
 *
 * @author chris hardcastle < me at chrishardcastle dot co dot uk >
 */
/**
 * App Module
 *
 * Configure routes
 * 
 */

var app = angular.module('littlebird', ['littlebirdFilters', 'littlebirdServices', 'infographicServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.      
  		when('/infographic', {templateUrl: 'partials/infographic.html',   controller: InfographicCtrl}).
      when('/play', {templateUrl: 'partials/phone-list.html',   controller: LittleBirdLevelListCtrl}).
      when('/play/:level', {templateUrl: 'partials/phone-detail.html', controller: LittleBirdLevelDetailCtrl}).
      otherwise({redirectTo: '/infographic'});
}]);


/**
 * Jquery listeners
 *
 * These map to HTML attributes in view
 * @return {[type]} [description]
 */

// uses plugin to render illustrations
app.directive('infographicDisplay', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {

          // Attributes can be parsed and sent to plugin calls like
          // this in theory
          // $(element).toolbar(scope.$eval(attrs.infographicData));

          // Add a listener that will re-draw the graphics on change
          scope.$watch('infographicDisplay', function(value) {

            console.log('Directive init: ');
            console.log(attrs);
            $(element).drawValue();               
             
          });
      }
    }
});

// calls plugin to update illustrations
app.directive('infographicControl', function(){
    return {

        restrict: 'A',

        link: function (scope, element, attrs) {

            // detect outside changes and update our input
            scope.$watch('infographicControl', function (val) {
              // console.log('Watching changes ' + attrs.id);
              //   element.val(scope.infographicControl);
              var target = $(element).prop('id');
              console.log('changing target ' + target);
              
            });
            
            // Events on change
            element.bind('propertychange keyup paste', function (blurEvent) {


            // Get vars required for drawValue process  
            var percentVal = $(element).find('.percentage').val(),
            percentValue = (percentVal.length > 0) ? percentVal : $(element).find('.percentage').prop('placeholder'),
            nameVal = ($(element).find('.name').val().length > 0) ? $(element).find('.name').val() : $(element).find('.name').val(),
            nameValue = nameVal.substr(0,30),
            options = {
              'target' : '#' + $(element).find('input:first').data('target').replace('-ctl', ''),               
              'percentage': percentValue,
              'name': nameValue
            }

            // Detect any alpha numeric values
            if ( /^\d+$/.test (options.percentage))
            {
              $("#error").hide();
              console.log('ok');

            } else {

              // Freeze on error
              $("#error").show();
              console.log('error');
              return false;

            }
              
              // Redraw the illustrations
              $(options.target).drawValue(options);
                
            });
        }
    }
});


// calls plugin to update illustrations
app.directive('colourPicker', function(){
      return {

        restrict: 'A',

        link: function (scope, element, attrs) {
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
          // that’s it. Too easy
      }
  };
});        
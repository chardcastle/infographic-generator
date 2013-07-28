'use strict';

/* App Module */

var app = angular.module('littlebird', ['littlebirdFilters', 'littlebirdServices', 'infographicServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.      
  		when('/infographic', {templateUrl: 'partials/infographic.html',   controller: InfographicCtrl}).
      when('/play', {templateUrl: 'partials/phone-list.html',   controller: LittleBirdLevelListCtrl}).
      when('/play/:level', {templateUrl: 'partials/phone-detail.html', controller: LittleBirdLevelDetailCtrl}).
      otherwise({redirectTo: '/infographic'});
}]);

  
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

                          
            $(element).drawValue();               
             
          });
      }
    }
});

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
                        // $('#' + target).drawValue({percentage:scope.infographicControl});                
            });
            
            element.bind('propertychange keyup paste', function (blurEvent) {

              var options = {
                'target' : '#' + $(element).prop('id').replace('-ctl', ''),
                'percentage': $(element).val()
              }
                
              if (options.percentage.length > 0)
              {
                console.log(options.percentage.length);
                if ( /^\d+$/.test (options.percentage))
                {
                  $("#error").hide();
                  console.log('ok');
                  $(options.target).drawValue(options);
                  console.log('binded change on element ' + $(element).prop('id').replace('-ctl', '') + ' with value ' + $(element).val());
                } else {
                  $("#error").show();
                  console.log('error');

                }
              }
            });
        }
    }
})
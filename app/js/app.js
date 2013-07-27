'use strict';

/* App Module */

angular.module('littlebird', ['littlebirdFilters', 'littlebirdServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/play', {templateUrl: 'partials/phone-list.html',   controller: LittleBirdLevelListCtrl}).
      when('/play/:level', {templateUrl: 'partials/phone-detail.html', controller: LittleBirdLevelDetailCtrl}).
      otherwise({redirectTo: '/play'});
}]);

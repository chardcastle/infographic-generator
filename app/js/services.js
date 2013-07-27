'use strict';

/* Services */

angular.module('littlebirdServices', ['ngResource']).
    factory('Level', function($resource){
  return $resource('phones/:phoneId.json', {}, {
    query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
  });
});

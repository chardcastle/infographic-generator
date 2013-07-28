'use strict';

/* Services */

angular.module('littlebirdServices', ['ngResource']).
    factory('Level', function($resource){
	  return $resource('data/:phoneId.json', {}, {
	    query: {method:'GET', params:{phoneId:'levels'}, isArray:true}
	  });
});


angular.module('infographicServices', ['ngResource']).
    factory('Value', function($resource){

    	
	  return $resource('data.php', {}, {
	    query: {method:'GET', params:{}, isArray:true}
	  });    	
	  // return $resource('data/measurements.json?fdsfsd=fdsfds', {}, {
	  //   query: {method:'GET', params:{}, isArray:true}
	  // });
});

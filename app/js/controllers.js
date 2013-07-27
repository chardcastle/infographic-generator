'use strict';

/* Controllers */

function LittleBirdLevelListCtrl($scope, Level) {
  $scope.levels = Level.query();
  console.log($scope.levels);
  $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];



function LittleBirdLevelDetailCtrl($scope, $routeParams, Level) {
  $scope.level = Level.get({phoneId: $routeParams.level}, function(level) {
    $scope.mainImageUrl = level.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];

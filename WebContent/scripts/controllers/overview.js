'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('OverviewCtrl', function($rootScope, $scope, $http ,$location, $exceptionHandler, AuthenticationService) {
	  	  
	  try {
		  
	  var user = $rootScope.globals.currentUser;
	  $scope.u = user;
	  
	  if ($scope.u.userId > 0) {
		  console.log("userId : "+$scope.u.userId);
		  $scope.data = user;
		  
		  console.log("controller");
			$http.post("http://localhost:8088/LittleLouderServices/post/latest?userid="+$scope.u.userId).
			then(function(response) {
				$scope.p = response.data;
				console.log($scope.p);
			}); 
		  
	  }
	  else if($scope.u.userId < 1) {
	      $location.path('../login');
	  }
	  else {
		  $scope.u = {};
	      $location.path('../login');
	  }
	  
	  }
	  catch(e) {
		  $scope.u = {};
		  $exceptionHandler(e);
	      $location.path('../login');
	  }
	  

	  
	  
	  /*
		console.log("controller");
		$http.get("http://192.168.0.8:8088/WebServices/service/user/").
		then(function(response) {
			$scope.data = response.data;
			console.log($scope.data);
		}); 
		*/
	  
    $scope.submit = function() {

      $location.path('/dashboard');

      return false;
    }
    
    $scope.signout = function() {
    	(function initController() {
	          // reset login status
	          AuthenticationService.ClearCredentials();
	      })();
    	$location.path('../login');

        return false;
    }

  });

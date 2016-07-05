'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($rootScope, $scope, $http, $location, $exceptionHandler, AuthenticationService) {
	  
	  var message;
	  
	  try {
		  
		  var user = $rootScope.globals.currentUser;
		  $scope.u = user;
		  
		  if ($scope.u.userId > 0) {
		      $location.path('/dashboard/overview');
		  }
		  else {

			  (function initController() {
		          // reset login status
		          AuthenticationService.ClearCredentials();
		      })();
		  }
		  
	  }
	  catch(e) {
			  $exceptionHandler(e);

			  (function initController() {
		          // reset login status
		          AuthenticationService.ClearCredentials();
		      })();
	  }
	  
	  
    $scope.test = function() {
    	
    	var userEmail = $scope.email;
    	var userPass = $scope.password;
    	var check = true;
    	    	
    	console.log("Email:"+userEmail+" Pass:"+userPass+" URL: http://localhost:8088/LittleLouderServices/user/login?email="+userEmail+"&password="+userPass);
    	
    	$http.post("http://localhost:8088/LittleLouderServices/user/login?email="+userEmail+"&password="+userPass).
		//$http.post("http://localhost:8088/LittleLouderServices/user/login?email=chandra.prakashg01@gmail.com&password=12345678").
    	then(function(response) {
    		
    		var user1 = response.data;
    		$scope.data = user1[0];
			console.log("user" + user);    		
			console.log("data" + $scope.data);
			console.log("status" + $scope.data.status);
			console.log("userid" + $scope.data.userId);
			
			//for(var user in response.data) {
			var user = $scope.data;
			
					
				console.log("status" + user.status);			
				if(user.status) {

					AuthenticationService.SetCredentials(user);
/*							
					$rootScope.user = {
				              userId : user.userId,
				              name : user.name,
				              email : user.email,
				              phone : user.phone,
				              type : user.type,
				              doj : user.doj,
				              remember : user.remember,
				              status : user.status,
				          };
*/
				    $location.path('/dashboard/overview');
				}
				else {
					check = false;
					message = "INVALID MAIL-ID OR PASSWORD";
					$scope.notification = message;
				}
			//}
			
		},
		function(response) {
			check = false;
			message = "Connection Problem";
			$scope.notification = message;
		});

    }
    /*
    $scope.submit = function() {
    	var userEmail = $scope.email;
    	var userPass = $scope.password;
    	
    	var login = {
    			email : userEmail,
    			password : userPass
    	}
    	
    	console.log("Email:"+userEmail+" Pass:"+userPass+" Login:"+login);
    	
    	$http.post("http://localhost:8088/LittleLouderServices/user/login/", login).
		then(function(response) {
			$scope.data = response.data;
			console.log($scope.data);
			
			if($scope.data.userId == 0) {
				message = "INVALID MAIL-ID OR PASSWORD";
				$scope.notification = message;
			}
			else {
			      $location.path('/dashboard');
			}
			
		});
    } */

  });

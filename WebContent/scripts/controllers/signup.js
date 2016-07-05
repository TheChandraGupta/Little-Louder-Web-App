'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('SignUpCtrl', function($scope, $http, $location) {

    $scope.test = function() {

      $location.path('/login');

      return false;
    }
    
    $scope.submit = function() {

    	var check = false;
    	var message;
    	
    	var userName = $scope.name;
    	var userEmail = $scope.email;
    	var userPhone = $scope.phone;
    	var userPass = $scope.password1;
    	
    	console.log("Name:"+userName+" Email:"+userEmail+" Phone:"+userPhone+" Password:"+userPass+
    			"http://localhost:8088/LittleLouderServices/user/signup?name="+userName+"&email="+userEmail+"&phone="+userPhone+"&password="+userPass);
    	
    	$http.post("http://localhost:8088/LittleLouderServices/user/signup?name="+userName+"&email="+userEmail+"&phone="+userPhone+"&password="+userPass).
    	then(function(response) {
    		
    		var data1 = response.data;
    		$scope.data = data1[0];
    		
    		console.log("user" + user);    		
			console.log("data" + $scope.data);
			console.log("status" + $scope.data.status);
			console.log("userid" + $scope.data.userId);
			
			//for(var user in response.data) {
			var user = $scope.data;
						
				console.log("status" + user.status);			
				if(user.status) {
				      $location.path('/dashboard');
				}
				else {
					check = false;
					message = "USER ALREADY EXIST";
					$scope.notification = message;
				}
    		                                                                                  
    		/*console.log("KEY:"+$scope.status.KEY+" CODE:"+$scope.status.CODE);
    		
    		if($scope.status.CODE) {
    			
			    $location.path('/dashboard');
    		}
    		else {
    			$location.path('/dashboard');
    		}*/
    		
    	},
    	function(response){
			check = false;
			message = "Connection Problem";
			$scope.notification = message;
    	});
    	
    	
    }

  });

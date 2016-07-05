'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('ForgetCtrl', function($scope, $http, $location) {

    $scope.test = function() {

      $location.path('/login');

      return false;
    }
    
    $scope.submit = function() {
    	
    	var check = false;
    	var message;
    	
    	var userEmail = $scope.email;
    	console.log("Email:"+userEmail+
    			"http://localhost:8088/LittleLouderServices/user/forget?email="+userEmail);
    	
    	$http.post("http://localhost:8088/LittleLouderServices/user/forget?email="+userEmail).
    	then(function(response) {

    		var data1 = response.data;
    		$scope.data = data1[0];
    		
    		var status = $scope.data;
    		
    		if(status.CODE) {    	
    			check = true;	
			    $location.path('/login');
    			message = "Please check your mail for password recovery or try again after 15 mins";
    			$scope.notification = message;	
    		}
    		else {
    			check = false;
    			message = "Email-ID doesn't matched any user";
    			$scope.notification = message;
    		}
    		

    	},
    	function(response){
			check = false;
			message = "Connection Problem";
			$scope.notification = message;    		
    	});
    	
    	
    	
    }
    

  });

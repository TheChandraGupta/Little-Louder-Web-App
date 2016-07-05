"use strict";
angular.module("yapp",["ui.router","snap","ngAnimate"]).
config(["$stateProvider","$urlRouterProvider",function(r,t){
	t.when("/dashboard","/login"),
	t.otherwise("/login"),
	r.
	state("base",{
		"abstract":!0,
		url:"",
		templateUrl:"views/base.html"}).
	state("login",{
		url:"/login",
		parent:"base",
		templateUrl:"views/login.html",
		controller:"LoginCtrl"}).
	state("dashboard",{
		url:"/dashboard",
		parent:"base",
		templateUrl:"views/dashboard.html",
		controller:"DashboardCtrl"}).
	state("overview",{
		url:"/overview",
		parent:"dashboard",
		templateUrl:"views/dashboard/overview.html"}).
	state("reports",{
		url:"/reports",
		parent:"dashboard",
		templateUrl:"views/dashboard/reports.html"}).
	state("signup", {
		url:"/signup",
		parent:"base",
		templateUrl:"views/signup.html"}).
	state("forget", {
		url:"/forget",
		parent:"base",
		templateUrl:"views/forget.html"})}]),
					
	angular.module("yapp").	controller("LoginCtrl",["$scope","$location",function(r,t){
		r.submit=function(){
			console.log("SUBMIT")
			t.path("/dashboard") },
		r.log = function(){
				console.log("LOG")
			t.path("/overview")
			console.log("LOG2")
		}}]),
			
	angular.module("yapp").	controller("DashboardCtrl",["$scope","$state",function(r,t){
		r.$state=t}]);
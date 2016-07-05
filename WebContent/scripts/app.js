'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
var states = [
        { name: 'base', state: { abstract: true, url: '', templateUrl: 'views/base.html', data: {text: "Base", visible: false } } },
        { name: 'login', state: { url: '/login', parent: 'base', templateUrl: 'views/login.html', controller: 'LoginCtrl', data: {text: "Login", visible: false } } },
        { name: 'signup', state: { url: '/signup', parent: 'base', templateUrl: 'views/signup.html', controller: 'SignUpCtrl', data: {text: "SignUp", visible: false } } },
        { name: 'forget', state: { url: '/forget', parent: 'base', templateUrl: 'views/forget.html', controller: 'ForgetCtrl', data: {text: "Forget", visible: false } } },
        { name: 'dashboard', state: { url: '/dashboard', parent: 'base', templateUrl: 'views/dashboard.html', controller: 'DashboardCtrl', data: {text: "Dashboard", visible: false } } },
        { name: 'overview', state: { url: '/overview', parent: 'dashboard', templateUrl: 'views/dashboard/overview.html', controller: 'OverviewCtrl', data: {text: "Overview", visible: true } } },
        { name: 'reports', state: { url: '/reports', parent: 'dashboard', templateUrl: 'views/dashboard/reports.html', controller: 'ReportsCtrl', data: {text: "Reports", visible: true } } },
        { name: 'logout', state: { url: '/login', data: {text: "Logout", visible: true }} }
    ];
   
angular.module('yapp', [
                'ui.router',
                'snap',
                'ngAnimate',
                'ngCookies'
            ])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('/signup', '/signup');
            $urlRouterProvider.otherwise('/login');
            
            angular.forEach(states, function (state) {
                $stateProvider.state(state.name, state.state);
            });
        })
        .run(function($rootScope, $location, $cookieStore, $http) {
        	$rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                //$location.path('/dashboard');
            }
     
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                //var restrictedPage = $.inArray($location.path(), ['/login', '/signup']) === -1;
                var restrictedPage = true;
                var loggedIn = $rootScope.globals.currentUser;
                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }
            });
        });

/**
 *  app.js
 *
 * Main container for app - controllers, services, directives ... 
 * Declare module and configure. 
 * Array is the list of modules that myApp depends on. A module can depend on other modules.
 */
var myTodoModule = angular.module('myTodo', ['todoController', 'todoService','ngRoute']);

myTodoModule.config(function($routeProvider, $locationProvider) {
	$routeProvider

		// Home Page Route
		.when('/', {
			templateUrl: './views/home.html',
			controller: 'MainController',
			title: 'Home'
		})

		// About Page Route
		.when('/about', {
			title: 'About',
			templateUrl: './views/about.html'
			// controller: 'MainController'
		})

		.when('/login', {
			title: 'Login',
			templateUrl: './views/login.html',
			controller: 'loginCtrl',
			controllerAs: 'vm'
		})

		.when('/register', {
			title: 'Register',
			templateUrl: './views/register.html',
			controller: 'registerCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo:'/'});

	// use the HTML5 History API
    $locationProvider.html5Mode(true);

});

myTodoModule.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title + ' - MyTodoList';
    });
}]);
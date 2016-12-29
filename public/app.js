/**
 *  app.js
 *
 * Main container for app - controllers, services, directives ... 
 * Declare module and configure. 
 * Array is the list of modules that myApp depends on. A module can depend on other modules.
 */
var myTodoModule = angular.module('myTodo', []);

/*
 Main controller for the app.

 Use controllers to set up the state of the view model and add behavior to it.
 Should only contain business logic and no presentation logic. 

 Recommended to use controllerAs with vm rather than $scope or 'this'. 
 The view model is then visible to the template where the controller is registered with 'ng-controller'
 */
myTodoModule.controller('MainController', function($http) {
	var vm = this;
	vm.formData = {};

	// when landing on page, get all todos and show them
	$http.get('/api/todos')
		.then(function successCallback(data) {
			vm.todos = data;
			console.log(data);
		}, function errorCallback(data) {
			console.log('Error: ' + data);
		});

	// when submitting add, send to node API
	vm.createTodo = function() {
		console.log('Creating', vm.formData);
		$http({
				url: '/api/todos/',
				method: 'POST',
				data: vm.formData
			})
			.then(function successCallback(data) {
				vm.formData = {}; // clear the form
				vm.todos = data;
				console.log(data);
			}, function errorCallback(data) {
				console.log('Error: ' + data);
			});

	};

	vm.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.then(function successCallback(data) {
				vm.todos = data;
				console.log(data);
			}, function errorCallback(data) {
				console.log('Error: ' + data);
			});

	};
});
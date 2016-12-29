/*
 Main controller for the app.

 Use controllers to set up the state of the view model and add behavior to it.
 Should only contain business logic and no presentation logic. 

 Recommended to use controllerAs with vm rather than $scope or 'this'. 
 The view model is then visible to the template where the controller is registered with 'ng-controller'
 */
angular.module('todoController', [])
	.controller('MainController', function($http, todo) {
		var vm = this;
		vm.formData = {};

		// when landing on page, get all todos and show them
		todo.get()
			.then(function successCallback(data) {
				vm.todos = data;
				console.log(data);
			}, function errorCallback(data) {
				console.log('Error: ' + data);
			});

		// when submitting add, send to node API
		vm.createTodo = function() {
			if (!$.isEmptyObject(vm.formData)) {
				todo.create(vm.formData)
					.then(function successCallback(data) {
						vm.formData = {}; // clear the form
						vm.todos = data;
						console.log(data);
					}, function errorCallback(data) {
						console.log('Error: ' + data);
					});
			}

		};

		vm.deleteTodo = function(id) {
			todo.delete(id)
				.then(function successCallback(data) {
					vm.todos = data;
					console.log(data);
				}, function errorCallback(data) {
					console.log('Error: ' + data);
				});

		};

	});
/**
*  todoService
*
* Will interact with Node API
*/
angular.module('todoService', [])

	.factory('todo', ['$http', 'authentication' ,function($http, authentication){
		return {
			get : function() {
				var config = {
					params: {id: authentication.currentUser().id},
					headers: {'Accept' : 'application/json'}
				};

				return $http.get('/api/todos', config);
			},
			create : function(todoData) {
				console.log('User is', authentication.currentUser());
				todoData.id = authentication.currentUser().id;
				console.log('Data is', todoData);

				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				var config = {
					params: {id: authentication.currentUser().id},
					headers: {'Accept' : 'application/json'}
				};

				return $http.delete('/api/todos/' + id, config);
			}
		};
	}]);
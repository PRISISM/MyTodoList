/**
 *  authenticationService
 *
 * Functions that will manage the JWT and user authentication
 */
(function() {

	angular
		.module('myTodo')
		.service('authentication', authentication);

	authentication.$inject = ['$http', '$window'];

	function authentication($http, $window) {

		var saveToken = function(token) {
			$window.localStorage['mean-token'] = token;
		};

		var getToken = function() {
			return $window.localStorage['mean-token'];
		};

		var isLoggedIn = function() {
			var token = getToken();
			console.log($window.localStorage, token);
			var payload;

			if (token) {

				payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);

				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		var currentUser = function() {
			if (isLoggedIn()) {
				var token = getToken();
				console.log(token);
				var payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);
				console.log(payload);
				return {
					id: payload._id,
					username: payload.username,
					name: payload.name
				};
			}
		};

		register = function(user) {
			return $http.post('/api/register', user).then(function successCallback(data) {
				saveToken(data.data.token);
				$window.location.reload();

			}, function errorCallback(data) {
				console.log('Error: ' + data);
			});
		};

		login = function(user) {
			return $http.post('/api/login', user).then(function successCallback(data) {
				console.log(data);
				saveToken(data.data.token);
				$window.location.reload();
			}, function errorCallback(data) {
				console.log('Error ' + data);
			});
		};


		logout = function() {
			$window.localStorage.removeItem('mean-token');
			$window.location.reload();
		};

		return {
			currentUser: currentUser,
			saveToken: saveToken,
			getToken: getToken,
			isLoggedIn: isLoggedIn,
			register: register,
			login: login,
			logout: logout

		};
	}

})();
(function () {

  angular
  .module('myTodo')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      username : "",
      password : ""
    };

    vm.onSubmit = function () {
      authentication
        .login(vm.credentials)
        // .error(function(err){
        //   alert(err);
        // })
        .then(function(){
    		$location.path('home');

        });
    };

    vm.logout = function() {
    	authentication
    	.logout()
    	.then(function() {
    		$location.path('home');
    	});
    };

  }

})();

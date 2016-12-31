(function () {

  angular
    .module('myTodo')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication'];
  function navigationCtrl($location, authentication) {
    var vm = this;
    var logoutMessage = 'Logout';

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    console.log(vm.isLoggedIn, vm.currentUser);
   	
   	vm.logout = function() {
   		authentication.logout();
   		$location.path('/home');
   	};

  }

})();

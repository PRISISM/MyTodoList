(function () {

  angular
    .module('myTodo')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      username : "",
      password : ""
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
      // .error(function(err){
      //   alert(err);
      // })
        .then(function(){
          $location.path('home');
        });
    };

  }

})();

(function() {
    angular.module('ChatApp')
        .controller('loginController', loginController);
    loginController.$inject = ['$scope'];

    function loginController($scope) {
    	$scope.createUser = createUser;
    	$scope.loginUser = loginUser;
    	$scope.isRegistered = true;




    }
})();
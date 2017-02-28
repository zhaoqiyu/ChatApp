(function() {
    angular.module('ChatApp')
        .controller('loginController', loginController);
    loginController.$inject = ['$scope'];

    function loginController($scope, $http) {
    	var socket = io();
    	var id = Math.random() * 10000 *

    	$scope.createUser = createUser;

    	function createUser(){

				$scope.username
    	}

    }
})();
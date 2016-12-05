//I will use snake_case here for functions

'use strict';

(function(){
	angular
		.module('app')
		.controller('TwitterCtrl', TwitterCtrl);

	TwitterCtrl.$inject = ['$scope', '$window', 'TwitterService'];

	function TwitterCtrl($scope, $window, TwitterService) {
		
		$scope.data = {
			fullname: "",
			handle: "",
			password: "",
			email: "",
			followers: 0
		}

		$scope.sign_in = function(){
			$scope.sign_in_clicked = function(){
				const data = {
					handle: $scope.log_username,
					password: $scope.log_password
				}

				console.log(data);
				TwitterService
					.signIn(data)
					.then(function(res){
						if (res.value != 0){
							console.log(res);
							$scope.user = res;
							console.log($scope.user);
							$window.location.href = '/#/home';
						}
						else{
							alert(res.message);
							$window.location.href = '/#/sign_in';
						}
					}, function(err){
						$window.location.href = '/#/sign_in';

					})
			}
		}

		$scope.create_account = function(){
			$scope.clicked = function(){	
				const data = {
					fullname: $scope.fullname,
					handle: $scope.username,
					email: $scope.email,
					password: $scope.password,
					followers: 0
				}

				console.log(data);
				TwitterService
					.createAccount(data)
					.then(function(res) {
						if(res.status != 500){
		            		alert(res.message);
		            		$window.location.href = '/#/sign_in';
		            	}else{
		            		alert(res.statusText);
		            		$window.location.href = '/#/sign_in';
		            	}
	                }, function(err) {
	                    console.log(err);
	                    alert(err.statusText);
	                })
			}
		}

		$scope.sign_out = function(){
			$scope.sign_out_clicked = function(){
				TwitterService
					.signOut()
					.then(function(res){
						$window.location.href = '/#/sign_in';
					}, function(err){
						alert(err);
					})
			}
		}


	}
})();
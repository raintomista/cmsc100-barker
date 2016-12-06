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
			followers: 0,
			tweet: ""
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
						 console.log(res);
						$window.location.href = '/#/sign_in';
					}, function(err){
						alert(err.statusText);
					})
			}
		}

		$scope.get_tweets = function(){
			TwitterService
				.getTweets()
				.then(function(res){
					console.log(res);
					$scope.tweets = res;
				}, function(err){
					alert(err.statusText);
				})
		}

		$scope.get_logged = function(){
			TwitterService
				.getLogged()
				.then(function(res){
					$scope.user_logged = res;
					console.log(res);
				}, function(err){
					alert(err.statusText);
				})
		}

		$scope.get_logged_info = function(){
			TwitterService
				.getLoggedInfo()
				.then(function(res){
					$scope.user_info = res[0];
					console.log(res);
				}, function(err){
					alert(err.statusText);
				})
		}

		$scope.post_tweet = function(){
			$scope.post_tweet_clicked = function(){
				const data = {
					tweet: $scope.tweet
				}

				console.log(data);
				TwitterService
					.postTweet(data)
					.then(function(res){
						alert(res.message);
						$window.location.href = '/#/home';
					}, function(err){
						alert(err.statusText);
					})
			}
		}



	}
})();
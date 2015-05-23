(function() {
	'use strict';

	var randomUser = angular.module('randomUser', ['ngRoute']);

	//--

	randomUser.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				template: getHtml('index'),
				controller: 'mainController'
			})
			.when('/p:num', {
				template: getHtml('index'),
				controller: 'mainController'
			});
	});
	
	// mainController	
	randomUser.controller('mainController', function($scope, $http, $routeParams) {
		$scope.spiner = true;

		console.log($routeParams.num);

		// http://stackoverflow.com/a/6078873/3906986
		$scope.parseDate = function timeConverter(UNIX_timestamp){
			var a = new Date(UNIX_timestamp*1000);
			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			var year = a.getFullYear();
			var month = months[a.getMonth()];
			var date = a.getDate();
			var hour = a.getHours();
			var min = a.getMinutes();
			var sec = a.getSeconds();
			var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
			return time;
		};

		//--

	    $http.get('http://api.randomuser.me/?results=100').then(function(res) {
          $scope.users = res.data.results;    
          $scope.spiner = false;           
        });
	});
	
	// -- end mainContriller

	function getHtml(id) {
		return document.getElementById(id).innerHTML;
	}

})();
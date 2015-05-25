(function() {
	'use strict';

	var randomUser = angular.module('randomUser', ['ngRoute']);
	var usersArr = [];

	//--

	randomUser.service('Users', function($q, $http) {
		var get = function() {
    		var deferred = $q.defer();
    		$http.get('http://api.randomuser.me/?results=100').then(function(res) {
          		angular.forEach(res.data.results, function(el, n){
     				usersArr.push({
     					f_name:    (el.user.name.first || 'none'),
     					l_name:    (el.user.name.last || 'none'),
     					username:  (el.user.username || 'none'),
     					email:     (el.user.email || 'none'),
     					thumbnail: (el.user.picture.thumbnail || 'img/def.jpg'),
     					b_day: 	   (el.user.dob || 0)
     				});
				});
				deferred.resolve();
          	});
    		return deferred.promise;
    	};

	    return {get: get};
	});

	randomUser.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				template: getHtml('index'),
				controller: 'pageController'
			})
			.when('/p:num', {
				template: getHtml('index'),
				controller: 'pageController',
				// resolve: {
				// 	randomUser: function($q) {
				// 		defer = $q.defer();
				// 		return defer.promise;
				// 	}
				// }
			});
	});
	
	// mainController	
	randomUser.controller('mainController', function($scope, $http) {
		$scope.spiner = true;


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

	   
	});
	
	// -- end mainContriller


	// mainController	
	randomUser.controller('pageController', function($scope, $http, $routeParams, Users) {
		var page = $routeParams.num || 1;

		if(!usersArr.length) {
			var promise = Users.get();

			promise.then(function() {
				$scope.spiner = false;
				$scope.users = usersArr.slice(0,5);
				console.log(usersArr.slice(0,5));
			});
		} else {
			$scope.spiner = false;
			$scope.users = usersArr.slice(0,5);
		}

		
		console.log(page);

		var per_page = 5;
		var pageCount = Math.floor(usersArr.length/5);

		$scope.page_prev = 'p'+1;
		$scope.page_next = 'p'+2;

	});


	// helpers func
	function getHtml(id) {
		return document.getElementById(id).innerHTML;
	}

})();
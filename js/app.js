(function() {
	'use strict';

	var randomUser = angular.module('randomUser', ['ngRoute']);
	var usersArr = [];

	//--

    randomUser.service('Users', function($q, $http) {
		var get = function() {
			var deferred = $q.defer();
			$http.get('http://api.randomuser.me/?results=99').then(function(res) {
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
			});
	});
	
	// mainController	
	randomUser.controller('mainController', ['$scope', '$http', function($scope, $http) {
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

	}]);
	
	// -- end mainContriller


	// pageController	
	randomUser.controller('pageController', function($scope, $http, $routeParams, Users, $filter) {
		var orderBy = $filter('orderBy');
		var page = parseInt($routeParams.num) || 1;
		var per_page = 8;

		// --

		if(!usersArr.length) {
			var promise = Users.get();

			promise.then(function() {
				getUsers(page, per_page);				
			});
		} else {
			getUsers(page, per_page);
		}

		// --

		function getUsers(page, per_page) {
			$scope.spiner = false;
			var page_count = Math.round(usersArr.length/5);
			var offset = (page-1)*per_page;



			$scope.users = usersArr.slice(offset,(offset+per_page));

			$scope.order = function(predicate, reverse) {
    			$scope.users = orderBy($scope.users, predicate, reverse);
  			};

  			$scope.orderAll = function(predicate, reverse) {
    			usersArr = orderBy(usersArr, predicate, reverse);
    			$scope.users = usersArr.slice(offset,(offset+per_page));
  			};

  			$scope.order('f_name',false);

			$scope.page_prev = 'p'+(page == 1?page:page-1);
			$scope.page_next = 'p'+(page >= page_count?page:page+1);
		}

	});


	// helpers func
	function getHtml(id) {
		return document.getElementById(id).innerHTML;
	}

})();
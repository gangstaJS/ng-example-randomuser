'use strict';

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
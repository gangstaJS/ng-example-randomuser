(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])
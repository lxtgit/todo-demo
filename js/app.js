(function (angular) {
	'use strict';

	var app = angular.module('app',['ngRoute','app.controller.main']);
	app.config(['$routeProvider',function($routeProvider){
    	$routeProvider
    	.when('/:status?',{
    		controller:'MainController',
    		templateUrl:'route_tmpl'
    	})
    }]);

})(angular);

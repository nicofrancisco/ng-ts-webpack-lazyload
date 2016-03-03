
(function(){

	var mod = module.exports = angular.module('bar', []);
	module.exports = mod;

	// require('./bar.scss');
	require('./other-file.js');
	
	mod.controller('BarController', ['$scope', barController]);

	function barController($scope) {
		console.log('bar controller');

		this.testVar = 'controller variable';

		this.clickFunc = function() {
			console.log('click event123');
		}

	}

}());

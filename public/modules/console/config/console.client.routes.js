'use strict';

// Setting up route
angular.module('console').config(['$stateProvider',
	function($stateProvider) {
		// Console state routing
		$stateProvider.
		state('viewConsole', {
			url: '/console',
			templateUrl: 'modules/console/views/view-console.client.view.html'
		})
	}
]);
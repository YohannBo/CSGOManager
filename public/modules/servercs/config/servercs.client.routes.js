'use strict';

// Setting up route
angular.module('servercs').config(['$stateProvider',
	function($stateProvider) {
		// Servercs state routing
		$stateProvider.
		state('listServercs', {
			url: '/servercs',
			templateUrl: 'modules/servercs/views/list-servercs.client.view.html'
		}).
		state('createServercs', {
			url: '/servercs/create',
			templateUrl: 'modules/servercs/views/create-servercs.client.view.html'
		}).
		state('viewServercs', {
			url: '/servercs/:servercsId',
			templateUrl: 'modules/servercs/views/view-servercs.client.view.html'
		}).
		state('editServercs', {
			url: '/servercs/:servercsId/edit',
			templateUrl: 'modules/servercs/views/edit-servercs.client.view.html'
		});
	}
]);
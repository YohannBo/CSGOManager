'use strict';

//Servercs service used for communicating with the servercs REST endpoints
angular.module('servercs').factory('Servercs', ['$resource',
	function($resource) {
		return $resource('servercs/:servercsId', {
			servercsId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
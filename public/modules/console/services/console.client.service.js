'use strict';

//Console service used for communicating with the servercs REST endpoints
angular.module('console').factory('ConsoleService', ['$resource',
	function($resource) {
		return $resource('/rcon', null, {
			sendCmd: {
				method: 'POST'
			}
		});
	}
]);
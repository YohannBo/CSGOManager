'use strict';

// Configuring the Servercs module
angular.module('servercs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Server CS', 'servercs', 'item', '/servercs');
	}
]);

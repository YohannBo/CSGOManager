'use strict';

// Configuring the console module
angular.module('console').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Console', 'console', 'item', '/console');
	}
]);

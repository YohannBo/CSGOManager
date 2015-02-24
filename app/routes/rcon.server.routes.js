'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	rcon = require('../../app/controllers/rcon.server.controller');

module.exports = function(app) {
	// RCON Routes
	app.route('/rcon')
		.post(users.requiresLogin, rcon.sendCmd);
};

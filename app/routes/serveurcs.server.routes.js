'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	servercs = require('../../app/controllers/servercs.server.controller');

module.exports = function(app) {
	// Server CS Routes
	app.route('/servercs')
		.get(servercs.list)
		.post(users.requiresLogin, servercs.create);

	app.route('/servercs/:servercsId')
		.get(servercs.getOne)
		.put(users.requiresLogin, servercs.update)
		.delete(users.requiresLogin, servercs.delete);

	// Finish by binding the server middleware
	app.param('servercsId', servercs.servercsByID);
};
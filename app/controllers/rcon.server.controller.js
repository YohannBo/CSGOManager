'use strict';

/**
 * Module dependencies.
 */
var errorHandler = errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
    ServerCS = mongoose.model('Servercs'),
	Rcon = require('../tools/rcon');

/**
 * Send a command
 */
exports.sendCmd = function(req, res) {
	var ip = req.body.ip;
	var port = req.body.port;
	var pwd = req.body.pwd;
	var cmd = req.body.cmd;

	// TODO : Authentication
	/*var rcon = new Rcon({
		address: ip + ':' + port,
		password: pwd,
		initCvars: false
	});
	
	// TODO : Send cmd
	rcon.connect(function() {
		rcon.runCommand(cmd, function(err, res) {
			console.log(cmd);
			
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json({success: true});
			}
		});
	});*/
	res.json({success: true});
};

/**
 * ServerCS middleware
 */
/*exports.servercsByID = function(req, res, next, id) {
	ServerCS.findById(id).exec(function(err, servercs) {
		if (err) return next(err);
		if (!servercs) return next(new Error('Failed to load servercs ' + id));
		req.servercs = servercs;
		next();
	});
};*/

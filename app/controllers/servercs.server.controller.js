'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ServerCS = mongoose.model('Servercs'),
	_ = require('lodash');

/**
 * Create a server CS
 */
exports.create = function(req, res) {
	var servercs = new ServerCS(req.body);

	servercs.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(servercs);
		}
	});
};

/**
 * Update a server CS
 */
exports.update = function(req, res) {
	var servercs = req.servercs;

	servercs = _.extend(servercs, req.body);

	servercs.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(servercs);
		}
	});
};

/**
 * Delete a server CS
 */
exports.delete = function(req, res) {
	var servercs = req.servercs;

	servercs.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(servercs);
		}
	});
};

/**
 * Show the current server
 */
exports.getOne = function(req, res) {
	res.json(req.servercs);
};

/**
 * List of servers CS
 */
exports.list = function(req, res) {
	ServerCS.find().exec(function(err, servercs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(servercs);
		}
	});
};

/**
 * ServerCS middleware
 */
exports.servercsByID = function(req, res, next, id) {
	ServerCS.findById(id).exec(function(err, servercs) {
		if (err) return next(err);
		if (!servercs) return next(new Error('Failed to load servercs ' + id));
		req.servercs = servercs;
		next();
	});
};
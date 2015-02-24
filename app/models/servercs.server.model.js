'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var visibilities = 'public,private'.split(',');
var serverTypes = 'sourceTv,dedicated server,non dedicated server'.split(',');

/**
* Player Schema
*/
var playerSchema = new Schema({
	index: {
		type: Number,
		default: 0
	},
	playerName: {
		type: String,
		trim: true
	},
	score: {
		type: Number,
		default: 0
	},
	duration: {
		type: Number,
		default: 0
	}
});

/**
 * Server CS Schema
 */
var ServercsSchema = new Schema({
	ip: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in a username',
		match: [/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, 'Please fill a valid IP']
	},
	port: {
		type: Number,
		default: 27015,
		required: 'Please fill in a port'
	},
	status: {
		type: Boolean,
		default: false
	},
	lastUpdate: {
		type: Date
	},
	serverName:{
		type: String
	},
	nbrPlayers: {
		type: Number
	},
	nbrPlayersMax: {
		type: Number
	},
	map: {
		type: String,
		trim: true
	},
	nbrBots: {
		type: Number
	},
	visibility: {
		type: String,
		enum: visibilities
	},
	srvType: {
		type: String,
		enum: serverTypes
	},
	secureVac: {
		type: Boolean,
		default: false
	},
	gameVersion: {
		type: String,
		default: '0.0.1'
	},
	players: [playerSchema]
});

mongoose.model('Servercs', ServercsSchema);

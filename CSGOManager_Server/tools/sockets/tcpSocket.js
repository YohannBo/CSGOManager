var Net = require('net');
var EventEmitter = require('events').EventEmitter;
var Log = require('../util.js').log;

module.exports = RconSocket;

function RconSocket(params) {
	this._host = params.host;
	this._port = params.port;
	this._connection = null;
	Log('TCP Socket', params);
};

RconSocket.prototype.__proto__ = EventEmitter.prototype;
RconSocket.prototype.connect = function(cb) {
	var self = this;
	Log('Initializing TCP connection to ' + this._host + ':' + this._port)
	
	this._connection = Net.createConnection( {
		host: this._host,
		port: this._port
	}, cb);
	
	this._connection.on('connect', function() {
		Log('TCP connection established');
		self.emit('connect');
	});

	this._connection.on('error', function(err) {
		Log('TCP connection error', err);
		self.emit('error', err);
	});

	this._connection.on('data', function(data) {
		self.emit('data', data);
	});
};

RconSocket.prototype.write = function(buffer, cb) {
	Log('Sending TCP data', buffer);
	this._connection.write(buffer, cb);
};

RconSocket.prototype.disconnect = function(cb) {
	this._connection.end();
	setImmediate(cb);
};
RconSocket.prototype.destroy = function(cb) {
	this._connection.destroy();
	setImmediate(cb);
};
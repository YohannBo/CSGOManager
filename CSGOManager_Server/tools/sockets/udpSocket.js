var dgram = require('dgram');
var EventEmitter = require('events').EventEmitter;
var Log = require('../util.js');

module.exports = ServerQuerySocket;

function ServerSocket(params){
	this.host = params.host;
	this.port = params.port;
	this.connection = null;
	Log('UDP Socket');
};

ServerQuerySocket.prototype.__proto__ = EventEmitter.prototype;

ServerQuerySocket.prototype.connect = function(cb){
	var self = this;
	Log('Initialize UDP connection to ' + this.host + ':' + this.port);
	
	this.connection = dgram.createSocket('udp4', cb);
	
	socket.on('message', function(msg, rinfo) {
		Log('Received %d bytes from %s:%d\n', msg.length, rinfo.address, rinfo.port);
	});
	
	socket.on('listening', function() {
		var address = server.address();
		Log('UDP connection listening' + address.address + ":" + address.port);
	});
	
	socket.on('close', function() {
		Log('close connection to %s:%d',rinfo.address, rinfo.port);
	});
	
	socket.on('close', function(err) {
		Log('UDP connection error : %s',err.stack);
		this.connection.close();
	});
	
	socket.bind({
	  address: this.host,
	  port: this.port,
	  exclusive: true
	});
};

ServerQuerySocket.prototype.write = function(buffer, cb){
	Log('Sending UDP data', buffer);
	this.connection.send(buffer, 0, buffer.length, this.port, this.host, cb);
};

ServerQuerySocket.prototype.disconnect = function(cb) {
	this.connection.close();
	setImmediate(cb);
};




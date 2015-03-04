var serverQueryRequest = require('../packets/serverQueryRequest.js');
var ServerQuerySocket = require('../sockets/udpSocket.js');
var EventEmitter = require('events').EventEmitter;
var Log = require('../util.js').log;

module.exports = ServerQueryProtocol;

function ServerQueryProtocol() {
	this.ServerQuerySocket = null;
	this.packetId = 0;
	this.connected = false;
	this.challenge = {};
}

ServerQueryProtocol.prototype.__proto__ = EventEmitter.prototype;

ServerQueryProtocol.prototype.connect = function(server, cb) {
	var self = this;
	this.ServerQuerySocket = new ServerQuerySocket(server);
	
	this.ServerQuerySocket.connect(function(err) {
		if(err) {
			return cb(err);
		}
		
		self.ServerQuerySocket.on('error', function(err) {
			// Connection errors cannot be recovered on the same object
			err.fatal = true;
			self.emit(err);
		});
	});
	
	this.ServerQuerySocket.on('message', function(data) {
		//var res = new RconResponse(data);
		//self.emit(res.id.toString(10), res);
	});
	
	this.ServerQuerySocket.once('error', onError);
	
	function onError(err) {
		err.fatal = true;
		cb(err);
	}
};

ServerQueryProtocol.prototype.SendRequest = function(requestType, cb) {
	
}

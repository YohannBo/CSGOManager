var RconRequest = require('../packets/rconRequest.js');
var RconResponse = require('../packets/rconResponse.js');
var RconSocket = require('../sockets/tcpSocket.js');
var EventEmitter = require('events').EventEmitter;
var Log = require('../util.js').log;

module.exports = RconProtocol;

function RconProtocol() {
	this.rconSocket = null;
	this.packetId = 0;
	this.connected = false;
	this.queue = {};
}

RconProtocol.prototype.__proto__ = EventEmitter.prototype;

RconProtocol.prototype.connect = function(server, password, cb) {
	var self = this;
	this.rconSocket = new RconSocket(server);
	
	this.rconSocket.connect(function(err) {
		if(err) {
			return cb(err);
		}
		Log('Sending rcon password', password);
		var reqId = self.request(password, 'SERVERDATA_AUTH');
		
		self.once('-1', function(data) {
			self.removeAllListeners('1');
			cb.call(self, {code: 'WRONG_PASSWORD'});
		});
		
		self.once(reqId, function(res) {
			self.removeAllListeners('-1');
			cb.call(self);
		});
		
		self.rconSocket.on('error', function(err) {
			// Connection errors cannot be recovered on the same object
			err.fatal = true;
			self.emit(err);
		});
	});
	
	this.rconSocket.on('data', function(data) {
		var res = new RconResponse(data);
		self.emit(res.id.toString(10), res);
	});
	
	this.rconSocket.once('error', onError);
	
	function onError(err) {
		err.fatal = true;
		cb(err);
	}
};

RconProtocol.prototype.exec = function(command, cb) {
	var self = this;
	var reqId = this.request(command);
	var ackId = this.request('', 'SERVERDATA_RESPONSE_VALUE');
	
	this.on(reqId, parseRequest);
	
	this.once(ackId, function() {
		this.removeListener(reqId, parseRequest);
		var res = self.queue[reqId];
		delete self.queue[reqId];
		cb.call(self, null, res);
	});

	function parseRequest(req) {
		if(self.queue[reqId]) {
			return self.queue[reqId] += req.body;
		}
		self.queue[reqId] = req.body;
	}
};

RconProtocol.prototype.request = function(content, type, id) {
	var self = this;
	var id = id || this.getNextPacketId();
	Log('Sending packet', id);
	
	this.rconSocket.write(new RconRequest( {
		id: id,
		type: type || 'SERVERDATA_EXECCOMMAND',
		body: content
		}).buffer, function(err) {
			if(err) {
			Log('Error sending packet', id);
			self.emit('error', err);
			return;
		}
		Log('Sent packet', id);
	});
	return id.toString(10);
};

RconProtocol.prototype.getNextPacketId = function() {
	return this.packetId += 1;
};

RconProtocol.prototype.disconnect = function(cb) {
	this.rconSocket.destroy(cb);
};
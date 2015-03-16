var serverQueryRequest = require('../packets/serverQueryRequest.js');
var serverQueryResponse = require('../packets/serverQueryResponse.js');
var ServerQuerySocket = require('../sockets/udpSocket.js');
var EventEmitter = require('events').EventEmitter;
var Log = require('../util.js').log;

module.exports = ServerQueryProtocol;

function ServerQueryProtocol() {
	this.socket = null;
	this.packetId = 0;
	this.connected = false;
	this.requestsChallenge = {};
	this.requests = {};
}

ServerQueryProtocol.prototype.__proto__ = EventEmitter.prototype;

ServerQueryProtocol.prototype.connect = function(server, cb) {
	var self = this;
	this.socket = new ServerQuerySocket(server);
	
	this.socket.connect(function(err) {
		if(err) {
			return cb(err);
		}

		self.socket.on('error', function(err) {
			err.fatal = true;
			self.emit(err);
		});
	});
	
	this.socket.on('message', function(data) {
		this.getResponse(data);
	});
	
	this.socket.once('error', onError);
	
	function onError(err) {
		err.fatal = true;
		cb(err);
	}
};

ServerQueryProtocol.prototype.query = function(requestType, cb) {
	if(requestType.type != undefined){
		var queryType = ServerQueryProtocol[requestType.type];
		
		// Create packet
		var buffer = serverQueryRequest(queryType);
		// Send packet
		if(queryType.challenge)
			this.sendRequest(buffer, queryType, false, cd);
		else
			this.sendRequest(buffer, queryType, true, cd);
	}
	else{
		return cb("Request type not found !");
	}
}

ServerQueryProtocol.prototype.sendRequest = function(requestBuffer, queryType, lastRequest, cb) {
	self = this;
	this.socket.write(requestBuffer, function(err) {
		if(err) {
			return cb(err);
		}
		
		if(queryType.challenge && !lastRequest){
			self.requestsChallenge.push( {
				item : queryType,
				cb : cb
			});
		}
		else{
			self.requests.push( {
				item : queryType,
				cb : cb
			});
		}
	});
}

ServerQueryProtocol.prototype.getResponse = function(responseBuffer) {
	var response = serverQueryResponse(responseBuffer);
	var header = response.readInt8(0);
	var action;
	if(header == ServerQueryProtocol.ChallengeResponseHeader){
		action = this.requestsChallenge.shift();
		action.item.challenge = response.readInt32LE(1);
		var buffer = serverQueryRequest(action.item);
		this.sendRequest(buffer, action.item, true, action.cb);
	}
	else{
		action = this.requests.shift();
		action.cb(response);
	}
};

ServerQueryProtocol.ChallengeResponseHeader = 0x41;

ServerQueryProtocol.A2SInfoRequest = {
	header : 0x54,
	payload : 'Source Engine Query'
};

ServerQueryProtocol.A2SPlayerRequest = {
	header : 0x55,
	challenge : -1
};

ServerQueryProtocol.A2SPingRequest = {
	header : 0x69
};

ServerQueryProtocol.A2SChallengeRequest = {
	header : 0x57
};




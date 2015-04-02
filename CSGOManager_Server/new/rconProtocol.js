var tcpSocket = require("tcpSocket");
var util = require("util");
var rconRequest = require("rconRequest");
var rconResponse = require("rconResponse");
var eventEmitter = require('events').EventEmitter;

module.exports = RconProtocol;

function RconProtocol(addr, port, rconPwd){
	eventEmitter.call(this);
	this.addr = addr;
	this.port = port;
	this.rconPwd = rconPwd;
	this.socket = null;
	this.reqIdCpt = 0;
	this.queue = {}.
};

util.inherits(RconProtocol, eventEmitter);

RconProtocol.prototype.connect(cb){
	this.socket = new tcpSocket(this.addr, this.port);

	this.socket.connect(function(err){
		if(err){
			return cb(err);
		}
		
		var reqAuthId = exec(RconProtocol.SERVERDATA_AUTH, this.rconPwd);

		this.once('-1', function(data) {
			this.removeAllListeners();
			return cb({code: 'WRONG_PASSWORD'});
		});
	
		this.once(reqAuthId, function(res) {
			this.removeAllListeners('-1');
			return cb();
		});
	});
	
	this.socket.on("connect", function(){
		util.log("RconProtocol >> RCON connection is successfully established");
	});
	
	this.socket.on("error", function(err){
		util.log("RconProtocol >> Rcon connection error : " + err);
		return cb(err);
	});
	
	this.socket.on("close", function(err){
		if(err){
			return cb(err);
		}
		util.log("RconProtocol >> Rcon connection is successfully disconnected !");
	});
	
	this.socket.on("data", function(msg){
		var res = new rconResponse(msg);
		util.log("RconProtocol >> Rcon connection receive this message : " + res);
		this.emit(res.id.toString(10), res);
	});
};

RconProtocol.prototype.senCmd(cmd, cb){
	var reqId = exec(RconProtocol.SERVERDATA_EXECCOMMAND, cmd);
	var ackId = exec(RconProtocol.SERVERDATA_RESPONSE_VALUE, '');
	
	this.on(reqId, parseRequest);
	
	this.once(ackId, function(res) {
		this.removeListener(reqId, parseRequest);
		var res = self.queue[reqId];
		delete this.queue[reqId];
		return cb(null, res);
	});
	
	function parseRequest(req) {
		if(this.queue[reqId]) {
			return this.queue[reqId] += req.body;
		}
		this.queue[reqId] = req.body;
	}
};

RconProtocol.prototype.disconnect = function(cb) {
	this.socket.destroy(cb);
};

function exec(type, body){
	var reqId = getNextId();
	var request = new rconRequest(reqId, type, body);
	this.socket.write(request, function(err) {
		if(err) {
			util.log("RconProtocol >> Error sending packet" + reqId);
			self.emit('error', err);
			return;
		}
		util.log("RconProtocol >> Sent packet" + reqId);
	});
	return reqId;
};

function getNextId(){
	return this.reqIdCpt += 1;
};

RconProtocol.SERVERDATA_AUTH = 0x03;
RconProtocol.SERVERDATA_AUTH_RESPONSE = 0x02;
RconProtocol.SERVERDATA_EXECCOMMAND = 0x02;
RconProtocol.SERVERDATA_RESPONSE_VALUE = 0x00;

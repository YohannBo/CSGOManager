var net = require('net');
var eventEmitter = require('events').EventEmitter;
var util = require("util");

module.exports = TcpSocket;

function TcpSocket(addr, port){
	eventEmitter.call(this);
	this.addr = addr;
	this.port = port;
	this.connection = null;
};

util.inherits(TcpSocket, eventEmitter);

TcpSocket.prototype.connect(cb){
	
	this.connection = net.createConnection(this.port, this.addr, cb);
	
	this.conection.on("connect", function(){
		util.log("TcpSocket >> connection is successfully established");
		this.emit('connect');
	});
	
	this.conection.on("error", function(err){
		util.log("TcpSocket >> Error : \n" + err.stack);
		this.disconnect();
		this.destroy();
		this.emit('error', err);
	});
	
	this.connection.on("data", function(msg){
		util.log("TcpSocket >> Server got: " + msg);
		this.emit('data', msg);
	});
	
	this.connection.on("close", function(had_error){
		if(had_error != null){
			util.log("TcpSocket >> Server end with an error : " + had_error);
			this.emit('error', had_error);
		}
		util.log("TcpSocket >> server disconnected");
		this.emit('close');
	});
};

TcpSocket.prototype.write = function(buffer, cb) {
	util.log('TcpSocket >> Sending TCP data', buffer);
	this.connection.write(buffer, cb);
};

TcpSocket.prototype.disconnect = function() {
	util.log('TCP socket disconnected');
	this.connection.end();
};

TcpSocket.prototype.destroy = function() {
	util.log('TCP socket destroyed');
	this.connection.destroy();
};
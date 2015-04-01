var socket = require('dgram');
var eventEmitter = require('events').EventEmitter;
var util = require("util");

module.exports = UdpSocket;

function UdpSocket(addr, port){
	eventEmitter.call(this);
	this.addr = addr;
	this.port = port;
	this.connection = null;
};

util.inherits(UdpSocket, eventEmitter);

UdpSocket.prototype.connect(){
	this.socket.bind({
		addresse: this.addr,
		port: this.port
	});
	
	this.connection = socket.creatSocket('udp4');
	
	this.connection.on("error", function(err){
		util.log("Server error : \n" + err.stack);
		this.disconnect();
		this.emit('error', err);
	});
	
	this.connection.on("message", function(msg, rinfo){
		util.log("Server got: " + msg + " from" + rinfo.address + ":" + rinfo.port);
		this.emit('message', msg);
	});
	
	this.connection.on("listening", function(){
		var address = server.address();
		util.log("server listening " + address.address + ":" + address.port);
		this.emit('listening', msg);
	});
	
	this.connection.on("close", function(){
		util.log("server disconnected");
		this.emit('close', msg);
	});
};

UpdSocket.prototype.disconnect(){
	this.connection.close();
};

UdpSocket.prototype.sendMsg(msg){
	this.connection.send(msg, 0, msg.length, function(err){
		this.disconnect();
	});
};
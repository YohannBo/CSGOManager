var util = require("util");
var rconProtocol = require("rconProtocol");

function Rcon(addr, port, pwd){
	this.addr = addr;
	this.port = port;
	this.pwd = pwd;
	this.connected = false;
	this.protocol = null;
	util.log('Initialized rcon instance');
};

Rcon.prototype.connect = function(cb) {

	if(this.connected === true) {
		util.log('Connection already established !!');
		return cb("Connection already established !!");
	}
	
	this.protocol = new rconProtocol(this.address, this.password, this.pwd);
	util.log('Connecting', this.address, this.password);
	
	this.protocol.connect(function(err) {
		if(err){
			util.log('Connection error', err);
			return cb(err);
		}
		this.connected = true;
		this.emit('connect');
		return cb();
	});
	
	this.protocol.on('error', function(err) {
		util.log('Protocol error', err);
		return cb('Protocol error' + err);
	});
};

Rcon.prototype.execCommand = function(cmd, cb) {

	if(typeof(cmd) !== 'string') {
		util.log('Invalid command:', cmd);
		return cb("Invalid command");
	}
	
	if(!this.connected) {
		util.log('Not connected !');
	}
	
	this.protocol.senCmd(cmd, function(err, res) {
		return cb(err, res);
	});
};

Rcon.prototype.disconnect = function(cb) {
	this.connected = false;
	this.protocol.disconnect(cb);
};

var serverQueryProtocol = require("./protocol/serverQueryProtocol.js");
var EventEmitter = require('events').EventEmitter;
var Log = require('./util.js').log;

module.exports = ServerQuery;

function ServerQuery(address, pwd){
	this.connected = false;
	this.connecting = false;
	this.password = pwd;
	this.address = address;
	this.protocol = null;
	
	Log('Initialized serverQuery instance', this);
};

ServerQuery.prototype.__proto__ = EventEmitter.prototype;


ServerQuery.prototype.connect = function(address, pwd, cb){
	var self = this; 
	
	if(this.connected === true){
		Log('Error: Connection already establish !!!');
		return (cb && cb( {code:'CONNECTION_EXISTS'}));
	}
	
	this.connecting = true;
	this.protocol.connect(address, pwd, function(err){
		if(!err){
			Log('Connected');
			self.connecting = false;
			self.connected = true;
			
			self.emit('connect');
			cb && cb(err);
		}
		Log('Connection error');
		cb && cb(err);
	});
};

ServerQuery.prototype.runQuery = function(queryType, cb){
	var self = this;
	//TODO : Continue
}
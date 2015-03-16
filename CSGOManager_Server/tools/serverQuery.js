var ServerQueryProtocol = require("./protocol/serverQueryProtocol.js");
var ServerQueryParser = require("./packets/serverQueryResponseParser.js");
var EventEmitter = require('events').EventEmitter;
var Log = require('./util.js').log;

module.exports = ServerQuery;

function ServerQuery(server){
	this.connected = false;
	this.connecting = false;
	this.server = server;
	this.protocol = null;
	
	Log('Initialized serverQuery instance', this);
};

ServerQuery.prototype.__proto__ = EventEmitter.prototype;


ServerQuery.prototype.connect = function(server, cb){
	var self = this; 
	
	if(this.connected === true){
		Log('Error: Connection already establish !!!');
		return (cb && cb( {code:'CONNECTION_EXISTS'}));
	}
	
	this.connecting = true;
	this.protocol = new ServerQueryProtocol();
	
	this.protocol.connect(server, function(err){
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
	
	if(queryType !== ServerQuery.A2SInfo && queryType !== ServerQuery.A2SPlayer
	 && queryType !== ServerQuery.A2Ping && queryType !== ServerQuery.A2SServerQueryGetChallenge){
		Log('Invalid query type:', queryType);
		return setImmediate(cb.bind(self, {code: 'INVALID_QUERY_TYPE'}));
	}
	
	if(!this.connected){
		Log('Query issued before connection, adding to queue');
		this.once('connect', this.runQuery.bind(this, queryType, cb));
		if(!this.connecting) this.connect();
		return;
	}
	
	this.protocol.query(queryType, function(response){
		Log(response);
		//Parsing response
		data = ServerQueryParser.ServerQueryResponseParser(response);
		Log(data);
		cb && cb(err, data);
	});
};

ServerQuery.A2SInfo = "A2S_INFO";
ServerQuery.A2SPlayer = "A2S_PLAYER";
ServerQuery.A2Ping = "A2S_PING";
ServerQuery.A2SServerQueryGetChallenge = "A2S_SERVERQUERY_GETCHALLENGE";

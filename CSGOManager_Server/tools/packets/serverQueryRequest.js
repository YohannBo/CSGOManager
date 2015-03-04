module.exports = ServerQueryRequest;

function ServerQueryRequest(params) {
	this.buffer = undefined;
	if(params.type = 'A2S_INFO'){
		this.buffer = A2SInfoRequest();
	}
	else if(params.type = 'A2S_PLAYER'){
		this.buffer = A2SPlayerRequest(params.challenge);
	}
	else if(params.type = 'A2S_RULES'){
		this.buffer = A2SRulesRequest(params.challenge);
	}
	else if(params.type = 'A2S_PING'){
		this.buffer = A2SPingRequest();
	}
	else if(params.type = 'A2S_SERVERQUERY_GETCHALLENGE'){
		this.buffer = A2SChallengeRequest();
	}
}

function A2SInfoRequest() {
	
	var HEADER = 0x54;
	var PAYLOAD = 'Source Engine Query';
	
	var buffer = new Buffer(4 + PAYLOAD.length);
	buffer.writeInt32LE(HEADER, 0);
	buffer.write(PAYLOAD, 1, PAYLOAD.length, 'ascii');
	
	return buffer;
}

function A2SPlayerRequest(challenge){
	var HEADER = 0x55;
	var CHALLENGE = challenge;
	
	var buffer = new Buffer(5);
	buffer.writeInt32LE(HEADER, 0);
	buffer.writeInt32LE(CHALLENGE, 1);
	
	return buffer;
}

function A2SRulesRequest(challenge){
	var HEADER = 0x56;
	var CHALLENGE = challenge;
	
	var buffer = new Buffer(5);
	buffer.writeInt32LE(HEADER, 0);
	buffer.writeInt32LE(CHALLENGE, 1);
	
	return buffer;
}

function A2SPingRequest(){
	var HEADER = 0x69;

	var buffer = new Buffer(1);
	buffer.writeInt32LE(HEADER, 0);
	
	return buffer;
}

function A2SChallengeRequest(){
	var HEADER = 0x41;

	var buffer = new Buffer(1);
	buffer.writeInt32LE(HEADER, 0);
	
	return buffer;
}
module.exports = ServerQueryRequest;

function ServerQueryRequest(params) {
	this.bufferSize = 5;
	if(params.payload){
		this.bufferSize += params.payload.length + 1;
	}
	if(params.challenge){
		this.bufferSize += 4;
	}

	this.buffer = new Buffer(bufferSize);
	this.buffer.writeInt32LE(-1, 0);
	//HEADER
	this.buffer.writeIntLE(params.header, 4);
	if(params.payload){
		//PAYLOAD
		this.buffer.write(params.payload, 5, params.payload.length, 'ascii');
		//END STRING
		this.buffer.writeIntLE(0x00, this.buffer.length - 1);
	}
	if(params.challenge){
		//CHALLENGE
		this.buffer.writeInt32LE(params.challenge, 5);
	}
	
	return buffer;
};
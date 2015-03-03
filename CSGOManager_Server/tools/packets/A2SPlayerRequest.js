module.exports = A2SPlayerRequest;

function A2SPlayerRequest(challenge) {
		
	this.buffer = new Buffer(5);
	
	this.buffer.writeInt32LE(A2SPlayerRequest.HEADER, 0);
	this.buffer.writeInt32LE(challenge, 1);
}

A2SPlayerRequest.HEADER = 0x55;
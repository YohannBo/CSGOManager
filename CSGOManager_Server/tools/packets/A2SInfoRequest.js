module.exports = A2SInfoRequest;

function A2SInfoRequest() {
		
	this.buffer = new Buffer(4 + A2SInfoRequest.PAYLOAD.length);
	
	this.buffer.writeInt32LE(A2SInfoRequest.HEADER, 0);
	this.buffer.write(A2SInfoRequest.PAYLOAD, 1, A2SInfoRequest.PAYLOAD.length, 'ascii');
}

A2SInfoRequest.HEADER = 0x54;
A2SInfoRequest.PAYLOAD = 'Source Engine Query';
module.exports = RconRequest;

function RconRequest(params) {
	
	this.id = params.id;
	this.type = RconRequest[params.type];
	this.body = params.body;
	
	this.bodySize = Buffer.byteLength(this.body);
	// Add 4 to the size (body + 10) for the null char
	this.buffer = new Buffer(this.bodySize + 14);
	
	// Substract 4 because the packet size field is not included when determining the size of the packet
	this.buffer.writeInt32LE(this.buffer.length - 4, 0)
	this.buffer.writeInt32LE(this.id, 4);
	this.buffer.writeInt32LE(this.type, 8);
	this.buffer.write(this.body, 12, this.buffer.length - 2, 'ascii');
	this.buffer.writeInt16LE(0x00, this.buffer.length - 2);
}

RconRequest.SERVERDATA_AUTH = 0x03;
RconRequest.SERVERDATA_AUTH_RESPONSE = 0x02;
RconRequest.SERVERDATA_EXECCOMMAND = 0x02;
RconRequest.SERVERDATA_RESPONSE_VALUE = 0x00;
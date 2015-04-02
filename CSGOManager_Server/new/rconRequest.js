module.exports = RconRequest;

function RconRequest(id, type, body){
	var size   = Buffer.byteLength(body) + 14;
	var buffer = new Buffer(size);
 
	buffer.writeInt32LE(size - 4, 0);
	buffer.writeInt32LE(id, 4);
	buffer.writeInt32LE(type, 8);
	buffer.write(body, 12, size - 2, "ascii");
	buffer.writeInt16LE(0, size - 2);
 
	return buffer;	
};
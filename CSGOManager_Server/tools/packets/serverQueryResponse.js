module.exports = ServerQueryResponse;

function ServerQueryResponse(responseBuffer) {
	this.header = responseBuffer.readInt32LE(0);
	if(this.header == 0xFFFFFFFF) {
		this.split = false;
		this.payload = buffer.slice(4);
	}
	else if(this.header == 0xFFFFFFFE){
		this.id = responseBuffer.readInt32LE(4);
		if(id >> 31 == 1) 
			this.compressed = true;
		else 
			this.compressed = false;
		
		this.total = responseBuffer.readUInt8LE(8);
		this.number = responseBuffer.readUInt8LE(9);
		this.size = responseBuffer.readUInt16LE(10);
		
		if(this.number == 0 && this.compressed) {
			this.decompressedSize = responseBuffer.readInt32LE(12);
			this.crc32 = responseBuffer.readInt32LE(16);
			this.payload = responseBuffer.slice(20);
		}
		else 
			this.payload = responseBuffer.slice(12);
	}
	else{
		//Error
		throw new Error('Wrong packet format !');
	}
	return this.payload;
}
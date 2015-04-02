module.exports = RconResponse;

function RconResponse(buffer){
	return {
		size: buffer.readInt32LE(0),
		id:   buffer.readInt32LE(4),
		type: buffer.readInt32LE(8),
		body: buffer.toString("ascii", 12, data.length - 2);
	}
};
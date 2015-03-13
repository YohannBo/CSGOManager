module.exports = ServerQueryResponseParser;

function ServerQueryResponseParser(buffer){
	var errorMessage = "";
	var data;
	var header = buffer.readUInt8LE(0);
	switch(header) {
		case ServerQueryResponseParser.A2SInfoResponseHeader:
			data = ParseA2SInfoResponse(buffer);
			break;
		case ServerQueryResponseParser.A2SPlayerResponseHeader:
			data = ParseA2SPlayerResponse(buffer);
			break;
		case ServerQueryResponseParser.A2PingResponseHeader: 
			data = ParseA2PingResponse(buffer);
			break;
		case ServerQueryResponseParser.A2SServerQueryGetChallengeResponseHeader:
			data = ParseA2SServerQueryGetChallengeResponse(buffer);
			break;
		default : errorMessage = "Impossible de parser la réponse";
	} 
	
	if(errorMessage === "")
		return data;
	else
		return errorMessage;
};

function ParseA2SInfoResponse(buffer){
	return {
		Protocol: buffer.readUInt8LE(8),
		Name: buffer.readUInt8LE(8),
		Map: buffer.readUInt8LE(8),
		Folder: buffer.readUInt8LE(8),
		Game: buffer.readUInt8LE(8),
		ID: buffer.readUInt8LE(8),
		Players: buffer.readUInt8LE(8),
		MaxPlayers : buffer.readUInt8LE(8),
		Bots: buffer.readUInt8LE(8),
		ServerType : buffer.readUInt8LE(8),
		Environment: buffer.readUInt8LE(8),
		Visibility: buffer.readUInt8LE(8),
		VAC: buffer.readUInt8LE(8),
		Version: buffer.readUInt8LE(8),
		ExtraDataFlag: buffer.readUInt8LE(8)
	};
}

function ParseA2SPlayerResponse(buffer){
	
}

function ParseA2PingResponse(buffer){
	
}

function ParseA2SServerQueryGetChallengeResponse(buffer){
	
}

ServerQueryResponseParser.A2SInfoResponseHeader = 0x49;
ServerQueryResponseParser.A2SPlayerResponseHeader = 0x44;
ServerQueryResponseParser.A2PingResponseHeader = 0x6A;
ServerQueryResponseParser.A2SServerQueryGetChallengeResponseHeader = 0x41;
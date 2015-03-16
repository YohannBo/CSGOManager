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
	var offset = 8;
	this.protocol = buffer.readUInt8LE(offset);
	offset += 8;
	this.name = this.getNextString(buffer, offset);
	offset += this.name.length;
	this.map = this.getNextString(buffer, offset);
	offset += this.map.length;
	this.folder = this.getNextString(buffer, offset);
	offset += this.folder.length;
	this.game = this.getNextString(buffer, offset);
	offset += this.game.length;
	this.id = buffer.readUInt16LE(offset);
	offset += 16;
	this.players = buffer.readUInt8LE(offset);
	offset += 8;
	this.maxPlayers = buffer.readUInt8LE(offset);
	offset += 8;
	this.bots = buffer.readUInt8LE(offset);
	offset += 8;
	this.serverTypeTmp = buffer.readUInt8LE(offset);
	offset += 8;
	if(this.serverTypeTmp === 'd'){
		this.serverType = "Dedicated server";
	}else if (this.serverTypeTmp === 'l'){
		this.serverType = "Non-dedicated server";
	}
	else if(this.serverTypeTmp === 'p'){
		this.serverType = "SourceTV ";
	}else {
		this.serverType = "Erreur : Impossible de parser le type de serveur !";
	}
	this.environmentTmp = buffer.readUInt8LE(offset);
	offset += 8;
	if(this.environmentTmp === 'l'){
		this.environment = "Linux";
	}else if (this.environmentTmp === 'w'){
		this.environment = "Windows";
	}
	else if(this.environmentTmp === 'm' || this.environmentTmp === 'o'){
		this.environment = "Mac";
	}else {
		this.environment = "Erreur : Impossible de parser l'environment !";
	}
	this.visibilityTmp = buffer.readUInt8LE(offset);
	offset += 8;
	if(this.visibilityTmp === 0){
		this.visibility = "Public";
	}else if (this.visibilityTmp === 1){
		this.visibility = "Private";
	}else {
		this.visibility = "Erreur : Impossible de parser la visibilité du serveur !";
	}
	this.vacTmp = buffer.readUInt8LE(8);
	offset += 8;
	if(this.vacTmp === 0){
		this.vac = "Unsecured";
	}else if (this.vacTmp === 1){
		this.vac = "Secured";
	}else {
		this.vac = "Erreur : Impossible de parser la sécurité du serveur !";
	}
	this.version = this.getNextString(buffer, offset);
	offset += this.version.length;
	if(buffer.length > offset){
		this.extraDataFlag = buffer.readUInt8LE(8);
		offset += 8;
		
		if(this.extraDataFlag & 0x80){
			this.port = buffer.readUInt16LE(offset);
			offset += 16;
		}
		if(this.extraDataFlag & 0x10){
			this.steamId = buffer.readDoubleLE(offset);
			offset += 64;
		}
		if(this.extraDataFlag & 0x40){
			this.portSourceTV = buffer.readUInt16LE(offset);
			offset += 16;
			this.sourceTvName = this.getNextString(buffer, offset);
			offset += this.sourceTvName.length;
		}
	}

	return {
		Protocol: this.protocol,
		Name: this.name,
		Map: this.map,
		Folder: this.folder,
		Game: this.game,
		ID: this.id,
		Players: this.players,
		MaxPlayers : this.maxPlayers,
		Bots: this.bots,
		ServerType : this.serverType,
		Environment: this.environment,
		Visibility: this.visibility,
		VAC: this.vac,
		Version: this.version,
		port: this.port != undefined ? this.port : null,
		steamId: this.steamId != undefined ? this.steamId : null,
		portSourceTV: this.portSourceTV != undefined ? this.portSourceTV : null,
		sourceTvName: this.sourceTvName != undefined ? this.sourceTvName : null		
	};
}

function ParseA2SPlayerResponse(buffer){
	var i = 0;
	var offset = 8;
	this.numberPlayer = buffer.readUInt8LE(offset);
	offset += 8;
	this.players = [];
	
	for(i=0; i < this.numberPlayer; i++){
		var index = buffer.readUInt8LE(offset);
		offset += 8;
		var name = this.getNextString(buffer, offset);
		offset += name.length;
		var score = buffer.readUInt32LE(offset);
		offset += 32;
		var duration = buffer.readFloatLE(offset);
		offset += 32;
		this.players.push({Index: index, Name : name, Score: score, Duration: duration});
	}
	return {
		NumberPlayer: this.numberPlayer,
		Players: this.players	
	};
}

function ParseA2PingResponse(buffer){
	return {Payload : this.getNextString(buffer, 8)};
}

function ParseA2SServerQueryGetChallengeResponse(buffer){
	return {Challenge : buffer.readUInt32LE(8)};
}

function getNextString(buffer, offset){
	var str = "";
	var i = offset;
	while(buffer[i] != 0x00){
		str += buffer[i];
		i++;
	}
	return str;
}

ServerQueryResponseParser.A2SInfoResponseHeader = 0x49;
ServerQueryResponseParser.A2SPlayerResponseHeader = 0x44;
ServerQueryResponseParser.A2PingResponseHeader = 0x6A;
ServerQueryResponseParser.A2SServerQueryGetChallengeResponseHeader = 0x41;
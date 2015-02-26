var io = require("socket.io");
var Rcon = require('./tools/rcon');
var sockets = io.listen(8050);

sockets.on('connection', function (socket) {
  console.log("client connecté");
  
  socket.on('rcon', function (data) {
	console.log(data);
	var rcon = new Rcon({
		address: data.ip + ':' + data.port,
		password: data.pwd,
		initCvars: false
	});
	// Envoie de la requête UDP
	/*rcon.connect(function() {
		console.log("socket udp connectée");
		rcon.runCommand(data.cmd, function(err, res) {
			console.log("test");
			if (err) {
				console.log("erreur");
				socket.emit('rconResult', { succes: false, error: err });
			} else {
				console.log("commande envoyé");
				socket.emit('rconResult', { succes: true });
			}
		});
	});*/
	socket.emit('rconResult', { success: true });
  });
  
  /*socket.on('updateServerCs', function (data) {
	switch(data.updateType){
		case "serverData":
			// Envoie de la requête UDP
			// Envoie des informations au client
			break;
		case "playersData":
			// Envoie de la requête UDP
			// Envoie des informations au client
			break;
		default:
			// Ping
			// Envoie de la requête UDP
			// Envoie des informations au client
	}
  });*/
  
  socket.on('disconnect', function () {
	console.log("client déconnecté");
  });
});


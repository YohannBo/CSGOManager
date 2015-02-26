'use strict';

angular.module('console').controller('ConsoleController', ['$scope', '$stateParams', '$location', 'Socket', 'Authentication', 'ConsoleService', 'Servercs',
	function($scope, $stateParams, $location, Socket, Authentication, ConsoleService, Servercs) {
		$scope.authentication = Authentication;
		$scope.socketNotConnected = true;

		$scope.connexionSocket = function(){
			socketConnect('127.0.0.1:8050');
		};
		
		$scope.serverChange = function(){
			if( $scope.oldSelectedServer != "" && ($scope.oldSelectedServer != $scope.selectedServer)){
				socketDisconnect();
			}
			$scope.oldSelectedServer = $scope.selectedServer;
		};

		$scope.sendCmd = function() {		
			$scope.sockIo.emit('rcon', {
				ip: this.selectedServer.ip,
				port: this.selectedServer.port,
				pwd : this.pwd,
				cmd : this.cmd
			});
			addLogToHistory("Sends in progress : " + $scope.cmd, "text-info");
		};
		
		$scope.console = function() {
			$scope.servercs = Servercs.query();
			$scope.selectedServer = "";
			$scope.oldSelectedServer = "";
			$scope.ip = "";
			$scope.port = "";
			$scope.pwd = "";
			$scope.cmd = "";
			$scope.history = [];
		};
		
		function socketConnect(path){
			$scope.sockIo = Socket.initializeSocket(path);
			$scope.sockIo.on('rconResult', function(data) {
				if(data.success == true){
					addLogToHistory("Successfully sending : " + $scope.cmd, "text-success");
				}
				else{
					addLogToHistory("Sending fails : " + $scope.cmd, "text-danger");
				}
			});
			$scope.socketNotConnected = false;
		};
		
		function socketDisconnect(){
			if($scope.sockIo){
				$scope.sockIo.disconnect();
				$scope.sockIo = undefined;
			}
			$scope.socketNotConnected = true;
		}
		
		function addLogToHistory(msg, typeMessage){
			if($scope.history.length > 9){
				$scope.history.shift();
			}
			var d = new Date();
			var currentDate = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear()
								+ " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() 
								+ "." + d.getMilliseconds();
			var data = {
				date: currentDate,
				serverName: $scope.selectedServer.serverName,
				message: msg,
				type: typeMessage
			}
			$scope.history.push(data);
		};
	}
]);
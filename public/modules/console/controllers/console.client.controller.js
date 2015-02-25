'use strict';

angular.module('console').controller('ConsoleController', ['$scope', '$stateParams', '$location', 'Socket', 'Authentication', 'ConsoleService', 'Servercs',
	function($scope, $stateParams, $location, Socket, Authentication, ConsoleService, Servercs) {
		$scope.authentication = Authentication;

		Socket.on('rconResult', function(data) {
			console.log(data);
		});
		
		$scope.sendCmd = function() {
			/*var consoleService = new ConsoleService({
				ip: this.selectedServer.ip,
				port: this.selectedServer.port,
				pwd : this.pwd,
				cmd : this.cmd
			});
			consoleService.$sendCmd(function(response) {
				$location.path('/');				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});*/
			
			var data = {
				ip: this.selectedServer.ip,
				port: this.selectedServer.port,
				pwd : this.pwd,
				cmd : this.cmd
			};
			
			Socket.emit('rcon', data);
		};
		
		$scope.console = function() {
			$scope.servercs = Servercs.query();
			$scope.selectedServer = "";
			$scope.ip = "";
			$scope.port = "";
			$scope.pwd = "";
			$scope.cmd = "";
		};
	}
]);
'use strict';

angular.module('console').controller('ConsoleController', ['$scope', '$stateParams', '$location', 'Authentication', 'ConsoleService', 'Servercs',
	function($scope, $stateParams, $location, Authentication, ConsoleService, Servercs) {
		$scope.authentication = Authentication;

		$scope.sendCmd = function() {
			var consoleService = new ConsoleService({
				ip: this.selectedServer.ip,
				port: this.selectedServer.port,
				pwd : this.pwd,
				cmd : this.cmd
			});
			
			consoleService.$sendCmd(function(response) {
				$location.path('/');				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
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
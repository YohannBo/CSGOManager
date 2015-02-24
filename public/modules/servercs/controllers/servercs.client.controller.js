'use strict';

angular.module('servercs').controller('ServercsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Servercs',
	function($scope, $stateParams, $location, Authentication, Servercs) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var servercs = new Servercs({
				ip: this.ip,
				port: this.port,
				serverName : this.serverName
			});
			servercs.$save(function(response) {
				$location.path('servercs/' + response._id);

				$scope.ip = '';
				$scope.port = '';
				$scope.serverName = '';
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(servercs) {
			if (servercs) {
				servercs.$remove();

				for (var i in $scope.servercs) {
					if ($scope.servercs[i] === servercs) {
						$scope.servercs.splice(i, 1);
					}
				}
			} else {
				$scope.servercs.$remove(function() {
					$location.path('servercs');
				});
			}
		};

		$scope.update = function() {
			var servercs = $scope.servercs;

			servercs.$update(function() {
				$location.path('servercs/' + servercs._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.servercs = Servercs.query();
		};

		$scope.findOne = function() {
			$scope.servercs = Servercs.get({
				servercsId: $stateParams.servercsId
			});
		};
	}
]);
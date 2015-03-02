'use strict';

//socket factory that provides the socket service
angular.module('core').factory('Socket', ['socketFactory',
    function(socketFactory) {
		var socket = {};
		socket.initializeSocket = function(path){
			if(path != null || path != undefined){
				return socketFactory({
					prefix: '',
					ioSocket: io.connect(path ,{'forceNew':true })
				});
			}
			else{
				return socketFactory({
					prefix: '',
					ioSocket: io.connect()
				});
			}
		};
		return socket;
    }
]);
var notify = (function () {
	
	var notificationTitle = 'Calendario';

	var notificationOptions = {
		body: '',
		icon: 'launcher-icon-4x.png',
		badge: 'launcher-icon-4x.png',
		tag: 'simple-push-demo-notification',
		vibrate: [200, 100, 200, 100, 200, 100, 200, 200, 100, 200, 200, 100, 200, 200, 100, 200, 200, 100, 200, 200, 100, 200, 200, 100, 200, 200, 100, 200]
	};   

    function send_msg(mensaje) {
		notificationOptions.body = mensaje;
		self.registration.showNotification(notificationTitle, notificationOptions);
    }
   
    return {
        send: send_msg
    }

})();

var version = 1;

self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');  
});

function console_running() {
	console.log('[worker.js]{running}(v'+version+')');	
}

setInterval(console_running, 30000);

self.onmessage = function (msg) {
	console.log("SW Received Message: ", msg);

    switch (msg.data.type) {
        case 'notify_now':
			notify.send(msg.data.content)
            break;
        case 'notify_delay_30':
			setTimeout(function(){
				notify.send(msg.data.content)
			},30000);
            break;
			
        default:
            throw 'no aTopic on incoming message to ChromeWorker';
    }
}
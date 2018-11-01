//Server Side
const WebSocket = require('ws');
const {ipcRenderer} = require('electron');

//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

document.getElementById("gameStatus").style.display = "none";

const wss = new WebSocket.Server({ port: 8081 });
wss.on('connection', function connection(ws) {
	
	ws.on('message', function incoming(message) {
		console.log('FROM CLIENT: %s', message);
		
		//Process message from CLIENT
		if(message.includes("Update Board:")){
			ipcRenderer.send('CLIENT_MOVE_SUCCESS', message);
			
			document.getElementById("inputField").style.display = "block";
			document.getElementById("gameStatus").style.display = "none";
		}
	});
	
	ws.on('close', function close() {
		console.log('Client disconnected to server');
	});
	
	//Recieve message from MAIN SERVER, to send message to CLIENT
	ipcRenderer.on('UPDATE_CLIENT_BOARD', (event, arg) => {
		console.log("main.js: Update Client Board = " + arg);
		ws.send("Update Board: " + arg);
		
		document.getElementById("inputField").style.display = "none";
		document.getElementById("gameStatus").style.display = "block";
	})
});


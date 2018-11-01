//Client side
const {ipcRenderer} = require('electron');
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8081/');
 
document.getElementById("inputField").style.display = "none";
 
ws.on('open', function open() {
	
	ws.send("Connection to Server succesfull")
	
	ipcRenderer.on('UPDATE_SERVER_BOARD', (event, arg) => {
		console.log("main.js: Update Client Board = " + arg);
		ws.send("Update Board: " + arg);
		
		document.getElementById("inputField").style.display = "none";
		document.getElementById("gameStatus").style.display = "block";
	})
  
});
 
ws.on('message', function incoming(data) {
	console.log('FROM SERVER: %s', data);
	
	if(data.includes("Update Board: ")){
		ipcRenderer.send('SERVER_MOVE_SUCCESS', data);
		document.getElementById("inputField").style.display = "block";
		document.getElementById("gameStatus").style.display = "none";
	}
});

ws.on('close', function close() {
	console.log("Disconnected from the server");
});
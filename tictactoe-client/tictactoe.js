var square = [ 'o', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
drawBoard();

var checkWin
//Return 1: Winning condition
//Return -1: No condition meet, continue game
//Return 0: Tying condition
function checkwin()
{
    //check 1st row
    if (square[1] == square[2] && square[2] == square[3])
        return 1;

    //check 2nd row
    else if (square[4] == square[5] && square[5] == square[6])
        return 1;

    //check 3rd row
    else if (square[7] == square[8] && square[8] == square[9])
        return 1;

    //check 1st column
    else if (square[1] == square[4] && square[4] == square[7])
        return 1;

    //check 2nd column
    else if (square[2] == square[5] && square[5] == square[8])
        return 1;

    //check 3rd column
    else if (square[3] == square[6] && square[6] == square[9])
        return 1;

    //check diagonal (top left <-> bottom right)
    else if (square[1] == square[5] && square[5] == square[9])
        return 1;

    //check diagonal (top right <-> bottom left)
    else if (square[3] == square[5] && square[5] == square[7])
        return 1;

    else if (square[1] != '1' && square[2] != '2' && square[3] != '3' &&
        square[4] != '4' && square[5] != '5' && square[6] != '6' && square[7]
        != '7' && square[8] != '8' && square[9] != '9')

        return 0;
    else
        return  - 1;
}


document.querySelector('#btn-submit').addEventListener('click', checkMove);

function checkMove(){
	var success = false;
	var choice = document.getElementById("playerMove").value;

	var mark = 'O' 
	
	if (choice == 1 && square[1] == '1'){
		square[1] = mark;
		success = true;
	}else if (choice == 2 && square[2] == '2'){
		square[2] = mark;
		success = true;
	}else if (choice == 3 && square[3] == '3'){
		square[3] = mark;
		success = true;
	}else if (choice == 4 && square[4] == '4'){
		square[4] = mark;
		success = true;
	}else if (choice == 5 && square[5] == '5'){
		square[5] = mark;
		success = true;
	}else if (choice == 6 && square[6] == '6'){
		square[6] = mark;
		success = true;
	}else if (choice == 7 && square[7] == '7'){
		square[7] = mark;
		success = true;
	}else if (choice == 8 && square[8] == '8'){
		square[8] = mark;
		success = true;
	}else if (choice == 9 && square[9] == '9'){
		square[9] = mark;
		success = true;
	//Else invalid move, also catches if user input is not valid
    }else{
		console.log("Invalid move ");
	}
	
	if(success){
		ipcRenderer.send('CLIENT_MOVE_SUCCESS', choice)
	}
	drawBoard();
	checkWin = checkwin();
	if(checkWin == 1){
		alert("You: Player 2(O) Win!")
		newDrawBoard();
	}
	
	success = false;
}


function drawBoard()
{
	document.getElementById("tictactoe").innerHTML = "";
    document.getElementById("tictactoe").innerHTML += "  " + square[1] + "  |  " + square[2] + "  |  " + square[3] + "<br>";
    document.getElementById("tictactoe").innerHTML += "  " + square[4] + "  |  " + square[5] + "  |  " + square[6] + "<br>";
    document.getElementById("tictactoe").innerHTML += "  " + square[7] + "  |  " + square[8] + "  |  " + square[9] + "<br>";
}

function newDrawBoard(){
	square = [ 'o', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
	drawBoard();
}

//Tell main a move is successful
const {ipcRenderer} = require('electron');

ipcRenderer.on('UPDATE_CLIENT_BOARD', (event, arg) => {
    console.log("TEST: " + arg);
	
	//Process message and update board
	var res = arg.split(": ", 2);
	console.log(res[1]);
	square[res[1]] = 'X';
	
	drawBoard();
	checkWin = checkwin();
	console.log(checkWin);
	
	if(checkWin == 1){
		alert("Player 1(X) Win!, You loose!");
		newDrawBoard();
	}
})
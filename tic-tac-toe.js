/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    if (board[position] === ' ') {
        board[position] = mark;
    }
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    console.log(' ' + board[1] + ' | ' + board[2] + ' | ' + board[3]);
    console.log(' --------- ');
    console.log(' ' + board[4] + ' | ' + board[5] + ' | ' + board[6]);
    console.log(' --------- ');
    console.log(' ' + board[7] + ' | ' + board[8] + ' | ' + board[9]);
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    if (position < 1 || position > 9) {
        return false; // Invalid position
    }
    if (board[position] !== ' ') {
        return false; // Position already occupied
    }
    return true; // Move is valid
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
    [1, 5, 9], [3, 5, 7]             // diagonals
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let combination of winCombinations) {
        if (combination.every(index => board[index] === player)) {
            return true;
        }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    return Object.values(board).every(value => value !== ' ');
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
let position = prompt(`Player ${player}, enter your move (1-9): `);
    position = Number(position);

    if (!validateMove(position)) {
        console.log('Invalid move. Try again.');
        return;
    }

    markBoard(position, player);
    printBoard();

    if (checkWin(player)) {
        console.log(`Congratulations, Player ${player}! You've won!`);
        process.exit(); // End the game
    } else if (checkFull()) {
        console.log("It's a tie!");
        process.exit(); // End the game
    }

    // Switch player turn
    currentTurnPlayer = (player === 'X') ? 'O' : 'X';
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over

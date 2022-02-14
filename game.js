let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", ""];

let midGame = true;

const displayMessage = document.querySelector('.current--player');
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn.`;
const winMessage = () => `${currentPlayer} has won!`;
const drawMessage = () => `The game has ended with a draw.`;

displayMessage.innerHTML = currentPlayerTurn();

/**
 * Board: 0 1 2
 *        3 4 5
 *        6 7 8
 */

const winningStates = [

    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]

];

function move(choice, choice_index) {
    gameState[choice_index] = currentPlayer;
    choice.innerHTML = currentPlayer;
}

function playerChange() {
    if (currentPlayer == 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    displayMessage.innerHTML = currentPlayerTurn();
}

function checkWin() {
    let win = false;

    for (let i = 0; i <= 7; i++) {
        const winState = winningStates[i];
        let pos_a = gameState[winState[0]];
        let pos_b = gameState[winState[1]];
        let pos_c = gameState[winState[2]];

        if (pos_a === '' || pos_b === '' || pos_c === '') {
            continue;
        }
        if (pos_a === pos_b && pos_b === pos_c) {
            win = true;
            break;
        }
    }

    if (win) {
        displayMessage.innerHTML = winMessage();
        midGame = false;
        return;
    }

    // if game has no empty positions...
    let draw = !gameState.includes("");
    if (draw) {
        displayMessage.innerHTML = drawMessage();
        midGame = false;
        return;
    }

    playerChange();

}

function click_cell(click) {
    const cell = click.target;
    const index = parseInt(cell.getAttribute('index'));

    if (gameState[index] != "" || !midGame) {
        return;
    }

    move(cell, index);
    checkWin();
}

function reset() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    displayMessage.innerHTML = currentPlayerTurn();
    midGame = true;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', click_cell));
document.querySelector('.reset').addEventListener('click', reset);
const statusDisplay = document.querySelector('.current--player');

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", ""];

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

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
    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkWin() {
    let win = False;

    for (let i = 0; i <= 7; i++) {
        const winState = winningStates[i];
        let pos_a = gameState[winState[0]];
        let pos_b = gameState[winState[1]];
        let pos_c = gameState[winState[2]];

        if (pos_a == pos_b && pos_b == pos_c) {
            win = True;
            break;
        }
        if (pos_a == '' || pos_b == '' || pos_c == '') {
            continue;
        }
    }

    if (win) {
        return;
    }

    let draw = !gameState.includes("");
    if (draw) {
        return;
    }

    playerChange();

}

function click_cell(click) {
    const cell = click.target;
    const index = parseInt(cell.getAttribute('cell--index'));

    if (gameState[index] != "") {
        return;
    }

    move(cell, index);
    checkWin();
}

function restart() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', click_cell));
document.querySelector('.game--restart').addEventListener('click', restart);
/*-------------------------------- Constants --------------------------------*/
/*---------------------------- Variables (state) ----------------------------*/
/*------------------------ Cached Element References ------------------------*/
/*-------------------------------- Functions --------------------------------*/
/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.sqr');
    const message = document.getElementById('message');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];

    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => board[index] === player)
        );
    }

    function checkDraw() {
        return board.every(square => square !== '');
    }

    function updateMessage(msg) {
        message.textContent = msg;
    }

    function handleClick(e) {
        const index = e.target.id;
        if (board[index] === '') {
            board[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                updateMessage(`Player ${currentPlayer} wins!`);
                squares.forEach(sq => sq.removeEventListener('click', handleClick));
            } else if (checkDraw()) {
                updateMessage('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateMessage(`Player ${currentPlayer}'s turn`);
            }
        }
    }

    squares.forEach(square => square.addEventListener('click', handleClick));
    updateMessage(`Player ${currentPlayer}'s turn`);
});

let currentPlayer = 'X';
let board = Array(9).fill(null);

function makeMove(cell) {
    const index = Array.from(cell.parentElement.children).indexOf(cell);
    
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWinner()) {
        document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
        document.getElementById('footer').style.display = 'block';
    } else if (board.every(cell => cell)) {
        document.getElementById('status').textContent = "It's a draw!";
        document.getElementById('footer').style.display = 'block';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    document.getElementById('footer').style.display = 'none';

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}

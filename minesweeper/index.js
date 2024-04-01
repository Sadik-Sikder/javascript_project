const numRows = 8;
const numCols = 8;
const numMines = 10;
const f = 'F';

const gameBoard = document.getElementById("gameBoard");
const ref = document.getElementById('refresh');

let board = [];

function initializeBoard() {
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        for (let j = 0; j < numCols; j++) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                count: 0,
            };
        }
    }

    let minesPlaced = 0;
    //add the mines in the board
    while (minesPlaced < numMines) {
        const row = Math.floor(Math.random() * numRows);
        const col = Math.floor(Math.random() * numCols);
        if (!board[row][col].isMine) {
            board[row][
                col
            ].isMine = true;
            minesPlaced++;
        }
    }
    //count mine around each cell block

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (!board[i][j].isMine) {
                let count = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const ni = i + dx;
                        const nj = j + dy;
                        if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols && board[ni][nj].isMine) {
                            count++;
                        }
                    }
                }
                board[i][j].count =
                    count;
            }
        }
    }
}

function revealCell(row, col) {
    if (
        row < 0 ||
        row >= numRows ||
        col < 0 ||
        col >= numCols ||
        board[row][col].revealed
    ) {
        return;
    }

    board[row][col].revealed = true;

    if (board[row][col].isMine) {
        alert("Game Over! You stepped on a mine.");
        c = true;
    } 
    else if (board[row][col].count === 0) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                revealCell(row + dx, col + dy);
            }
        }
    }

    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
        for ( let j = 0; j < numCols; j++ ) {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (board[i][j].revealed) {
                cell.classList.add("revealed");
                if (board[i][j].isMine) {
                    cell.classList.add("mine");
                    cell.textContent = `${f}`;
                }
                else if (board[i][j].count > 0) {
                    cell.textContent = board[i][j].count;
                }
            }
            cell.addEventListener(
                "click",
                () => {
                    revealCell(i, j);  
                });
            gameBoard.appendChild(cell);
        }
        gameBoard.appendChild(
            document.createElement("br")
        );
    }
}

initializeBoard();

let startx = Math.floor(Math.random() * numRows);
let starty = Math.floor(Math.random() * numRows);
while(board[startx][starty].isMine || board[startx][starty].count !== 0){
    startx = Math.floor(Math.random() * numRows);
    starty = Math.floor(Math.random() * numRows);
}
revealCell(startx, starty);
renderBoard();

ref.addEventListener('click', () => {
    board = [];
    initializeBoard();
    startx = Math.floor(Math.random() * numRows);
    starty = Math.floor(Math.random() * numRows);
    while(board[startx][starty].isMine || board[startx][starty].count !== 0){
        startx = Math.floor(Math.random() * numRows);
        starty = Math.floor(Math.random() * numRows);
    }
    revealCell(startx, starty);
    renderBoard();
});




console.log(board);


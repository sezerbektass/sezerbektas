const rows = 9;
const cols = 9;
const mineCount = 10;
let minefield = document.getElementById("minefield");

let field = [];
let gameOver = false;

function createBoard() {
  field = [];
  minefield.innerHTML = "";
  gameOver = false;

  // Tüm hücreleri oluştur
  for (let r = 0; r < rows; r++) {
    field[r] = [];
    for (let c = 0; c < cols; c++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", clickCell);
      minefield.appendChild(cell);
      field[r][c] = { mine: false, revealed: false, element: cell };
    }
  }

  // Mayınları rastgele yerleştir
  let placed = 0;
  while (placed < mineCount) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);
    if (!field[r][c].mine) {
      field[r][c].mine = true;
      placed++;
    }
  }
}

function clickCell(e) {
  if (gameOver) return;

  let row = parseInt(e.target.dataset.row);
  let col = parseInt(e.target.dataset.col);
  let cell = field[row][col];

  if (cell.revealed) return;

  cell.revealed = true;
  cell.element.classList.add("revealed");

  if (cell.mine) {
    cell.element.textContent = "💣";
    alert("BOOM! Oyun bitti.");
    gameOver = true;
    revealAll();
  } else {
    let count = countMines(row, col);
    if (count > 0) {
      cell.element.textContent = count;
    } else {
      // Etrafı aç
      revealAround(row, col);
    }
  }
}

function countMines(r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      let nr = r + dr;
      let nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && field[nr][nc].mine) {
        count++;
      }
    }
  }
  return count;
}

function revealAround(r, c) {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      let nr = r + dr;
      let nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !field[nr][nc].revealed
      ) {
        clickCell({ target: field[nr][nc].element });
      }
    }
  }
}

function revealAll() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (field[r][c].mine) {
        field[r][c].element.textContent = "💣";
        field[r][c].element.classList.add("revealed");
      }
    }
  }
}

createBoard();

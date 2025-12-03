const submitBtn = document.getElementById("submit");
const gameSection = document.querySelector(".game");
const inputSection = document.querySelector(".player-input");
const message = document.querySelector(".message");

let player1 = "";
let player2 = "";
let turn = "X";    // Player 1 = X, Player 2 = O
let currentPlayer = "";

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names");
    return;
  }

  inputSection.style.display = "none";
  gameSection.style.display = "block";

  currentPlayer = player1;
  message.innerText = `${currentPlayer}, you're up`;
});

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.innerText !== "") return;

    cell.innerText = turn;

    if (checkWinner()) {
      message.innerText = `${currentPlayer}, congratulations you won! 🎉`;
      disableBoard();
      return;
    }

    if (boardFull()) {
      message.innerText = "Match Draw!";
      return;
    }

    if (turn === "X") {
      turn = "O";
      currentPlayer = player2;
    } else {
      turn = "X";
      currentPlayer = player1;
    }

    message.innerText = `${currentPlayer}, you're up`;
  });
});

function boardFull() {
  return [...cells].every(cell => cell.innerText !== "");
}

function disableBoard() {
  cells.forEach(c => c.style.pointerEvents = "none");
}

function checkWinner() {
  const winPatterns = [
    [1,2,3],[4,5,6],[7,8,9],  // rows
    [1,4,7],[2,5,8],[3,6,9],  // columns
    [1,5,9],[3,5,7]           // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return document.getElementById(a).innerText !== "" &&
           document.getElementById(a).innerText === document.getElementById(b).innerText &&
           document.getElementById(b).innerText === document.getElementById(c).innerText;
  });
}

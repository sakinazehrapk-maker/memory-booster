let currentNumber = "";
let gameActive = false;

function startNumberGame() {
  const gameArea = document.getElementById("gameArea");

  gameActive = true;
  gameArea.innerHTML = "";

  currentNumber = generateNumber(5);

  gameArea.innerHTML = `
    <h2>Memorize this number:</h2>
    <h1 id="numberDisplay">${currentNumber}</h1>
  `;
  setTimeout(() => {
    gameArea.innerHTML = `
      <h2>Enter the number you saw:</h2>
      <input id="userInput" type="text" />
      <button onclick="checkAnswer()">Submit</button>
    `;
  }, 3000);
}

function checkAnswer() {
  const userValue = document.getElementById("userInput").value;
  const gameArea = document.getElementById("gameArea");

  if (userValue === currentNumber) {
    gameArea.innerHTML = `
      <h2>Correct!</h2>
      <p>You have a strong memory</p>
      <button onclick="startNumberGame()">Play Again</button>
    `;
  } else {
    gameArea.innerHTML = `
      <h2>Wrong!</h2>
      <p>Correct was: ${currentNumber}</p>
      <button onclick="startNumberGame()">Try Again</button>
    `;
  }
}
function generateNumber(length) {
  let num = "";
  for (let i = 0; i < length; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

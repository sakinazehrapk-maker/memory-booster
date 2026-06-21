let currentNumber = "";
let score = 0;
let level = 1;
let streak = 0;
let currentNumber = "";
let gameActive = false;

function startNumberGame() {
  const gameArea = document.getElementById("gameArea");

  gameActive = true;
  gameArea.innerHTML = "";

  let digits=4+level;
  currentNumber=generateNumber(digits);
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
    score += 10;
    streak += 1;
    if (streak % 3 === 0) {
      level++;
    }
    updateStats();
    gameArea.innerHTML = `
      <h2>Correct!</h2>
      <p>+10 points</p>
      <button onclick="startNumberGame()">Next Round</button>
    `;
  } else {
    streak = 0;
    updateStats();
    gameArea.innerHTML = `
      <h2>Wrong!</h2>
      <p>The correct number was:</p>
      <h3>${currentNumber}</h3>
      <button onclick="startNumberGame()">Try Again</button>
    `;
  }
}
function generateNumber(length){
  let num = "";
  for (let i = 0; i < length; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}
function updateStats() {
  document.getElementById("score").textContent = score;
  document.getElementById("level").textContent = level;
  document.getElementById("streak").textContent = streak;
}
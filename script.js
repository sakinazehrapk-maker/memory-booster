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
  }else{
    streak=0;
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
  let num="";
  for(let i=0;i<length;i++){
    num+=Math.floor(Math.random()*10);
  }
  return num;
}
function updateStats() {
  document.getElementById("score").textContent = score;
  document.getElementById("level").textContent = level;
  document.getElementById("streak").textContent = streak;
}
let pattern=[];
let userPattern=[];
let patternLevel=3;
function startPatternGame(){
  pattern=[];
  userPattern=[];
  const gameArea=document.getElementById("gameArea");
  gameArea.innerHTML=`
    <h2>Pattern Recall</h2>
    <p>Watch the highlighted squares carefully!</p>
    <div id="grid" class="grid">
      ${Array.from({ length: 9 }, (_, i) =>
        `<div class="cell" data-index="${i}"></div>`
      ).join("")}
    </div>
  `;
  generatePattern();
}
function generatePattern(){
  for (let i=0;i<patternLevel;i++){
    pattern.push(Math.floor(Math.random()*9));
  }
  showPattern();
}
function showPattern(){
  const cells=document.querySelectorAll(".cell");

  pattern.forEach((index, step)=>{
    setTimeout(()=>{
      cells[index].classList.add("active");

      setTimeout(()=>{
        cells[index].classList.remove("active");
      },500);

    }, step*800);
  });
  setTimeout(enableClicks, pattern.length * 800 + 500);
}
function enableClicks(){
  const cells=document.querySelectorAll(".cell");
  cells.forEach(cell=>{
    cell.addEventListener("click", handleCellClick);
  });
}
function handleCellClick(){
  const index=Number(this.dataset.index);
  userPattern.push(index);
  this.classList.add("active");
  setTimeout(()=>{
    this.classList.remove("active");
  }, 200);
  const current=userPattern.length-1;
  if (userPattern[current] !== pattern[current]) {
    losePatternGame();
    return;
  }
  if (userPattern.length===pattern.length){
    winPatternGame();
  }
}
function winPatternGame(){
  score+=15;
  streak++;
  patternLevel++;
  updateStats();
  document.getElementById("gameArea").innerHTML = `
    <h2>Correct Pattern!</h2>
    <p>Next level: ${patternLevel}</p>
    <button onclick="startPatternGame()">Next Round</button>
  `;
}
function losePatternGame() {
  streak=0;
  updateStats();
  document.getElementById("gameArea").innerHTML = `
    <h2>Wrong Pattern</h2>
    <p>Try Again</p>
    <button onclick="startPatternGame()">Play Again</button>
  `;
}

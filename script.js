let currentNumber = "";
let score = 0;
let level = 1;
let streak = 0;
let gameActive = false;
const words=[
  "apple",
  "river",
  "tiger",
  "moon",
  "ocean",
  "flower",
  "castle",
  "forest",
  "rocket",
  "mountain"
];
let currentWords=[];
let wordLevel=1;
let timer=60;
let timerInterval=null;
let timerMode=false;
let mathAnswer=0;
let mathLevel=1;
let pattern=[];
let userPattern=[];
let patternLevel=3;
loadProgress();

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
    if (timerMode && userValue === currentNumber) {score += 5;}
    updateStats();
    saveProgress();
    gameArea.innerHTML = `
      <h2>Correct!</h2>
      <p>+10 points</p>
      <button onclick="startNumberGame()">Next Round</button>
    `;
  }else{
    streak=0;
    updateStats();
    saveProgress();
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
  if (timerMode && userValue === currentNumber) {score += 5;}
  updateStats();
  saveProgress();
  document.getElementById("gameArea").innerHTML = `
    <h2>Correct Pattern!</h2>
    <p>Next level: ${patternLevel}</p>
    <button onclick="startPatternGame()">Next Round</button>
  `;
}
function losePatternGame(){
  streak=0;
  updateStats();
  saveProgress();
  document.getElementById("gameArea").innerHTML = `
    <h2>Wrong Pattern</h2>
    <p>Try Again</p>
    <button onclick="startPatternGame()">Play Again</button>
  `;
}
function startWordGame(){
  const gameArea=document.getElementById("gameArea");
  currentWords=[];
  const numberOfWords=2+wordLevel;
  while (currentWords.length<numberOfWords){
    const randomWord=
      words[Math.floor(Math.random()*words.length)];
    if (!currentWords.includes(randomWord)){
      currentWords.push(randomWord);
    }
  }
  gameArea.innerHTML=`
    <h2>Memorize These Words</h2>
    <h1>${currentWords.join(" ")}</h1>
  `;
  setTimeout(()=>{
    gameArea.innerHTML= `
      <h2>Type the words in order</h2>
      <input
        type="text"
        id="wordInput"
        placeholder="Enter words separated by spaces"
      >
      <button onclick="checkWordAnswer()">
        Submit
      </button>
    `;
  }, 5000);
}
function checkWordAnswer(){
  const userInput=
    document.getElementById("wordInput")
      .value
      .trim()
      .toLowerCase();
  const correctAnswer=
    currentWords.join(" ").toLowerCase();
  const gameArea=
    document.getElementById("gameArea");
  if (userInput===correctAnswer){
    score+=20;
    streak++;
    wordLevel++;
    if (timerMode && userValue === currentNumber) {score += 5;}
    updateStats();
    saveProgress();
    gameArea.innerHTML= `
      <h2>Correct!</h2>
      <p>+20 Points</p>
      <p>Word Level: ${wordLevel}</p>
      <button onclick="startWordGame()">
        Next Round
      </button>
    `;
  }else{
    streak=0;
    updateStats();
    saveProgress();
    gameArea.innerHTML= `
      <h2>Wrong!</h2>
      <p>Correct Answer:</p>
      <h3>${correctAnswer}</h3>
      <button onclick="startWordGame()">
        Try Again
      </button>
    `;
  }
}
function loadProgress(){
  const saved=JSON.parse(localStorage.getItem("memoryBooster"));
  if (saved){
    score = saved.score||0;
    level = saved.level||1;
    streak = saved.streak||0;
    patternLevel = saved.patternLevel||3;
    wordLevel = saved.wordLevel||1;
  }
  updateStats();
}
function saveProgress(){
  const data={
    score,
    level,
    streak,
    patternLevel,
    wordLevel
  };
  localStorage.setItem("memoryBooster", JSON.stringify(data));
}
function resetProgress(){
  localStorage.removeItem("memoryBooster");
  score=0;
  level=1;
  streak=0;
  patternLevel=3;
  wordLevel = 1;
  updateStats();
  document.getElementById("gameArea").innerHTML =
    "<h2>Progress Reset</h2>";
}
function startTimerMode(){
  timerMode=true;
  timer=60;
  updateTimerDisplay();
  timerInterval=setInterval(()=>{
    timer--;
    updateTimerDisplay();
    if (timer<=0){
      endTimerMode();
    }
  }, 1000);
}
function updateTimerDisplay(){
  document.getElementById("timer").textContent=timer;
}
function endTimerMode(){
  clearInterval(timerInterval);
  timerMode=false;
  document.getElementById("gameArea").innerHTML = `
    <h2>⏱Time's Up!</h2>
    <p>Final Score: ${score}</p>
    <p>Level Reached: ${level}</p>
    <button onclick="resetTimerMode()">
      Play Again
    </button>
  `;
}
function resetTimerMode(){
  score=0;
  level=1;
  streak=0;
  updateStats();
  startTimerMode();
}
function startHardcoreMode(){
  score=0;
  level=1;
  streak=0;
  updateStats();
  startTimerMode();
  startNumberGame();
}
function startMathGame(){
  const gameArea=document.getElementById("gameArea");
  const a=Math.floor(Math.random()*(10*mathLevel));
  const b=Math.floor(Math.random()*(10*mathLevel));
  const operations=["+","-","*"];
  const op=operations[Math.floor(Math.random()*operations.length)];
  if (op==="+")mathAnswer=a+b;
  if (op==="-")mathAnswer=a-b;
  if (op==="*")mathAnswer=a*b;
  gameArea.innerHTML=`
    <h2>Solve Quickly!</h2>
    <h1>${a} ${op} ${b} = ?</h1>
    <input id="mathInput" type="number" placeholder="Your answer">
    <button onclick="checkMathAnswer()">Submit</button>
  `;
}
function checkMathAnswer(){
  const userValue=Number(document.getElementById("mathInput").value);
  const gameArea=document.getElementById("gameArea");
  if (userValue===mathAnswer){
    score+=timerMode ? 5 : 10;
    streak++;
    if (streak%3===0){
      mathLevel++;
    }
    updateStats();
    saveProgress();
    gameArea.innerHTML=`
      <h2>Correct!</h2>
      <p>Math Level: ${mathLevel}</p>
      <button onclick="startMathGame()">Next Question</button>
    `;
  }else{
    streak=0;
    updateStats();
    saveProgress();
    gameArea.innerHTML=`
      <h2>Wrong!</h2>
      <p>Correct Answer: ${mathAnswer}</p>
      <button onclick="startMathGame()">Try Again</button>
    `;
  }
}
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");
const modeBtn = document.querySelector(".btn-mode");
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");
const modeIndentifier = document.querySelector(".mode-indentifier");

let myInterval;
let totalSeconds;
let isRunning = false;
let isStudyMode = true; // true = studing (25), false = break (10)

const STUDY_TIME = 25 * 60;
const BREAK_TIME = 10 * 60;

function setInitialTime() {
  totalSeconds = isStudyMode ? STUDY_TIME : BREAK_TIME;
  updateDisplay();
}

function updateDisplay() {
  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;
  minuteDiv.textContent = String(minutesLeft).padStart(2, "0");
  secondDiv.textContent = String(secondsLeft).padStart(2, "0");
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;

  myInterval = setInterval(() => {
    totalSeconds--;

    if (totalSeconds <= 0) {
      clearInterval(myInterval);
      isRunning = false;
      isStudyMode = !isStudyMode;
      setInitialTime();
      startTimer();
      updateModeButton();
    } else {
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;

  clearInterval(myInterval);
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(myInterval);
  isRunning = false;
  setInitialTime();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function switchMode() {
  isStudyMode = !isStudyMode;
  updateModeButton();
  resetTimer();
}

function updateModeButton() {
  modeBtn.textContent = isStudyMode ? "Switch to Break" : "Switch to Study";
  modeIndentifier.textContent = isStudyMode ? "study" : "break";
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
modeBtn.addEventListener("click", switchMode);

setInitialTime();
updateModeButton();
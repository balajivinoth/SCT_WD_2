let startTime = 0;
let elapsedTime = 0;
let intervalId;
let running = false;

const timeDisplay = document.querySelector('#time');
const lapsList = document.querySelector('#laps');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const lapButton = document.querySelector('#lap');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

function start() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(intervalId);
    running = false;
  }
}

function reset() {
  clearInterval(intervalId);
  running = false;
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = '';
}

function lap() {
  if (running) {
    const lapTime = document.createElement('li');
    lapTime.textContent = formatTime(elapsedTime);
    lapsList.appendChild(lapTime);
  }
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

updateDisplay();

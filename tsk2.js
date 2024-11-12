let timer;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isRunning = false;

const startStopButton = document.getElementById("startStop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const lapList = document.getElementById("lapList");

function updateDisplay() {
  millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
  secondsDisplay.textContent = seconds.toString().padStart(2, '0');
  minutesDisplay.textContent = minutes.toString().padStart(2, '0');
}

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    startStopButton.textContent = "Start";
  } else {
    timer = setInterval(() => {
      milliseconds += 1;
      if (milliseconds >= 100) {
        milliseconds = 0;
        seconds += 1;
      }
      if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
      }
      updateDisplay();
    }, 10);
    startStopButton.textContent = "Pause";
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  startStopButton.textContent = "Start";
  lapList.innerHTML = ""; // Clear laps
}

function recordLap() {
    if (isRunning) {
      const lapTime = '${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}';
      const lapItem = document.createElement("li");
      lapItem.textContent = 'Lap ${lapList.childElementCount + 1}: ${lapTime}';
      lapList.appendChild(lapItem);
    }
  }

startStopButton.addEventListener("click", startStop);
lapButton.addEventListener("click", recordLap);
resetButton.addEventListener("click", reset);
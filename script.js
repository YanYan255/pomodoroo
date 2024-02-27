let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let isStudyInterval = true;

function startTimer() {
  isRunning = true;
  timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
  isRunning = false;
  clearInterval(timer);
}

function resetTimer() {
  minutes = 25;
  seconds = 0;
  isStudyInterval = true;
  updateDisplay();
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    if (isStudyInterval) {
      minutes = 5; // Break interval duration
      seconds = 0;
      isStudyInterval = false;
      document.getElementById('status-display').textContent = 'Break';
    } else {
      minutes = 25; // Study interval duration
      seconds = 0;
      isStudyInterval = true;
      document.getElementById('status-display').textContent = 'Study';
    }
    playNotificationSound();
  }
  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById('time-display');
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  display.textContent = formattedTime;
}

function playNotificationSound() {
  const audio = document.getElementById('notification-sound');
  audio.currentTime = 0;
  audio.play();
}

document.getElementById('start-btn').addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  } else {
    stopTimer();
  }
});

document.getElementById('reset-btn').addEventListener('click', () => {
  stopTimer();
  resetTimer();
});

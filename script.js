let timer;
let isRunning = false;
let isWorkSession = true;

let timeLeft = 25 * 60;

const timerDisplay = document.getElementById("timer");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

const workInput = document.getElementById("workTime");
const breakInput = document.getElementById("breakTime");

// Update timer display
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Start timer
startBtn.addEventListener("click", () => {
    if (isRunning) return;

    isRunning = true;

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            switchSession();
        }
    }, 1000);
});

// Pause timer
pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
});

// Reset timer
resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    isWorkSession = true;
    timeLeft = workInput.value * 60;
    statusText.textContent = "Work Session";
    updateDisplay();
});

// Switch between work & break
function switchSession() {
    if (isWorkSession) {
        timeLeft = breakInput.value * 60;
        statusText.textContent = "Break Time ☕";
    } else {
        timeLeft = workInput.value * 60;
        statusText.textContent = "Work Session 💻";
    }
    isWorkSession = !isWorkSession;
    updateDisplay();
}

// Initial display
updateDisplay();

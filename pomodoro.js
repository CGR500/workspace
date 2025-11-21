let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("short-timer")
let long = document.getElementById("long-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")
let startBtn = document.getElementById("start")
let pauseBtn = document.getElementById("pause")
let resetBtn = document.getElementById("reset")
let timerMsg = document.getElementById("timer-message")
let button = document.querySelector(".button")

let isPaused = false
let currentTimer = null
let myInterval = null

// show the default timer
function showDefaultTimer() {
    pomodoro.style.display = "block"
    short.style.display = "none"
    long.style.display = "none"
}

showDefaultTimer()

function hideAll() {
    timers.forEach((timer) => (
        timer.style.display = "none"
    ))
}

function showCurrentTimer() {
    timers.forEach((timer) => (
        currentTimer.style.display = "block"
    ))
}

session.addEventListener("click", () => {
    hideAll()

    pomodoro.style.display = "block"

    var snd = new Audio("click.wav");
    snd.play();

    session.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")

    currentTimer = pomodoro
})

shortBreak.addEventListener("click", () => {
    hideAll()

    short.style.display = "block"

    var snd = new Audio("click.wav");
    snd.play();

    session.classList.remove("active")
    shortBreak.classList.add("active")
    longBreak.classList.remove("active")

    currentTimer = short
})

longBreak.addEventListener("click", () => {
    hideAll()

    long.style.display = "block"

    var snd = new Audio("click.wav");
    snd.play();

    session.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.add("active")

    currentTimer = long
})

// Start the timer on click
function startTimer(timerDisplay) {
    if (myInterval) {
        clearInterval(myInterval);
    }

    timerDuration = timerDisplay
        .getAttribute("data-duration")
        .split(":")[0];

    let durationinmiliseconds = timerDuration * 60 * 1000;
    let endTimestamp = Date.now() + durationinmiliseconds;

    myInterval = setInterval(function () {
        const timeRemaining = new Date(endTimestamp - Date.now());

        if (timeRemaining <= 0) {
            clearInterval(myInterval);
            timerDisplay.textContent = "00:00";
            const alarm = new Audio(
                "done-bells.wav"
            );
            alarm.play();
        } else {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds
                .toString()
                .padStart(2, "0")}`;
            timerDisplay.textContent = formattedTime;
        }
    }, 1000);
}

startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(currentTimer)
        timerMsg.style.display = "none"
        var snd = new Audio("click.wav");
        snd.play();
    } else {
        timerMsg.style.display = "block"
        var snd = new Audio("alert.wav");
        snd.play();
    }
})

function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
}

pauseBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(myInterval)
        var snd = new Audio("click.wav");
        snd.play();
    }
    else {
        pauseTimer()
    }
})

resetBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(myInterval)
        const reset = document.getElementById("reset");
        reset.reset();
        var snd = new Audio("click.wav");
        snd.play();
    }
})
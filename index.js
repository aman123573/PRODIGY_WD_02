let timer; // Timer variable
let startTime; // Start time of the stopwatch
let isRunning = false; // Flag to track if stopwatch is running
let lapCounter = 1; // Counter for lap times

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('startStopBtn').innerHTML = 'Start';
        isRunning = false;
    } else {
        startTime = Date.now() - (lapCounter === 1 ? 0 : lapCounter * 1000); // Adjust start time if resuming after a pause
        timer = setInterval(updateDisplay, 10);
        document.getElementById('startStopBtn').innerHTML = 'Stop';
        isRunning = true;
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById('display').innerHTML = '00:00:00';
    document.getElementById('startStopBtn').innerHTML = 'Start';
    document.getElementById('laps').innerHTML = '';
    lapCounter = 1;
    isRunning = false;
}

function lap() {
    if (isRunning) {
        const lapTime = calculateLapTime();
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        document.getElementById('laps').appendChild(lapItem);
        lapCounter++;
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').innerHTML = formattedTime;
}

function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;
    return minutes + ':' + seconds + ':' + milliseconds;
}

function calculateLapTime() {
    const currentLapTime = Date.now() - startTime - (lapCounter * 1000);
    return formatTime(currentLapTime);
}

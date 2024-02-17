const display = document.getElementById("display");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const hourInput = document.getElementById("hour");
const minuteInput = document.getElementById("minute");
const secondInput = document.getElementById("second");

let total = 0; // Initialize total outside the function
let interval = null;

// Function to update the total number of seconds
const totalValues = () => {
    total = Number(hourInput.value) * 3600 + Number(minuteInput.value) * 60 + Number(secondInput.value);
};

// Function to update the timer display
const Timer = () => {
    total--;
    if (total >= 0) {
        const hr = Math.floor(total / 3600);
        const min = Math.floor((total % 3600) / 60);
        const sec = total % 60;
        hourInput.value = hr;
        minuteInput.value = min;
        secondInput.value = sec;
    } else {
        clearInterval(interval);
        display.innerText = "Timer over";
    }
};

start.addEventListener("click", () => {
    clearInterval(interval); // Clear any existing interval
    totalValues(); // Update total
    interval = setInterval(Timer, 1000); // Start the interval
    display.innerText = "Started";
});

stop.addEventListener("click", () => {
    clearInterval(interval); // Stop the interval
    display.innerText = "Stopped";
});

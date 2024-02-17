const form = document.getElementById("form");
const timersList = document.getElementById("current-timers-list");
const timerText = document.getElementById("timer-text");

let uniqueId = 0;
let numberOfActiveTimers = 0;

function updateTime(hh, mm, ss) {
    let totalTime = hh * 3600 + mm * 60 + ss;
    if (totalTime > 0) {
        createTimerElement(hh, mm, ss, totalTime);
        numberOfActiveTimers++;
        if (numberOfActiveTimers > 0) {
            timerText.style.display = "none"
        }
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    uniqueId++;

    let hh = parseInt(document.getElementById("hour").value);
    let mm = parseInt(document.getElementById("minute").value);
    let ss = parseInt(document.getElementById("second").value);
    form.reset();
    updateTime(hh, mm, ss);
});

function createTimerElement(hh, mm, ss, totalTime) {
    const timersItem = document.createElement("div");
    timersItem.id = `timers-item-${uniqueId}`;
    timersItem.classList.add("running-timer");
    timersItem.innerHTML = `
        <p>Time Left:</p>
        <div class="input-Wrraper">
            <input type="number" id="h" min="0" max="23" placeholder="hh" value="${hh}" readonly>
            <p>:</p>
            <input type="number" id="m" min="0" max="59" placeholder="mm" value="${mm}" readonly>
            <p>:</p>
            <input type="number" id="s" min="0" max="59" placeholder="ss" value="${ss}" readonly>
        </div>
        <button class="Delete">Delete</button>
    `;
    timersList.appendChild(timersItem);

    const deleteButton = timersItem.querySelector(".Delete");
    deleteButton.addEventListener("click", () => {
        timersItem.remove();
        numberOfActiveTimers--;

        if (numberOfActiveTimers == 0) {
            timerText.style.display = "flex"
        }
    });

    runTimer(totalTime, timersItem);
}

function runTimer(totalTime, timersItem) {
    let hours = timersItem.querySelector("#h");
    let minutes = timersItem.querySelector("#m");
    let seconds = timersItem.querySelector("#s");

    let interval = setInterval(() => {
        if (totalTime > 0) {
            --totalTime;

            hours.value = Math.floor(totalTime / 3600);
            minutes.value = Math.floor((totalTime % 3600) / 60);
            seconds.value = Math.floor(totalTime % 60);
        } else {
            clearInterval(interval);
            timersItem.className = "completed-timer";
            timersItem.innerHTML = `
                <p>Timer Is Up!</p>
                <button class="Delete stop">Stop</button>
            `;
            let stopButtons = document.querySelectorAll(".stop")
            stopButtons = Array.from(stopButtons)
            stopButtons.map( elem => {
                elem.addEventListener("click",(e)=>{
                    e.target.parentElement.remove()
                })
            })
            // console.log(stopButtons)
        }
    }, 1000);
}

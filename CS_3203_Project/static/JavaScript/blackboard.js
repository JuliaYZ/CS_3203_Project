// <cite><a href="https://github.com/learn-webdevYT/countdown-timer"></a></cite>

var start = document.getElementById('start');
var reset = document.getElementById('reset');

var h = document.getElementById("hour");
var m = document.getElementById("minute");
var s = document.getElementById("sec");

//store a reference to the startTimer variable
var startTimer = null;

var SS = document.getElementById("SS");
var ss1 = document.getElementById("ss1");
var ss2 = document.getElementById("ss2");
var ss3 = document.getElementById("ss3");
var textPos = document.getElementById("textPos");

function startBTN() {
    SS.style.display = "none";
    textPos.style.display = "block";
    ss1.style.display = "block";
    ss2.style.display = "none";
}

function showInput() {
    var display = document.getElementById("display");
    var userGoal = document.getElementById("userGoal");

    ss1.style.display = "none";
    ss2.style.display = "block";

    display.innerHTML = userGoal.value;
}

function finish() {
    ss3.style.display = "none";
    SS.style.display = "block";
    stopInterval();
}

function nextGoal() {
    ss3.style.display = "none";
    textPos.style.display = "block";
    ss1.style.display = "block";
    ss2.style.display = "none";
    stopInterval();
}

start.addEventListener('click', function () {
    //initialize the variable
    function startInterval() {
        startTimer = setInterval(function () {
            timer();
        }, 1000);
    }
    startInterval();
})

reset.addEventListener('click', function () {
    h.value = 0;
    m.value = 0;
    s.value = 0;

    ss1.style.display = "block";
    ss2.style.display = "none";
    //stop the timer after pressing "reset"
    stopInterval();
})

function timer() {
    if (h.value == 0 && m.value == 0 && s.value == 0) {
        h.value = 0;
        m.value = 0;
        s.value = 0;
    } else if (s.value != 0) {
        s.value--;
    } else if (m.value != 0 && s.value == 0) {
        s.value = 59;
        m.value--;
    } else if (h.value != 0 && m.value == 0) {
        m.value = 60;
        h.value--;
    }

    if (h.value == 0 && m.value == 0 && s.value == 0) {
        textPos.style.display = "none";
        ss3.style.display = "block";
    }
    return;
}

//stop the function after pressing the reset button, 
//so the time wont go down when selecting a new time after pressing reset
function stopInterval() {
    clearInterval(startTimer);
}

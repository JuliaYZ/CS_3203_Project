function myCheckList() {
    var x = document.getElementById("checkList");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function xcl() {
    var x = document.getElementById("checkList");
    x.style.display = "none";
}

// <cite><a href="https://github.com/CodeExplainedRepo/To-Do-List"></a></cite>

// define and initialize the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Show todays date
let options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
};
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    loadToDo(LIST);
    id = LIST.length;
} else {
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadToDo(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});

// add to do function
function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const text = `<li class = "item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
}

// add an item to the list user the enter key
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            // add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            input.value = "";
            id++;
        }

    }
});

// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function (event) {
    let element = event.target;
    const elementJOB = event.target.attributes.job.value;
    if (elementJOB == "complete") {
        completeToDo(element);
    } else if (elementJOB == "delete") {
        removeToDo(element);
    }

    // add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

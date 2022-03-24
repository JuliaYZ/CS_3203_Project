// <cite><a href="https://github.com/dcode-youtube/notes-app-javascript-localstorage"></a></cite>

function myStickNotes() {
    var x = document.getElementById("stickNotes");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

import App from "./App.js";

const root = document.getElementById("app");
const app = new App(root);
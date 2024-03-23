"use strict";

let open = false;
setTimeout(() => {
    console.log("opening");
    open = true;
}, 100);

setInterval(() => {
    if (!open) {
        console.log("waiting");
    }
}, 10);


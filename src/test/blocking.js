"use strict";

let open = false;
setTimeout(() => {
    console.log("opening");
    open = true;
}, 100);

while (!open) {
    console.log("waiting");
}


"use strict";

const path = require("path");
const fs = require("fs");
const {Worker} = require("worker_threads");

// Create worker thread
const worker = new Worker(path.join(__dirname, "encrypt_worker.js"));

worker.on("message", msg => {
    if (msg?.type === "done") {
        console.log(`File encrypted to ${msg.output}`);
        console.log(`The key is ${msg.key} - don't lose it!`);
    }
});

// argument should contain a list of files name to be encrypted
// it is assumed that "resources" folder contains the mentioned files
for (let i = 2; i < process.argv.length; i++) {
    let file =  process.argv[i];
    let fileToEncrypt = path.join(__dirname, "../../resources", file).normalize();

    if (!fs.existsSync((fileToEncrypt))) {
        console.error(`${fileToEncrypt} not exist`);
        process.exit(1);
    }

    worker.postMessage(fileToEncrypt);
}

"use strict";

const { Worker, isMainThread, parentPort, threadId } = require('node:worker_threads');
const maxWorkers = 3; // maximum number of workers in pool.
const workerPool = [];
// tasks to be distributed among workers.
const tasks = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12', 't13'];

function toGMTTime(timestamp) {
    let time = timestamp;
    const ms = Math.floor(time % 1000);
    time /= 1000;
    const sec = Math.floor(time % 60);
    time /= 60;
    const min = Math.floor(time % 60);
    time /= 60;
    const hr = Math.floor(time % 24);
    return `${hr}:${min}:${sec}.${ms}`;
}

if (isMainThread) { // This is the main thread.
    // Create a pool of workers.
    for (let i = 0; i < maxWorkers; i++) {
        const worker = new Worker(__filename);
        worker.state = 0;
        workerPool.push(worker);
    }
    // sending tasks to workers
    let index = 0;
    const id = setInterval(() => {
        if (index < tasks.length){
            let i = index % maxWorkers;
            workerPool[i].postMessage(tasks[index]);
            console.log(`${toGMTTime(Date.now())}: Sent task ${tasks[index]} to worker${i+1} (${++workerPool[i].state})`);
            index++;
        } else {
            clearInterval(id);
        }
    }, 100)

    // Listen for messages from workers.
    workerPool.forEach(worker => {
        worker.on('error', error => {
            console.error(`${toGMTTime(Date.now())}: Worker error: ${error}`);
        });
        worker.on('message', message => {
            console.log(`${toGMTTime(Date.now())}: Received message: ${message} (${--worker.state})`);
        });
    });
    // checking for threads state in pool
    const intervalId = setInterval(() => {
        if (workerPool.every(worker => worker.state === 0)) { // exit when all tasks are fulfilled.
            clearInterval(intervalId);
            process.exit(0); // exit if all threads in pool has idle state
        }
    }, 1000);

} else { // This is a worker thread.
    parentPort.on('message', task => { // Listen for tasks from the main thread.
        //console.log(`worker${threadId}: received task: ${task}`);
        // Process the task...
        const timeoutId = setTimeout(() => {
            parentPort.postMessage(`Task ${task} processed by worker${threadId}`);
            clearTimeout(timeoutId);
        }, Math.random()*500)
    });
}


# Node.js_Worker_Thread
Explained how to create worker threads in Node.js environment
Node.js worker threads are designed to help avoid blocking the event loop
by offloading CPU-intensive tasks to separate threads which allows 
the main event loop to remain responsive to I/O operations and other asynchronous tasks, 
thereby improving the overall performance and scalability of Node.js applications.

The current repository contains simple JavaScripts that allow to use worker thread and 
pool of worker threads so that prevents blocking of main event loop.

To be run worker threads pool that encrypting given file(s) the following commands has to be done:

    $cd <project root>/src/worker_thread/pool
    $node encrypt-main.js tmp.txt tmp1.txt

Text files for encrypt should be exist in __\<project root\>/resources__ folder
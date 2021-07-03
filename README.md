# Teak.js
https://img.shields.io/npm/v/@skapoor8/teak

A simple async task queue. Preserve order of async tasks.

## Usage

To install:
```bash
npm i @skapoor8/teak
```

Use in node.js:
```javascript
const TaskQueue = require('@skapoor8/teak');

function main() {
    var tq = new TaskQueue();

    var wait = (ms) => new Promise((resolve, reject) => {setTimeout(() => resolve(ms), ms)});

    console.log('Start time:', new Date());
    tq.enqueue(wait, [1000]).then((res) => console.log(`${res} seconds passed. Current time:`, new Date()));
    tq.enqueue(wait, [5000]).then((res) => console.log(`${res} seconds passed. Current time:`, new Date()));
    tq.enqueue(wait, [10000]).then((res) => {
        console.log(`${res} seconds passed. Current time:`, new Date());
        tq.enqueue(wait, [1000]).then(res => console.log(`${res} seconds passed. Current time:`, new Date()));  
    });
}
main();
```

Output in console:
```
Start time: 2021-07-03T21:04:53.536Z
1000 seconds passed. Current time: 2021-07-03T21:04:54.548Z
5000 seconds passed. Current time: 2021-07-03T21:04:59.551Z
10000 seconds passed. Current time: 2021-07-03T21:05:09.552Z
1000 seconds passed. Current time: 2021-07-03T21:05:10.556Z
```

## Use-Cases
Typically async tasks like the one show above can be performed in order by simply using async-await. This is a little trickier on the server side when tasks may be enqueued in response to a http request, and therefore we cannot use the await keyword or chain callbacks to ensure tasks are performed in order. Teak.js can be used in such situations.

Examples:
1. Synchronizing writes to a file in response to requests
2. Unique id generation

## API
1. new TaskQueue()
    - returns a task queue

2. TaskQueue.enqueue(f, args)
    - returns a Promise that is resolved when f is called and resolved
    - f is an async function
    - args is an array of arguments expected by f


## Possible Improvements

1. Needs thorough testing, especially in browser environment
2. Needs ES6 wrapper
3. Is error handling idiomatic?
4. Can interface be better?
5. What happens when an enqueued function throws an error?

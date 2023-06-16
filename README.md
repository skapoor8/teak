# Teak.js

![npm (scoped)](https://img.shields.io/npm/v/@skapoor8/teak)

A simple async task queue. Preserve order of async tasks.

## Getting Started

To install:

```bash
npm i @skapoor8/teak
```

## Features

### Queue async tasks from different requests on the server

Use in node.js:

```javascript
const TaskQueue = require("@skapoor8/teak");

function main() {
  var tq = new TaskQueue();

  var wait = (ms) =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(ms), ms);
    });

  console.log("Start time:", new Date());
  tq.enqueue(wait, [1000]).then((res) =>
    console.log(`${res} seconds passed. Current time:`, new Date())
  );
  tq.enqueue(wait, [5000]).then((res) =>
    console.log(`${res} seconds passed. Current time:`, new Date())
  );
  tq.enqueue(wait, [10000]).then((res) => {
    console.log(`${res} seconds passed. Current time:`, new Date());
    tq.enqueue(wait, [1000]).then((res) =>
      console.log(`${res} seconds passed. Current time:`, new Date())
    );
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

## Motivation

Typically async tasks like the one show above can be performed in order by simply using async-await. This is a little trickier on the server side when tasks may be enqueued in response to a http request, and therefore we cannot use the await keyword or chain callbacks to ensure tasks are performed in order. Teak.js can be used in such situations.

Specifically, I wrote teak.js when I was working on an embedded database, and wanted to queue sequential writes to the same record coming from different requests.

## Future Directions

1. Add unit tests
2. Add an ES6 wrapper

## API

1. new TaskQueue()

   - returns a task queue

2. TaskQueue.enqueue(f, args)
   - returns a Promise that is resolved when f is called and resolved
   - f is an async function
   - args is an array of arguments expected by f

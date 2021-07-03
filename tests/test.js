const TaskQueue = require('./src/taskQueue.cjs');

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
var Queue = require('./queue.cjs');

class TaskQueue extends Queue {
    constructor() {
        super();
        this.isActive = false;
    }

    enqueue(action, args) {
        // console.log(`TaskQueue.enqueue(${action}, ${args})`);
        return new Promise((resolve, reject) => {
            super.enqueue({action, args, resolve, reject});
            this.dequeue();
        });
    }

    async dequeue() {
        if (!this.isActive) {
            this.isActive = true;
            while(!super.isEmpty()) {
                try {
                    var toResolve = super.dequeue();
                    var result = await toResolve.action(... toResolve.args);
                    toResolve.resolve(result);
                } catch(e) {
                    toResolve.reject(e);
                } 
            }
            this.isActive = false;
        }
    }
}

module.exports = TaskQueue;
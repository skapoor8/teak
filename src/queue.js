class Queue {
    constructor() {
        this.q = [];
    }

    get length() {return this.q.length;}

    isEmpty() {
        return this.q.length == 0;
    }

    enqueue(item) {
        this.q.push(item);
    }

    dequeue() {
        return this.q.shift();
    }

    toString() {
        return this.q.toString();
    }
}

module.exports = Queue;
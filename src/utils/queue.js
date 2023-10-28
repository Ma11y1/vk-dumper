import { LinkedList } from "./linkedList.js";

class Queue extends LinkedList {

    constructor() {
        super();
    }

    queue(item) {
        this.addHead(item);
    }

    dequeue() {
        const item = this._head.value;
        this.removeHead();
        return item;
    }

}
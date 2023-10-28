export class LinkedList {

    constructor() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    [Symbol.iterator]() {
        const _this = this;
        let current = this._head;

        return {
            next() {
                if(!current) return { done: true };
                const result = { value: current.value };
                current = current.next;
                return result;
            }
        }
    }

    /** @param { * } item */
    add(item) {
        const node= {
            next: null,
            prev: null,
            value: item
        }

        if(this._head) {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
        }else {
            this._head = node;
            this._tail = node;
        }

        this._size++;
    }

    addHead(item) {
        const node= {
            next: null,
            prev: null,
            value: item
        }

        if(this._head) {
            node.next = this._head;
            this._head.prev = node;
            this._head = node;
        }else {
            this._head = node;
            this._tail = node;
        }

        this._size++;
    }

    remove(item) {
        if(this._size <= 0) return;

        let current = this._head;
        while(current.next) {
            if(current.value === item) {
                if(current.prev) current.prev.next = current.next;
                if(current.next) current.next.prev = current.prev;
                current.value = null;
                current.next = null;
                current.prev = null;
            }

            current = current.next;
        }

        this._size--;
    }

    removeHead() {
        this.remove(this._head);
    }

    clear() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    get size() {
        return this._size;
    }

    get isEmpty() {
        return this._size <= 0;
    }
}
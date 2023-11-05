export class Storage {
    static _items = {};

    static set(key, item) {
        this._items[key] = item;
    }

    static get(key) {
        return this._items[key];
    }

    static has(key) {
        return !!this._items[key];
    }

    static remove(key) {
        this._items[key] = undefined;
    }

    static clear() {
        this._items = {};
    }
}
export class Storage {
    static _data = {};

    static set(key, value) {
        if(!key || !value) return false;
        this._data[key] = value;
        return true;
    }

    static get(key) {
        return this._data[key];
    }

    static remove(key) {
        this._data[key] = null;
    }

    static has(key) {
        return !!this._data[key];
    }

    static get keys() {
        return Object.keys(this._data);
    }

    static get values() {
        return Object.values(this._data);
    }
}
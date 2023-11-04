export class PageElement {

    constructor(data) {
        this.isPageElement = true;

        this._objectData = null;
        this._data = "";

        this.isGenerated = false;

        this.generate(data);
    }

    generate(data) {
        if(!data || typeof data !== "object") {
            data = {};
        }

        this._objectData = data;
        this.isGenerated = true;
    }

    toString() {
        return this._data;
    }

    get objectData() {
        return this._objectData;
    }

    get data() {
        return this._data;
    }

    set objectData(value) {
        if(!value || typeof value !== "object") return;
        this._objectData = value;
        this.generate(value);
    }
}
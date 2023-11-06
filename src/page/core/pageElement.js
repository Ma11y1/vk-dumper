export class PageElement {

    constructor() {
        this.isPageElement = true;

        this._objectData = null;
        this._data = "";

        this.isGenerated = false;
    }

    generate(data) {
        if(!data || typeof data !== "object") {
            return;
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
        if(!value || typeof value !== "object") {
            return;
        }
        this.generate(value);
    }
}
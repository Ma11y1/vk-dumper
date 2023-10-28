export class PageElement {

    constructor() {
        this.isPageElement = true;
        this._data = "";

        this.isGenerated = false;
    }

    generate(data) {}

    toString() {
        return this._data;
    }

    get data() {
        return this._data;
    }
}
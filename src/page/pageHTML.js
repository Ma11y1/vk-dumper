import { Page } from "./page.js";
import { objectToHTML } from "./generators/index.js";


export class PageHTML extends Page {

    constructor(path, data) {
        super(path = path.endsWith(".html") ? path : path + ".html", data);
        this.isPageHTML = true;

        this._header = this._header || {};
        this._body = this._body || {};
    }

    generate(data) {
        if(!data || typeof data !== "object") {
            data = {
                html: {
                    header: {},
                    body: {}
                }
            };
        }

        if(!data.html || typeof data.html !== "object") {
            data = { html: data };
        }

        if(!data.html.header || typeof data.html.header !== "object") {
            data.html.header = {};
        }

        if(!data.html.body || typeof data.html.body !== "object") {
            data.html.body = {};
        }

        this._header = data.html.header;
        this._body = data.html.body;

        super.generate(data);
        this._data = objectToHTML(data);
    }

    get header() {
        return this._header;
    }

    get body() {
        return this._body;
    }

    set header(value) {
        if(!value || typeof value !== "object") return;

        this._header = value;
        this._objectData.html.header = value;
        this.isGenerated = false;

        this.generate(this._objectData);
    }

    set body(value) {
        if(!value || typeof value !== "object") return;

        this._body = value;
        this._objectData.html.body = value;
        this.isGenerated = false;

        this.generate(this._objectData);
    }
}
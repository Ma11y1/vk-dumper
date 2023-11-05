import { Page } from "./page.js";
import { objectToHTML } from "./generators/index.js";


export class PageHTML extends Page {

    constructor(path, data) {
        super(path.endsWith(".html") ? path : path + ".html", data);
        this.isPageHTML = true;

        this._header = this._header || {};
        this._body = this._body || {};
        this._styles = [];
        this._sctipts = [];
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

    /**
     * @param { PageCSS || string || { type: "link", params: { rel: "stylesheet", href: string } } } data
     */
    addStyle(data) {
        if(!data) return;

        if(data.type) {
            this._styles.push(data);
        } else {
            this._styles.push({
                type: "link",
                params: {
                    rel: "stylesheet",
                    href: data.isPageCSS ? data.path.full : data
                }
            });
        }
    }

    /**
     * @param { PageScript || string || { type: "script", params: { defer: null, src: string } } } data
     * @param { {} } advancedParams
     */
    addScript(data, advancedParams) {
        if(!data) return;

        if(data.isPageScript) {
            this._sctipts.push(data.objectData);
        }

        if(data.type) {
            this._styles.push(data);
        } else {
            this._sctipts.push({
                type: "script",
                params: {
                    ...advancedParams,
                    src: data
                }
            });
        }
    }

    getHTMLElementFilePath(title = "link", params) {
        return objectToHTML({
                type: "a",
                value: title,
                params: {
                    href: this._path.full,
                    ...params
                }
        });
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
    }

    set body(value) {
        if(!value || typeof value !== "object") return;

        this._body = value;
        this._objectData.html.body = value;
        this.isGenerated = false;
    }

    set styles(value) {
        if(!Array.isArray(value)) return;

        this._styles = value;
        this.isGenerated = false;
    }

    set scripts(value) {
        if(!Array.isArray(value)) return;

        this._sctipts = value;
        this.isGenerated = false;
    }
}
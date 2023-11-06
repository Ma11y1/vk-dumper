import { Page } from "./page.js";
import { objectToHTML } from "./generators/index.js";
import { isItemsArr1IntoArr2 } from "../../utils/index.js";


export class PageHTML extends Page {

    constructor(path, styles = [], scripts = []) {
        super(path);
        this.isPageHTML = true;

        this._head = this._head || {};
        this._body = this._body || {};
        this._styles = styles;
        this._sctipts = scripts;
    }

    generate(data) {
        if(!data || typeof data !== "object") {
            data = {
                html: {
                    head: [],
                    body: []
                }
            };
        }

        if(!data.html || typeof data.html !== "object") {
            data = { html: data };
        }

        if(data.html.head === undefined || !Array.isArray(data.html.head)) {
            data.html.head = [];

        }
        if(data.html.body === undefined || !Array.isArray(data.html.body)) {
            data.html.body = [];
        }

        if(this._styles && !isItemsArr1IntoArr2(this._styles, data.html.head)){
            data.html.head.push(...this._styles);
        }

        if(this._sctipts && !isItemsArr1IntoArr2(this._sctipts, data.html.head)){
            data.html.head.push(...this._sctipts);
        }

        this._head = data.html.head;
        this._body = data.html.body;

        this._data = objectToHTML(data);
        super.generate(data);
    }

    /**
     * @param { PageCSS || string || { type: "link", params: { rel: "stylesheet", href: string } } } data
     * @param { {} } advancedParams
     */
    addFileStyle(data, advancedParams) {
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

        this.isGenerated = false;
    }

    clearFilesStyles() {
        this._styles.length = 0;
        this.isGenerated = false;
    }

    /**
     * @param { PageScript || string || { type: "script", params: { defer: null, src: string } } } data
     * @param { {} } advancedParams
     */
    addFileScript(data, advancedParams) {
        if(!data) return;


        if(data.type) {
            this._styles.push(data);
        } else {
            this._sctipts.push({
                type: "script",
                params: {
                    ...advancedParams,
                    src: data.isPageScript ? data.path.full : data
                }
            });
        }

        this.isGenerated = false;
    }

    clearFilesScripts() {
        this._sctipts.length = 0;
        this.isGenerated = false;
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

    get head() {
        return this._head;
    }

    get body() {
        return this._body;
    }

    set head(value) {
        if(!value || typeof value !== "object") return;

        this._head = value;
        this._objectData.html.head = value;
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
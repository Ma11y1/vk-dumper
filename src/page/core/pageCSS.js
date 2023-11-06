import { Page } from "./page.js";
import { objectToCss, objectToHTML } from "./generators/index.js";


export class PageCSS extends Page {

    constructor(path, data) {
        super(path.endsWith(".css") ? path : path + ".css");
        this.isPageCSS = true;
        if(data) {
            this.generate(data);
        }
    }

    generate(data) {
        if(!data) return;

        this._objectData = data;
        this._data = objectToCss(data);
        this.isGenerated = true;
    }

    getHTMLElementFilePath(advancedParams) {
        return objectToHTML({
            type: "link",
            params: {
                rel: "stylesheet",
                href: this._path.full,
                ...advancedParams
            }
        });
    }
}
import { Page } from "./page.js";
import { objectToCss } from "./generators/index.js";


export class PageCSS extends Page {

    constructor(path, data) {
        super(path.endsWith(".css") ? path : path + ".css", data);
        this.isPageCSS = true;
    }

    generate(data) {
        if(!data) return;

        this._objectData = data;
        this._data = objectToCss(data);
        this.isGenerated = true;
    }
}
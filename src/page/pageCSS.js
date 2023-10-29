import { Path } from "../io/index.js";
import { Page } from "./page.js";
import { objectToCss } from "./generators/index.js";


export class PageCSS extends Page {

    constructor(path, data) {
        super(path = path.endsWith(".css") ? path : path + ".css", data);
        this.isPageStyle = true;
    }

    generate(data) {
        if(!data) return;

        this._objectData = data;
        this._data = objectToCss(data);
        this.isGenerated = true;
    }
}
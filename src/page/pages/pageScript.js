import { objectToHTML, Page } from "../core/index.js";


export class PageScript extends Page {

    constructor(path, data) {
        super(path.endsWith(".js") ? path : path + ".js", data);
        this.isPageScript = true;
    }

    generate(data) {
        if(!data) return;
        super.generate(data);
        this.data = data;
    }

    getHTMLElementFilePath(advancedParams) {
        return objectToHTML({
            type: "script",
            params: {
                ...advancedParams,
                src: this._path.full
            }
        });
    }
}
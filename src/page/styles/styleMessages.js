import { PageCSS } from "../core/index.js";


export class StyleMessages extends PageCSS {

    constructor(path, custom) {
        super(
            path,
            { ...custom }
        );
    }
}
import { PageCSS } from "../core/index.js";


export class StyleDialogs extends PageCSS {

    constructor(path, custom) {
        super(
            path,
            { ...custom }
        );
    }
}
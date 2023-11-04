import { PageCSS } from "../core/index.js";


export class StyleAttachmentPhoto extends PageCSS {

    constructor(path, custom) {
        super(
            path,
            { ...custom }
        );
    }
}
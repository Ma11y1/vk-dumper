import { PageCSS } from "../core/index.js";


export class StyleAttachmentVideo extends PageCSS {

    constructor(path, custom) {
        super(
            path,
            { ...custom }
        );
    }
}
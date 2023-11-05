import { PageCSS } from "../core/index.js";


export class StyleFriends extends PageCSS {

    constructor(path, custom) {
        super(
            path,
            {
                ...custom
            }
        );
    }
}
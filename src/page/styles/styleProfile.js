import { PageCSS } from "../core/index.js";


export class StyleProfile extends PageCSS {

    constructor(path, custom) {
        super(
            path,
            {
                body: {
                    "background-color": "red"
                },
                ...custom
            }
        );
    }
}
import { PageCSS } from "../core/index.js";


export class StyleBase extends PageCSS {

    constructor(path, custom) {
        super(
            path,
            {
                "*": {
                    margin: 0,
                    padding: 0,
                    "background-color": "#555555"
                },
                ...custom
            });
    }
}
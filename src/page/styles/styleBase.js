import { PageCSS } from "../core/index.js";
import { Config } from "../../config.js";


export class StyleBase extends PageCSS {

    constructor() {
        super(
            Config.pathStyle.base,
            Config.customStyle.base ||
            {
                "*": {
                    margin: 0,
                    padding: 0,
                    "background-color": "#555555"
                }
            });
    }
}
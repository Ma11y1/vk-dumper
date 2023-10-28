import { Page } from "./page.js";
import { DIALOGS_PATH } from "../constants.js";


export class PageDialogs extends Page {

    constructor(name) {
        super(DIALOGS_PATH + name);
        this.isPageDialogs = true;
    }

}
import { PageHTML } from "../core/pageHTML.js";


export class PageDialogs extends PageHTML {

    constructor(path, data) {
        super(path, data);
        this.isPageDialogs = true;
    }

}
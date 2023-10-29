import { PageHTML } from "./pageHTML.js";


export class PageProfile extends PageHTML {

    constructor(path, data) {
        super(path, data);
        this.isPageProfile = true;
    }

}
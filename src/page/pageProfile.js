import { Page } from "./page.js";
import { PROFILE_PATH } from "../constants.js";


export class PageProfile extends Page {

    constructor(name) {
        super(PROFILE_PATH + name);
        this.isPageProfile = true;
    }

}
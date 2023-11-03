import { Dumper } from "./dumper.js";
import { DumperError } from "../error/index.js";
import { PageHTML } from "../page/index.js";
import { PROFILE_PATH } from "../constants.js";


export class DumperProfile extends Dumper {

    constructor(session, style) {
        super(session);

        if(!session.isInit) {
            throw new DumperError("DumperProfile", "constructor", "Argument VK session is not initialize!");
        }

        const objPage = {
            
        };

        this._page = new PageHTML(PROFILE_PATH, objPage);
    }

    dump(path) {

    }

}
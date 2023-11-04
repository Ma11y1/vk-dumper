import { Dumper } from "./dumper.js";
import { DumperError } from "../error/index.js";


export class DumperProfile extends Dumper {

    constructor(session) {
        super(session);

        if(!session.isInit) {
            throw new DumperError("DumperProfile", "constructor()", "Argument VK session is not initialize!");
        }

    }

    dump(path) {

    }

}
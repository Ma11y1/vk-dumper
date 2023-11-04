import { DumperError } from "../error/index.js";


export class Dumper {

    constructor(session) {
        if(!session.isInit) {
            throw new DumperError("Dumper", "constructor()", "Argument VK session is not initialize!");
        }

        this._session = session;
    }

    dump() {

    }
}
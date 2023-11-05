import { DumperError } from "../error/index.js";


export class Dumper {

    constructor(session, dump) {
        if(!(session && session.isInit && dump && dump.isDump)) {
            throw new DumperError("Dumper", "constructor()", "Argument VK session or Dump is invalid!");
        }
        this.isDumper = true;

        this._session = session;
        this._dump = dump;
        this.isProcess = false;
    }

    async start() {}

    get session() {
        return this._session;
    }

    get dump() {
        return this._dump;
    }
}
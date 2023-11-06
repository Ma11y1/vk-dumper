import { EventEmitter } from "events";
import { DumperError } from "../error/index.js";


export class Dumper extends EventEmitter {

    constructor(dump) {
        super();

        if(!(dump && dump.isDump && dump.session && dump.session.isInit)) {
            throw new DumperError(this.constructor.name, "constructor()", "Argument Dump is invalid!");
        }

        this.isDumper = true;

        this._id = dump.session.id;
        this._session = dump.session;
        this._dump = dump;

        this.isStop = false;
        this.isProcess = false;
    }

    async start() {
        this.isProcess = true;
    }

    stop() {
        this.isStop = true;
        this.isProcess = false;
    }

    get id() {
        return this._id;
    }

    get session() {
        return this._session;
    }

    get dump() {
        return this._dump;
    }
}
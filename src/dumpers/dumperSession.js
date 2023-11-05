import { Dumper } from "./dumper.js";


export class DumperSession extends Dumper {

    constructor(vkDumper, session) {
        super(session);
        this._vkDumper = vkDumper;
    }
}
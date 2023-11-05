import { DUMP_TYPE } from "../constants.js";
import { EventEmitter } from "events";


export class Dump extends EventEmitter {

    constructor(session) {
        super();
        this.isDump = true;

        this.sessionID = session.id;
        this.session = session;

        this.tsStart = 0;
        this.tsEnd = 0;
        this.dumpers = {
            session: null,
            profile: null,
            friends: null,
            dialogs: null,
            messages: null,
            attachmentPhoto: null,
            attachmentVideo: null,
        }
        this.types = {
            profile: false,
            friends: false,
            friendsList: false,
            dialogs: false,
            messages: false,
            attachmentPhoto: false,
            attachmentVideo: false
        };
        this.completed = {
            profile: false,
            friends: false,
            friendsList: false,
            dialogs: false,
            messages: false,
            attachmentPhoto: false,
            attachmentVideo: false
        };
        this.pages = {
            profile: null,
            friends: null,
            friendsList: null,
            dialogs: null,
            messages: null,
            attachmentPhoto: null,
            attachmentVideo: null
        };

        this.isForceWrite = false;

        this.isProcess = false;
        this.isWrited = false;
        this.isCompleted = false;
    }

    start() {
        this.tsStart = Date.now();
        this.isProcess = true;
        this.emit("start", this);
    }

    end() {
        this.tsEnd = Date.now();
        this.isProcess = false;
        this.emit("end", this);
    }

    /**
     * @param { DUMP_TYPE || string } type
     */
    complete(type) {
        if(!DUMP_TYPE.has(type)) return;
        const completed = this.completed,
            types = this.types;

        completed[type] = true;
        this.emit(
            "process",
            {
                type,
                ts: Date.now(),
                dumper: this.dumpers[type],
                pages: this.pages[type]
            },
            this
        );

        let isCompleted = true;
        for(let type in types) {
            if(types[type] && !completed[type]) {
                isCompleted = false;
            }
        }

        if(isCompleted) {
            this.end();
            this.isCompleted = true;
            this.emit("complete", Date.now(), this);
        }
    }

    /**
     * @param { DUMP_TYPE || string } type
     * @param { Dumper } dumper
     */
    setDumper(type, dumper) {
        if(!DUMP_TYPE.has(type)) return;
        if(!(dumper && dumper.isDumper)) {
            return;
        }
        this.dumpers[type] = dumper;

        this.emit("updateDumper", type, dumper, this);
    }

    /**
     * @param { DUMP_TYPE || string } type
     * @param { boolean } value
     */
    setType(type, value) {
        if(!DUMP_TYPE.has(type)) return;
        this.types[type] = value;
        this.emit("updateType", type, value, this);
    }
}
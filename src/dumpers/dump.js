import { DUMP_TYPE } from "../constants.js";


export class Dump {

    constructor(session) {
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

        this.isForceWrite = false;
        this.isCompleted = false;
        this.isProcess = false;
    }

    start() {
        this.tsStart = Date.now();
        this.isProcess = true;
    }

    stop() {
        this.tsEnd = Date.now();
        this.isProcess = false;
    }

    /**
     * @param { DUMP_TYPE } type
     */
    complete(type) {
        if(!DUMP_TYPE.has(type)) return;
        const completed = this.completed,
            types = this.types;

        completed[type] = true;

        let isCompleted = true;
        for(let type in types) {
            if(types[type] && !completed[type]) {
                isCompleted = false;
            }
        }

        if(isCompleted) {
            this.stop();
            this.isCompleted = true;
        }
    }

    /**
     * @param { DUMP_TYPE } type
     * @param { Dumper } dumper
     */
    setDumper(type, dumper) {
        if(!DUMP_TYPE.has(type)) return;
        if(!(dumper && dumper.isDumper)) {
            return;
        }
        this.dumpers[type] = dumper;
    }

    /**
     * @param { DUMP_TYPE } type
     * @param { boolean } value
     */
    setType(type, value) {
        if(!DUMP_TYPE.has(type)) return;
        this.types[type] = value;
    }
}
import { EventEmitter } from "events";
import { DEFAULT_CHARSET, DEFAULT_IS_FORCE_WRITE_FILE, DUMP_TYPE } from "../constants.js";


export class Dump extends EventEmitter {

    constructor(session) {
        super();
        this.isDump = true;

        this.sessionID = session.id;
        this.session = session;

        this.charset = DEFAULT_CHARSET;

        this.isForceWriteFile = DEFAULT_IS_FORCE_WRITE_FILE;

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
    }

    /**
     * @param { DUMP_TYPE || string } type
     */
    complete(type) {
        if(!DUMP_TYPE.has(type)) {
            return;
        }

        const completed = this.completed;
        completed[type] = true;

        this.emit("complete", {
            origin: this,
            ts: Date.now()
        });
    }

    /**
     * @param { DUMP_TYPE || string } type
     * @param { PageHTML } page
     */
    setPage(type, page) {
        switch(type) {
            case DUMP_TYPE.PROFILE: {
                this.pages.profile = page;
                break;
            }
            case DUMP_TYPE.FRIENDS: {
                this.pages.friends = page;
                break;
            }
            case DUMP_TYPE.FRIENDS_LIST: {
                this.pages.friendsList = page;
                break;
            }
            case DUMP_TYPE.DIALOGS: {
                this.pages.dialogs = page;
                break;
            }
            case DUMP_TYPE.MESSAGES: {

                break;
            }
            case DUMP_TYPE.ATTACHMENT_PHOTO: {

                break;
            }
            case DUMP_TYPE.ATTACHMENT_VIDEO: {

                break;
            }
        }

        this.emit("addPage", {
            origin: this,
            type,
            page
        });
    }
}
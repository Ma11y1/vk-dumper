import { EventEmitter } from "events";
import { Config } from "./config.js";
import { DumperError } from "./error/index.js";
import {
    StyleAttachmentPhoto,
    StyleAttachmentVideo,
    StyleBase,
    StyleDialogs,
    StyleFriends,
    StyleMessages,
    StyleProfile
} from "./page/index.js";
import { DUMP_TYPE } from "./constants.js";
import { Dump, DumperDialogs, DumperFriends, DumperMessages, DumperProfile, DumperSession } from "./dumpers/index.js";
import { StorageDumper } from "./storage.js";
import { VKSession } from "request-vk-api";


const E_INIT = "init";
const E_DUMP = "dump";

export class VKDumper extends EventEmitter {

    constructor() {
        super();

        // Init styles pages
        this._styleBase = new StyleBase(Config.pathStyle.base, Config.customStyle.base);
        this._styleProfile = new StyleProfile(Config.pathStyle.profile, Config.customStyle.profile);
        this._styleFriends = new StyleFriends(Config.pathStyle.friends, Config.customStyle.friends)
        this._styleDialogs = new StyleDialogs(Config.pathStyle.dialogs, Config.customStyle.dialogs);
        this._styleMessages = new StyleMessages(Config.pathStyle.messages, Config.customStyle.messages);
        this._styleAttachmentPhoto = new StyleAttachmentPhoto(Config.pathStyle.attachmentPhoto, Config.customStyle.attachmentPhoto);
        this._styleAttachmentVideo = new StyleAttachmentVideo(Config.pathStyle.attachmentVideo, Config.customStyle.attachmentVideo);

        // Saved styles in global storage
        StorageDumper.set("style", {
            base: this._styleBase,
            profile: this._styleProfile,
            friends: this._styleFriends,
            dialogs: this._styleDialogs,
            messages: this._styleMessages,
            attachmentPhoto: this._styleAttachmentPhoto,
            attachmentVideo: this._styleAttachmentVideo
        });

        // Write styles pages
        Promise.all([
            this._styleBase.write(),
            this._styleProfile.write(),
            this._styleFriends.write(),
            this._styleDialogs.write(),
            this._styleMessages.write(),
            this._styleAttachmentPhoto.write(),
            this._styleAttachmentVideo.write()
        ])
            .then(() => {
                this.isInit = true;
                this.emit(E_INIT, this);
            })
            .catch((err) => {
                throw new DumperError("VKDumper", "constructor()", `Error write style pages!\n${ err.message }`)
            });

        this.isInit = false;
    }

    /**
     * @param { VKSession } session
     * @param { Array<DUMP_TYPE || string> }
     */
    newDump({ session, dumpTypes }) {
        if(!this.isInit) {
            return;
        }
        if(!session) {
            throw new DumperError("VKDumper", "dump()", "VkDumper initialization error due to invalid session object!");
        }

        const dump = new Dump(session);
        dump.setDumper(DUMP_TYPE.SESSION, new DumperSession(session, dump));
        dump.setDumper(DUMP_TYPE.PROFILE, new DumperProfile(session, dump));
        dump.setDumper(DUMP_TYPE.FRIENDS, new DumperFriends(session, dump));
        dump.setDumper(DUMP_TYPE.DIALOGS, new DumperDialogs(session, dump));
        dump.setDumper(DUMP_TYPE.MESSAGES, new DumperMessages(session, dump));

        if(dumpTypes) {
            for(let type of dumpTypes) {
                dump.setType(type, true);
            }
        }

        Storage.set(dump.sessionID, dump);

        this.emit(E_DUMP, dump);
        return dump;
    }
}

Config.init();
const dumper = new VKDumper();
dumper.addListener("init", (dumper) => {

});

console.log(dumper.newDump({
    session: new VKSession()
}))
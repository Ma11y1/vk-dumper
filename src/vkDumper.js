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
import { DumperDialogs, DumperFriends, DumperMessages, DumperProfile } from "./dumpers/index.js";
import { Dump } from "./dumpers/dump.js";
import { DumperSession } from "./dumpers/dumperSession.js";


const E_INIT = "init";

export class VKDumper extends EventEmitter {

    constructor() {
        super();

        // Init styles pages
        this._styleBase = new StyleBase(Config.customStyle.base, Config.customStyle.base);
        this._styleProfile = new StyleProfile(Config.customStyle.profile, Config.customStyle.profile);
        this._styleFriends = new StyleFriends(Config.pathStyle.friends, Config.customStyle.friends)
        this._styleDialogs = new StyleDialogs(Config.customStyle.dialogs, Config.customStyle.dialogs);
        this._styleMessages = new StyleMessages(Config.customStyle.messages, Config.customStyle.messages);
        this._styleAttachmentPhoto = new StyleAttachmentPhoto(Config.customStyle.attachmentPhoto, Config.customStyle.attachmentPhoto);
        this._styleAttachmentVideo = new StyleAttachmentVideo(Config.customStyle.attachmentVideo, Config.customStyle.attachmentVideo);

        // Saved styles in global storage
        Storage.set("style", {
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
     * @param { Array<DUMP_TYPE> }
     */
    dump({ session, dumpTypes }) {
        if(!this.isInit) {
            return;
        }
        if(!session) {
            throw new DumperError("VKDumper", "constructor()", "VkDumper initialization error due to invalid session object!");
        }

        const dump = new Dump(session);
        dump.dumpers.session = new DumperSession(session);
        dump.dumpers.profile = new DumperProfile(session);
        dump.dumpers.friends = new DumperFriends(session);
        dump.dumpers.dialogs = new DumperDialogs(session);
        dump.dumpers.messages = new DumperMessages(session);

        if(dumpTypes) {
            for(let type of dumpTypes) {
                dump.setType(type, true);
            }
        }

        Storage.set(session.id, dump);
    }
}

const dumper = new VKDumper();
dumper.init().then(() => {

});
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

//TODO Сделать чтобы стили записывались только один раз а не при каждом новом дампе
export class VkDump extends EventEmitter {

    /**
     * @param { VKSession } session
     * @param { { base, profile, dialogs, messages, attachmentPhoto, attachmentVideo } } customCss
     */
    constructor({
                    session, isDumpProfile, isDumpFriends, isDumpFriendList,
                    isDumpDialogs, isDumpMessages, isDumpAttachmentPhoto, isDumpAttachmentVideo
                }) {
        super();
        if(!session) {
            throw new DumperError("VkDump", "constructor()", "VkDump initialization error due to invalid session object!");
        }
        this._session = session;

        this.storage = new Storage();

        this._styleBase = new StyleBase(Config.customStyle.base, Config.customStyle.base);
        this._styleProfile = new StyleProfile(Config.customStyle.profile, Config.customStyle.profile);
        this._styleFriends = new StyleFriends(Config.pathStyle.friends, Config.customStyle.friends)
        this._styleDialogs = new StyleDialogs(Config.customStyle.dialogs, Config.customStyle.dialogs);
        this._styleMessages = new StyleMessages(Config.customStyle.messages, Config.customStyle.messages);
        this._styleAttachmentPhoto = new StyleAttachmentPhoto(Config.customStyle.attachmentPhoto, Config.customStyle.attachmentPhoto);
        this._styleAttachmentVideo = new StyleAttachmentVideo(Config.customStyle.attachmentVideo, Config.customStyle.attachmentVideo);
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
                this.isInitStyle = true;
                if(this.isInitDumpers) {
                    this.isInit = true;
                }
            })
            .catch((err) => {
                throw new DumperError("VkDump", "constructor()", `Error write style pages! SessionID: ${ session.id }.\n${ err.message }`)
            });

        this._dumperProfile = new DumperProfile(session);
        this._dumperFriends = new DumperFriends(session);
        this._dumperDialogs = new DumperDialogs(session);
        this._dumperMessages = new DumperMessages(session);

        this.isInitStyle = false;
        this.isInitDumpers = false;
        this.isInit = false;
    }

    dump() {
        if(!this.isInit) return;

    }

}
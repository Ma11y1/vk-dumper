import { DumperDialogs, DumperFriends, DumperProfile } from "./dumpers/index.js";
import {
    StyleAttachmentPhoto,
    StyleAttachmentVideo,
    StyleBase,
    StyleDialogs,
    StyleMessages,
    StyleProfile
} from "./page/index.js";
import {
    PATH_STYLE_ATTACHMENT_PHOTO,
    PATH_STYLE_ATTACHMENT_VIDEO, PATH_STYLE_BASE,
    PATH_STYLE_DIALOGS,
    PATH_STYLE_MESSAGES, PATH_STYLE_PROFILE
} from "./constants.js";
import { Config } from "./config.js";

//TODO Сделать чтобы стили записывались только один раз а не при каждом новом дампе
export class VkDump {

    /**
     * @param { VKSession } session
     * @param { { base, profile, dialogs, messages, attachmentPhoto, attachmentVideo } } customCss
     */
    constructor({ session, customCss }) {
        this._session = session;

        this._styleBase = new StyleBase(PATH_STYLE_BASE, { ...Config.customStyle.base, ...(customCss ? customCss : {}) });
        this._styleProfile = new StyleProfile(PATH_STYLE_PROFILE, { ...Config.customStyle.profile, ...(customCss ? customCss : {}) });
        this._styleDialogs = new StyleDialogs(PATH_STYLE_DIALOGS, { ...Config.customStyle.dialogs, ...(customCss ? customCss : {}) });
        this._styleMessages = new StyleMessages(PATH_STYLE_MESSAGES, { ...Config.customStyle.messages, ...(customCss ? customCss : {}) });
        this._styleAttachmentPhoto = new StyleAttachmentPhoto(PATH_STYLE_ATTACHMENT_PHOTO, { ...Config.customStyle.attachmentPhoto, ...(customCss ? customCss : {}) });
        this._styleAttachmentVideo = new StyleAttachmentVideo(PATH_STYLE_ATTACHMENT_VIDEO, { ...Config.customStyle.attachmentVideo, ...(customCss ? customCss : {}) });
        this._styleBase.write();
        this._styleProfile.write();
        this._styleDialogs.write();
        this._styleMessages.write();
        this._styleAttachmentPhoto.write();
        this._styleAttachmentVideo.write();

        // this._dumperProfile = new DumperProfile();
        // this._dumperDialogs = new DumperDialogs();
        // this._dumperFriends = new DumperFriends();

        this.isInitStyle = false;
        this.isInitDumpers = false;
        this.isInit = false;
    }

    dump() {

    }

}


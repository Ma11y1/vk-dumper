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
import {
    Dump, DumperAttachmentPhoto,
    DumperAttachmentVideo,
    DumperDialogs,
    DumperFriends,
    DumperMessages,
    DumperProfile
} from "./dumpers/index.js";
import { StorageDumper } from "./storage.js";
import { VKSession } from "request-vk-api";


//TODO Сделать отслеживание процесса
//TODO Доделать дамперы
//TODO Доделать стили и шаблоны страниц
//TODO Сделать менеджер воркеров для многопоточной обработки
//TODO Сделать запись страниц на диск
export class VKDumper extends EventEmitter {

    constructor(config) {
        super();

        Config.init(config);

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

        this.isInit = false;
    }

    init() {
        return Promise.all([
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
                this.emit("init", this);
                return this;
            })
            .catch((err) => {
                throw new DumperError("VKDumper", "init()", `Error write style pages!\n${ err.message }`)
            });
    }

    /**
     * @param { string } token
     * @param { Array<DUMP_TYPE || string> }
     */
    async newDump({ token, language, charset }) {
        if(!this.isInit) {
            throw new DumperError("VKDumper", "newDump()", "VkDumper is not initialize!");
        }

        const session = new VKSession({ token, language });
        await session.init();

        if(!session.isInit) {
            throw new DumperError("VKDumper", "dump()", "VkDumper initialization error due to invalid session object!");
        }

        const dump = new Dump(session);
        if(charset !== undefined) {
            dump.charset = charset;
        }

        StorageDumper.set(dump.sessionID, dump);

        this.emit("newDump", { origin: this, ts: Date.now(), session, dump });
        return dump;
    }

    /**
     * @param { Dump } dump
     * @param { boolean } isDumpProfile
     * @param { boolean } isDumpFriends
     * @param { boolean } isDumpFriendsList
     * @param { boolean } isDumpDialogs
     * @param { boolean } isDumpMessages
     * @param { boolean } isDumpAttachmentPhoto
     * @param { boolean } isDumpAttachmentVideo
     */
    async dump(dump, {
        isDumpProfile = true, isDumpFriends = true, isDumpFriendsList = true,
        isDumpDialogs = true, isDumpMessages, isDumpAttachmentPhoto, isDumpAttachmentVideo
    }) {
        if(!this.isInit) {
            throw new DumperError("VKDumper", "dump()", "VkDumper is not initialize!");
        }

        const tsStart = Date.now();
        this.emit("dumpStart", {
            origin: this,
            ts: tsStart,
            dump,
            isDumpProfile,
            isDumpFriends,
            isDumpFriendsList,
            isDumpDialogs,
            isDumpMessages,
            isDumpAttachmentPhoto,
            isDumpAttachmentVideo
        });

        const dumpers = [];

        if(isDumpProfile) dumpers.push(new DumperProfile(dump).start());
        if(isDumpFriends) dumpers.push(new DumperFriends(dump).start());
        if(isDumpDialogs) dumpers.push(new DumperDialogs(dump).start());
        if(isDumpMessages) dumpers.push(new DumperMessages(dump).start());
        if(isDumpAttachmentPhoto) dumpers.push(new DumperAttachmentPhoto(dump).start());
        if(isDumpAttachmentVideo) dumpers.push(new DumperAttachmentVideo(dump).start());

        return Promise.all(dumpers)
            .then(() => {
                this.emit("dumpComplete", {
                    origin: this,
                    tsStart: tsStart,
                    tsEnd: Date.now(),
                    dump
                });
            })
            .catch((err) => {
                throw new DumperError("VKDumper", "dump()", `Error dump vk session! SessionID: ${ dump.sessionID }.\n${ err.message }`);
            });
    }
}
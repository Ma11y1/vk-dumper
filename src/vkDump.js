import { objectToHTML, PageCSS, PageHTML } from "./page/index.js";
import { STYLE_PATH } from "./constants.js";
import { DumperProfile } from "./dumpers/dumperProfile.js";


export class VkDump {

    /**
     * @param { VKSession } session
     * @param { { base, dialogs, messages, attempts } } customCss
     */
    constructor({ session, customCss }) {
        this._session = session;

        this._style = new PageCSS(STYLE_PATH + "base.css", {
            "*": {
                margin: 0,
                padding: 0,
                "background-color": "#555555"
            },
            ...customCss
        });

        this._dumpProfile = new DumperProfile();
    }

    async init() {
        await Promise.all([this._style])
    }

    dump() {

    }

}
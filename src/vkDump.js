import { DumperProfile } from "./dumpers/dumperProfile.js";
import { DumperDialogs } from "./dumpers/dumperDialogs.js";
import { DumperFriends } from "./dumpers/dumperFriends.js";


export class VkDump {

    /**
     * @param { VKSession } session
     * @param { { base, dialogs, messages, attempts } } customCss
     */
    constructor({ session, customCss }) {
        this._session = session;

        this._dumperProfile = new DumperProfile();
        this._dumperDialogs = new DumperDialogs();
        this._dumperFriends = new DumperFriends();
    }

    dump() {

    }

}
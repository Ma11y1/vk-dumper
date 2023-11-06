export const DEFAULT_CHARSET = "utf-8";

export const DEFAULT_IS_FORCE_WRITE_FILE = false;

export const DUMP_TYPE = {
    PROFILE: "profile",
    FRIENDS: "friends",
    FRIENDS_LIST: "friendsList",
    DIALOGS: "dialogs",
    MESSAGES: "messages",
    ATTACHMENT_PHOTO: "attachmentPhoto",
    ATTACHMENT_VIDEO: "attachmentVideo",
    has(type) {
        switch(type) {
            case "profile":
            case "friends":
            case "friendsList":
            case "dialogs":
            case "messages":
            case "attachmentPhoto":
            case "attachmentVideo": return true;
            default: return false;
        }
    }
}


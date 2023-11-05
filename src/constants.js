export const TOKEN = "vk1.a.o7f6Eg5apS7frCWKR50dx003y2HLr2EXcUbPyEeOej9kP_EyVJHdTtIwHTVHQPuaQ-iyogzoNIfwynaA6XQEquiYYlfj6da1ThRXMb1Hpd-A1Bs_x5VWy2Ig0LsO0EvqEGJD9xlv37eCS-G252EigpnF4wQ-XUHnoYAQX6rk5y0-fOccOaZ_oYGHpFrtHs29";


export const DUMP_TYPE = {
    SESSION: "session",
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
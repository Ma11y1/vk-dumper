export class Config {
    static pathDump = {
        dir: "./dump/",
        profile: "./dump/profile.html",
        friendList: "./dump/friendList.txt",
        dialogs: "./dump/dialogs/dialogs.html",
        messages: "./dump/dialogs/",
        attachmentPhoto: "./dump/photo/",
        attachmentVideo: "./dump/video/"
    }
    static pathStyle = {
        dir: "./src/",
        base: "./src/base.css",
        profile: "./src/profile.css",
        dialogs: "./src/dialogs.css",
        messages: "./src/messages.css",
        attachmentPhoto: "./src/attachmentPhoto.css",
        attachmentVideo: "./src/attachmentVideo.css"
    }
    static customStyle = {
        base: {},
        profile: {},
        dialogs: {},
        messages: {},
        attachmentPhoto: {},
        attachmentVideo: {}
    }

    static init(data) {

    }
}
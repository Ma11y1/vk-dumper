export class Config {
    static pathDump = {
        dir: "./dump/",
        profile: "",
        friends: "",
        friendList: "",
        dialogs: "dialogs/",
        messages: "dialogs/",
        attachmentPhoto: "attachments/photo",
        attachmentVideo: "attachments/video"
    };
    static pathStyle = {
        dir: "./src",
        base: "base.css",
        profile: "profile.css",
        friends: "friends.css",
        dialogs: "dialogs.css",
        messages: "messages.css",
        attachmentPhoto: "attachmentPhoto.css",
        attachmentVideo: "attachmentVideo.css"
    };

    static customStyle = {
        base: {},
        profile: {},
        friends: {},
        dialogs: {},
        messages: {},
        attachmentPhoto: {},
        attachmentVideo: {}
    };

    static init(data = {}) {

        // Path dump
        const pathDump = this.pathDump,
            dataPathDump = data.pathDump;
        if(dataPathDump) {
            if(dataPathDump.dir !== undefined) {
                pathDump.dir = dataPathDump.dir;
            }

            for(let property in dataPathDump) {
                if(property === "dir") {
                    continue;
                }
                if(pathDump[property] !== undefined) {
                    pathDump[property] = pathDump.dir + dataPathDump[property];
                }
            }
        } else {
            for(let property in pathDump) {
                if(property === "dir") continue;
                pathDump[property] = pathDump.dir + pathDump[property];
            }
        }

        // Path style
        const pathStyle = this.pathStyle,
            dataPathStyle = data.pathStyle;
        if(dataPathStyle) {
            if(dataPathStyle.dir !== undefined) {
                pathStyle.dir = dataPathStyle.dir;
            }

            for(let property in dataPathStyle) {
                if(property === "dir") {
                    continue;
                }
                if(pathStyle[property] !== undefined) {
                    pathStyle[property] = pathStyle.dir + dataPathStyle[property];
                }
            }
        } else {
            for(let property in pathStyle) {
                if(property === "dir") continue;
                pathStyle[property] = pathStyle.dir + pathStyle[property];
            }
        }

        // Custom style
        const customStyle = this.customStyle,
            dataCustomStyle = data.customStyle;
        for(let property in dataCustomStyle) {
            if(customStyle[property] !== undefined) {
                customStyle[property] = dataCustomStyle[property];
            }
        }
    }
}
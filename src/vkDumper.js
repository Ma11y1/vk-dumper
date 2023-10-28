import { PageStyle } from "./page/elements/index.js";


class VkDumper {

    constructor(session) {
        this._session = session;
    }

    dump() {

    }

}


const style = new PageStyle("main.css",{
    "*" : {
        margin: 0,
        padding: 0
    },
    "body": {
        "background-color": "red"
    }
});

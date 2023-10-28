import { Path } from "../../io/index.js";
import { STYLE_PATH } from "../../constants.js";
import { objectToCss } from "../generators/objectToCss.js";


export class PageStyle {

    constructor(name, data) {
        this.isPageStyle = true;
        if(!name.endsWith(".css")) name += ".css";

        this._path = new Path(STYLE_PATH + name);
        this._name = name;
        this._data = "";


        this.isGenerated = false;

        if(data) this.generate(data);
    }

    generate(data) {
        this._data = objectToCss(data);
        this.isGenerated = true;
    }

    toString() {
        return this._data;
    }

    get data() {
        return this._data;
    }

    get path() {
        return this._path;
    }

    set data(value) {
        this.generate(value);
    }

    set path(value) {
        if(!value) return;
        if(value.isPath) {
            this._path.setPath(value.path);
        }else {
            this._path.setPath(value);
        }
    }
}
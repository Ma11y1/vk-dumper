import { IOFS, Path } from "../io/index.js";
import { Header } from "./elements/header.js";
import { PageStyle } from "./elements/index.js";


export class Page {

    constructor(path) {
        this.isPage = true;
        this._path = new Path(path);
        this._name = this._path.name;

        this._header = null;
        this._body = null;
        this._style = null;
        this._data =  "";

        this.isGenerated = false;
    }

    generate() {

        this.isGenerated = true;
    }

    write(path = this._path) {
        if(!path) return;
        path = path.isPath ? path.path : path;

        return IOFS.writeFile(path, this._data);
    }

    toString() {
        return this._data;
    }

    get path() {
        return this._path;
    }

    get header() {
        return this._header;
    }

    get style() {
        return this._style;
    }

    get body() {
        return this._body;
    }

    set path(value) {
        if(!value) return;
        this._path.setPath(value);
    }

    set header(value) {
        if(!value) return;

        if(value.isPageElement) {
            this._header = value;
        }else {
            const header = new Header(value);
            if(!header.isGenerated) return;
            this._header = header;
        }

        this.isGenerated = false;
    }

    set style(value) {
        if(!value) return;

        if(value.isPageElement) {
            this._style = value;
        }else {
            const style = new PageStyle(value);
            if(!style.isGenerated) return;
            this._style = style;
        }

        this.isGenerated = false;
    }

    set body(value) {
        if(!value) return;

        if(value.isPageElement) {
            this._header = value;
        }else {
            const header = new Header(value);
            if(!header.isGenerated) return;
            this._header = header;
        }

        this.isGenerated = false;
    }
}
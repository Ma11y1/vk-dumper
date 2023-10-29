import { IOFS, Path } from "../io/index.js";
import { PageElement } from "./pageElement.js";


export class Page extends PageElement {

    constructor(path, data) {
        super(data);
        this.isPage = true;

        this._path = new Path(path);
        this._name = this._path.name;
    }

    write(path = this._path) {
        if(!path) return;
        path = path.isPath ? path.path : path;

        return IOFS.writeFile(path, this._data);
    }

    get path() {
        return this._path;
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
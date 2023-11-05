import path from "path";
import { DumperError } from "../error/index.js";
import { IOFS } from "./IOFS.js";


export class Path {

    constructor(path) {
        this.isPath = true;

        this._full = null;
        this._path = null;
        this._root = null;
        this._dir = null;
        this._base = null;
        this._ext = null;
        this._name = null;
        this.path = path;

        this._isNormalize = false;
    }

    normalize() {
        this._path = path.normalize(this._path);
        this._isNormalize = true;
    }

    write(data) {
        if(!data) {
            return Promise.reject(new DumperError("Path", "write", "Error write file! Missing file data"));
        }

        return IOFS.writeFile(this.path, data);
    }

    read() {
        return IOFS.readFile(this._path);
    }

    unlink() {
        return IOFS.unlink(this._path);
    }

    setPath(target) {
        this.path = target;
    }

    toString() {
        return this._path;
    }

    set path(target) {
        if(!target || typeof target !== "string") return;

        target = path.parse(target);
        this._path = target.dir + path.sep + target.base;
        this._root = target.root;
        this._dir = target.dir;
        this._base = target.base;
        this._ext = target.ext;
        this._name = target.name;
        this._full = path.resolve(this._path);

        this.normalize();
    }

    get path() {
        return this._path;
    }

    get full() {
        return this._full;
    }

    get root() {
        return this._root;
    }

    get dir() {
        return this._dir;
    }

    get base() {
        return this._base;
    }

    get ext() {
        return this._ext;
    }

    get name() {
        return this._name;
    }

    get isNormalize() {
        return this._isNormalize;
    }
}
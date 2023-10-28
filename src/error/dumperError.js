export class DumperError extends Error {

    constructor(module, func, msg) {
        super(msg);
        this.module = module;
        this.func = func;
        this.ts = new Date();
    }

    toJSON() {
        return {
            module: this.module,
            function: this.func,
            message: this.message,
            ts: this.ts.getTime()
        }
    }

    toString() {
        return `[${ this.ts }]
        Module: ${ this.module } || Function: ${ this.func }()
-------------------------------------------------------
${ this.message }
-------------------------------------------------------`;
    }
}
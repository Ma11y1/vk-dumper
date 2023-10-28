import { DumperError } from "../../error/index.js";


export function objectToCss(obj) {
    if(!obj || typeof obj !== "object") {
        throw new DumperError("objectToCss","objectToCss", `Invalid object! Object: [${ obj }]`);
    }


    let css = "";
    for(let key in obj) {
        const value = obj[key];

        if(typeof value === "object") {
            css += key + "{";
            for(let keyValue in value) {
                css += `${ keyValue }:${ value[keyValue] };`;
            }
            css += "}\n"
        }else {
            throw new DumperError("objectToCss","objectToCss", `Invalid object passed to convert to CSS file! Invalid key: [${ key }]`);
        }
    }

    return css;
}
import { DumperError } from "../../error/index.js";


/**
 * @param {
 *     {
 *        value: "Value",
 *        params: {
 *            param1: "paramValue"
 *            param2: "paramValue"
 *        }
 *     }
 *     ||
 *     {
 *       "Value"
 *     }
 * } obj
 * @returns { string }
 */
export function objectToHTML(obj) {
    if(!obj || typeof obj !== "object") {
        throw new DumperError("objectToHTML","objectToHTML", `Invalid object! Object: [${ obj }]`);
    }

    let html = "";
    for(let key in obj) {
        let value = obj[key];
        if(!value) {
            throw new DumperError("objectToHTML","objectToHTML", `Invalid value! Key: ${ key }`);
        }

        html += `<${ key }`;

        const valueParams = value.params;
        if(valueParams && typeof valueParams === "object") {
            for(let param in valueParams) {
                html += ` ${ param }="${ valueParams[param] }"`;
            }
        }

        // Defining single tags
        if(key === "br" || key === "img" || key === "input" || key === "area" || key === "base" || key === "link" || key === "meta" ||
            key === "col" || key === "embed" || key === "hr" || key === "keygen" || key === "link" || key === "meta" || key === "param" ||
            key === "source" || key === "track" || key === "wbr") {

            html += "/>";
            continue;
        } else {
            html += ">";
        }

        // If a parameters or value object is present, the value is taken from the value object, otherwise it is written as a string
        if(value.params || value.value) {
            value = value.value;
        }

        if(typeof value === "object") {
            html += objectToHTML(value);
        } else {
            html += String(value);
        }

        html += `</${ key }>`;
    }

    return html;
}
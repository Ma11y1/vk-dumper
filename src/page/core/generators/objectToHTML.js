import { DumperError } from "../../../error/index.js";


/**
 * @param {
 *     {
 *         key: {
 *              key: {
 *                  type: "type",
 *                  value: "value",
 *                  params: {}
 *              },
 *              key1: "value"
 *         }
 *     }
 *     ||
 *     {
 *         key: [
 *             {
 *                 type: "type",
 *                 value: "value",
 *                 params: {}
 *             },
 *             {
 *                 title: "Title"
 *             },
 *             {
 *                 type: "type",
 *                 value: "value",
 *                 params: {}
 *             }
 *         ]
 *     }
 * } obj
 * @returns { string }
 */
export function objectToHTML(obj) {
    if(!obj || typeof obj !== "object") {
        throw new DumperError("objectToHTML", "objectToHTML()", `Invalid object! Object: [${ obj }]`);
    }

    let html = "";
    if(Array.isArray(obj)) {
        for(let i = 0, length = obj.length; i < length; i++) {
            const value = obj[i];
            if(!value) {
                throw new DumperError("objectToHTML", "objectToHTML()", `Invalid object! Object: ${ value }`);
            }

            if(!value.type) {
                html += objectToHTML(value);
            } else {
                html += elementFrom(value);
            }
        }
    } else if(typeof obj === "object") {
        for(let key in obj) {
            let value = obj[key];
            if(!value) {
                throw new DumperError("objectToHTML", "objectToHTML()", `Invalid value! Key: ${ key }`);
            }

            if(!value.type) {
                value = {
                    type: key, value: value.value ? value.value : value
                }
            }

            html += elementFrom(value);
        }
    } else {
        throw new DumperError("objectToHTML", "objectToHTML()", `Invalid object! Object: ${ obj }`);
    }

    return html;
}

/**
 * @param {
 *     {
 *         type: "type",
 *         value: "value",
 *         params: {}
 *     }
 * } obj
 * @returns { string }
 */
function elementFrom(obj) {
    if(!(obj && obj.type)) {
        throw new DumperError("objectToHTML", "objectToHTML()", `Invalid object or type HTML element! From: ${ obj }`);
    }

    const type = obj.type, params = obj.params, value = params || obj.value ? obj.value : obj;

    let html = `<${ type }`;

    if(params && typeof params === "object") {
        for(const param in params) {
            const valueParam = params[param];
            if(valueParam) {
                html += ` ${ param }="${ valueParam }"`;
            } else {
                html += ` ${ param }`;
            }
        }
    }

    // Defining single tags
    if(type === "br" || type === "img" || type === "input" || type === "area" || type === "base" || type === "link" || type === "meta" || type === "col" || type === "embed" || type === "hr" || type === "keygen" || type === "link" || type === "meta" || type === "param" || type === "source" || type === "track" || type === "wbr") {

        return html + "/>";
    } else {
        html += ">";
    }

    if(typeof value === "object") {
        html += objectToHTML(value);
    } else {
        html += String(value || "");
    }

    return html + `</${ type }>`;
}
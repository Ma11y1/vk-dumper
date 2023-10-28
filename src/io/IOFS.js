import fs from "fs";
import path from "path";


export class IOFS {

    static writeFile(filePath, data) {
        if(!filePath) return Promise.reject();
        filePath = path.normalize(filePath);

        return new Promise((resolve, reject) => {
            fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
                if(err) reject(err);

                fs.writeFile(filePath, data, (err) => {
                    if(err) reject(err);
                    resolve();
                });
            });
        });
    }

    static appendFile(filePath, data) {
        filePath = path.normalize(filePath);
        if(!path.isAbsolute(filePath)) return;

        return new Promise((resolve, reject) => {
            fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
                if(err) reject(err);

                fs.appendFile(path, data, (err) => {
                    if(err) reject(err);
                    resolve();
                });
            });
        });
    }

    static readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if(err) reject(err);
                resolve(data);
            });
        });
    }

    static unlink(filePath) {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if(err) reject(err);
                resolve();
            });
        });
    }
}
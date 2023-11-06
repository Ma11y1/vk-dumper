import { VKDumper } from "./vkDumper.js";


const dumper = new VKDumper();
dumper.init().then(() => {
    dumper.newDump({
        language: "ru",
        charset: "utf-8",
    }).then((dump) => {
        dumper.dump(dump, {
            isDumpProfile: true
        }).then(() => {
            console.log(1, dump.pages);
        });
    });
});


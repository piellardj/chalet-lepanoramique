import * as fs from "fs";
import * as path from "path";

import * as fr from "./fr";
import * as en from "./en";

function addVersioning(source: string): string {
    const date = new Date();
    const version = encodeURIComponent(date.toISOString());
    
    let processed = source.replace("page.js", `page.js?v=${version}`);
    processed = processed.replace("style.css", `style.css?v=${version}`);
    return processed;
}

function addTranslations(source: string, dictionary: Record<string, string>): string {
    return source.replace(/#=\(([^\)]+)\)/gm, (_match: string, p1: string) => {
        const translation = dictionary[p1];
        if (!translation) {
            throw new Error(`Missing translation for key "${p1}".`);
        }
        return translation;
    });
}

const sourceFilepath = path.resolve(__dirname, "index.html");
const sourceHtml = fs.readFileSync(sourceFilepath).toString();

const versionedHtml = addVersioning(sourceHtml);

const htmlFr = addTranslations(versionedHtml, fr.trad);
const htmlEn = addTranslations(versionedHtml, en.trad);

const dstFolder = path.resolve(__dirname, "../../website");

fs.writeFileSync(path.resolve(dstFolder, "index.html"), htmlFr);
fs.writeFileSync(path.resolve(dstFolder, "index_en.html"), htmlEn);
fs.writeFileSync(path.resolve(dstFolder, "index_raw.html"), versionedHtml);

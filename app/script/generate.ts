import minimist from "minimist";
import * as Homepage from "./homepage/homepage";
import IHomepageData from "./homepage/i-homepage-data";

const data: IHomepageData = {
    pageDescription: "Hôtel Le Panoramique",
    pageTitle: "Hôtel Le Panoramique",

    email: "monemail@domaine.fr",
    phone: "01 02 03 04 05",
    address: "quelque part 38142 Mizoën",

    headerBackgroundImageFilepath: "rc\\_DSC6000 (1).jpg",
};

function IsStringNullOrEmpty(str: unknown): boolean {
    return typeof str !== "string" || str.length === 0;
}

function displayHelp(): void {
    console.log("\nUsage:");
    console.log("--page=[homepage | demopage] --data=%JSON_FILE% --outdir=%OUT_DIR% [--debug=1]");
}

function exitAndDisplayHelp(code: number): void {
    displayHelp();
    process.exit(code);
}

function outputErrorInvalidValue(name: string, value: unknown): void {
    console.error("Invalid value '" + value + "' for parameter '--" + name + "'.");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkArgs(providedArgs: any): void {
    const argsToCheck = ["page", "data", "outdir"];
    let i = 0;
    for (const argName of argsToCheck) {
        i++;
        const argValue = providedArgs[argName];
        if (IsStringNullOrEmpty(argValue)) {
            outputErrorInvalidValue(argName, argValue);
            exitAndDisplayHelp(i);
        }
    }
}

const argv = minimist(process.argv.slice(2));
checkArgs(argv);

if (argv.page === "homepage") {
    Homepage.build(data, argv.outdir);
} else {
    outputErrorInvalidValue("page", argv.page);
    exitAndDisplayHelp(100);
}

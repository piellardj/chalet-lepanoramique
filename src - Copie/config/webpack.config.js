const path = require("path");

const PROJECT_DIR = path.resolve(__dirname, "..", "..");
const INPUT_SCRIPT_DIR = path.join(PROJECT_DIR, "src", "ts");
const OUTPUT_SCRIPT_DIR = path.join(PROJECT_DIR, "website", "script");

function buildConfig(entryFilename /* string */, outputFilename /* string */, minified /* boolean */) /* object */ {
    return {
        name: entryFilename,
        devtool: "source-map",
        mode: minified ? "production" : "development",
        entry: path.join(INPUT_SCRIPT_DIR, entryFilename),
        output: {
            path: OUTPUT_SCRIPT_DIR,
            filename: outputFilename,
            library: "page",
        },
        target: ["web", "es2017"],
        resolve: {
            extensions: [".ts"]
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    // exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                compilerOptions: {
                                    rootDir: INPUT_SCRIPT_DIR
                                },
                                configFile: path.join(PROJECT_DIR, "src", "config", 'tsconfig.json')
                            }
                        }
                    ],
                },
            ]
        }
    };
}

module.exports = [
    buildConfig("main.ts", "page.js", false),
    // buildConfig("main.ts", "main.min.js", true),
];

import fs from "fs";
import path from "path";

import { IBody } from "../../components/homepage/body/template-interface";
import IPage from "../../components/page/template-interface";

import * as Builder from "../page-builder";
import IHomepageData from "./i-homepage-data";

function buildPageData(homepageData: IHomepageData, headerBackgroundImageUrl: string): IPage {
    const addressGmapLink = "https://www.google.com/maps/search/?api=1&query=panoramique%20mizoen";

    const homepageBodyData: IBody = {
        header: {
            background: {
                imageUrl: headerBackgroundImageUrl,
            },
            topBar: {
                phone: homepageData.phone,
                email: homepageData.email,
                address: homepageData.address,
                addressGmapLink,
            },
        },
        footer: {
            phone: homepageData.phone,
            email: homepageData.email,
            address: homepageData.address,
            addressGmapLink,
        },
    };
    const homepageBodyEjs = Builder.CustomEjs.loadComponent(path.join("homepage", "body"));
    const homepageBodyStr = Builder.CustomEjs.render(homepageBodyEjs, homepageBodyData);

    return {
        bodyStr: homepageBodyStr,
        cssFiles: [],
        description: homepageData.pageDescription,
        scriptFiles: [],
        title: homepageData.pageTitle,
    };
}

/**
 * 
 * @param data Data describing the contents of the page
 * @param destinationDir Root directory in which the generated files will be copied
 */
function build(data: IHomepageData, destinationDir: string): void {
    const headerBackgroundUrl = path.join("rc", "header-background.jpg");
    const headerBackgroundDestFilepath = path.join(destinationDir, headerBackgroundUrl);

    if (!fs.existsSync(path.join(destinationDir, "rc"))) {
        fs.mkdirSync(path.join(destinationDir, "rc"));
    }

    const sourcePath = path.resolve(__dirname, "..", "..", "..", data.headerBackgroundImageFilepath);
    console.log(sourcePath);
    fs.copyFileSync(sourcePath, headerBackgroundDestFilepath);
    const pageData: IPage = buildPageData(data, headerBackgroundUrl);

    Builder.buildPage(destinationDir, pageData, {
        minifyScript: true,
    });
}

export { build };


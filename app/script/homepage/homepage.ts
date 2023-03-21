import path = require("path");

import { IBody } from "../../components/homepage/body/template-interface";
import IPage from "../../components/page/template-interface";

import * as Builder from "../page-builder";
import IHomepageData from "./i-homepage-data";

function buildPageData(homepageData: IHomepageData): IPage {
    const homepageBodyData: IBody = {
        header: {
            topBar: {
                phone: homepageData.phone,
                email: homepageData.email,
                address: homepageData.address,
            },
        }
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
    const pageData: IPage = buildPageData(data);

    Builder.buildPage(destinationDir, pageData, {
        minifyScript: true,
    });
}

export { build };

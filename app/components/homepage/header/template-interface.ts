import { IHeaderBackground } from "../header-background/template-interface";

export interface IHeader {
    background: IHeaderBackground;
    topBar: {
        phone: string;
        email: string;
        address: string;
    };
}

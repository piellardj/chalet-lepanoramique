import { IFooter } from "../footer/template-interface";
import { IHeader } from "../header/template-interface";

export interface IBody {
    header: IHeader;
    footer: IFooter;
}

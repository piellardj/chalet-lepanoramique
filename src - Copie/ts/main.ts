import { Carousels } from "./carousels";
import * as Hero from "./hero";
import { Navbar } from "./navbar";

const navbar = Navbar.initialize();
Carousels.initialize();
Hero.initialize();

const modal = bootstrap.Modal.getOrCreateInstance("#modal-construction");
modal.show();

export {
    navbar,
};


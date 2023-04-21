class Helpers {
    static isElementVisible(element: HTMLElement): boolean {
        const box = element.getBoundingClientRect();
        return (box.top >= -box.height) && box.bottom <= (window.innerHeight + box.height);
    }
}

interface ICarousel {
    element: HTMLElement;
    carousel: bootstrap.Carousel;
}

class Carousels {
    public static initialize(): void {
        new Carousels();
    }

    private readonly carousels: ICarousel[] = [];

    private constructor() {
        const carouselsElements = document.querySelectorAll<HTMLElement>(".carousel");
        for (let i = 0; i < carouselsElements.length; i++) {
            const carouselElement = carouselsElements[i]!;
            const carousel = {
                element: carouselElement,
                carousel: bootstrap.Carousel.getOrCreateInstance(carouselElement),
            };
            // carousel.carousel.interval = 1000;
            this.carousels.push(carousel);
        }

        document.addEventListener("scroll", () => this.update());
        document.addEventListener("resize", () => this.update());
        this.update();
    }

    private update(): void {
        for (const carousel of this.carousels) {
            if (Helpers.isElementVisible(carousel.element)) {
                carousel.carousel.cycle();
            } else {
                carousel.carousel.pause();
            }
        }
    }
}

class Hero {
    public static initialize(): void {
        const hero = document.getElementById("site-hero")!;
        function updateParallax(): void {
            const heroHeight = hero.getBoundingClientRect().height;
            const r = window.scrollY / heroHeight;
            const pix = Math.floor(0.25 * r * heroHeight);
            hero.style.backgroundPosition = "center " + pix + "px";
        }
        window.addEventListener("scroll", updateParallax);
        window.addEventListener("resize", updateParallax);
        updateParallax();
    }
}

class Navbar {
    private readonly navbarElement: HTMLElement;

    public constructor() {
        this.navbarElement = document.querySelector<HTMLElement>("header nav")!;

        window.addEventListener("scroll", () => this.updateScrollStyle());
        window.addEventListener("resize", () => this.updateScrollStyle());
        this.updateScrollStyle();

        document.addEventListener("click", (event) => {
            let element = event.target as Node | null;
            while (element) {
                if (element === this.navbarElement) {
                    return;
                }
                element = element.parentNode;
            }
            this.collapseMenu();
        });
    }

    public scrollToElement(id: string): void {
        const target = document.getElementById(id)!;

        const headerOffset = 58; // height of the navbar
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            left: 0,
            behavior: "smooth",
        });
        this.collapseMenu();
    }

    public toggleMenu(): void {
        if (this.isMenuExpanded) {
            this.collapseMenu();
        } else {
            this.expandMenu();
        }
    }

    private updateScrollStyle(): void {
        if (window.scrollY > 0) {
            this.navbarElement.classList.add("scrolled");
        } else {
            this.navbarElement.classList.remove("scrolled");
        }
    }

    private get isMenuExpanded(): boolean {
        return this.navbarElement.classList.contains("expanded");
    }
    private expandMenu(): void {
        this.navbarElement.classList.add("expanded");
    }
    private collapseMenu(): void {
        this.navbarElement.classList.remove("expanded");
    }
}

const navbar = new Navbar();
Carousels.initialize();
Hero.initialize();

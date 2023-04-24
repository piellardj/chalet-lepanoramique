class Helpers {
    static isElementVisible(element: HTMLElement): boolean {
        const box = element.getBoundingClientRect();
        return (box.bottom >= Navbar.height) && box.top <= window.innerHeight;
    }
}

interface ICarousel {
    element: HTMLElement;
    carousel: bootstrap.Carousel;
    isVisible: boolean;
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
                isVisible: Helpers.isElementVisible(carouselElement),
            };

            carousel.element.addEventListener("slide.bs.carousel", (event: any) => {
                const slide = event.relatedTarget;
                const video = slide.querySelector("video") as HTMLVideoElement | null;
                if (video) {
                    video.currentTime = 0;
                    video.play();
                }
            });
            this.carousels.push(carousel);
        }

        document.addEventListener("scroll", () => this.update());
        document.addEventListener("resize", () => this.update());
        this.update();
    }

    private update(): void {
        for (const carousel of this.carousels) {
            const forEachVideo = (callback: (vid: HTMLVideoElement) => void): void => {
                const videos = carousel.element.querySelectorAll("video");
                for (let i = 0; i < videos.length; i++) {
                    callback(videos[i]!);
                }
            };

            const isVisible = Helpers.isElementVisible(carousel.element);
            if (isVisible !== carousel.isVisible) {
                carousel.isVisible = isVisible;

                if (carousel.isVisible) {
                    carousel.carousel.cycle();
                    carousel.carousel.to(0);
                    forEachVideo(video => {
                        video.currentTime = 0;
                        video.play();
                    });
                }
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
    public static readonly height = 58;
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

        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - Navbar.height;

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
            document.body.classList.add("scrolled");
        } else {
            document.body.classList.remove("scrolled");
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

import * as Helpers from "./helpers";

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

export {
    Carousels,
};


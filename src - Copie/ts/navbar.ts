class Navbar {
    private static instance: Navbar | null = null;
    public static initialize(): Navbar {
        if (!Navbar.instance) {
            Navbar.instance = new Navbar();
        }
        return Navbar.instance;
    }

    private readonly navbarElement: HTMLElement;

    private constructor() {
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

export {
    Navbar,
};


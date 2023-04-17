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

export {
    Hero,
}
namespace Page.NavBar {
    function updateHeaderOpacity(): void {
        const topBar = document.getElementById("top-bar");
        const header = document.getElementById("nav-bar");
        if (!header || !topBar) {
            throw new Error();
        }

        const topBarHeight = topBar.getBoundingClientRect().height;
        if (window.scrollY <= topBarHeight) {
            header.classList.remove("sticky");
        } else {
            header.classList.add("sticky");
        }
    }

    window.addEventListener("resize", updateHeaderOpacity);
    window.document.addEventListener("scroll", updateHeaderOpacity);
    updateHeaderOpacity();

    export function scrollTo(selector: string): void {
        const navBar = document.getElementById("nav-bar");
        const target = document.querySelector(selector);
        if (!target || !navBar) {
            throw new Error(`No scroll target found for '${selector}'.`);
        }
        const headerOffset = navBar.getBoundingClientRect().height;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        console.log(`headerOffset: ${headerOffset}\telementPosition: ${elementPosition}\tscrollY:${window.scrollY}`);
        window.scrollTo({
            top: offsetPosition,
            left: 0,
            behavior: "smooth",
        });
    }
}

namespace Page.NavBar {
    function updateHeaderOpacity(): void {
        const topBar = document.getElementById("top-bar");
        const header = document.getElementById("nav-bar");
        if (!header || !topBar) {
            throw new Error();
        }

        if (window.scrollY < topBar.getBoundingClientRect().height) {
            header.classList.remove("opaque");
            header.classList.remove("sticky");
        } else {
            header.classList.add("opaque");
            header.classList.add("sticky");
        }
    }

   window.addEventListener("resize", updateHeaderOpacity);
   window.document.addEventListener("scroll", updateHeaderOpacity);
}

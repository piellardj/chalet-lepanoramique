namespace Page.NavBar {
    function updateHeaderOpacity(): void {
        const topBar = document.getElementById("top-bar");
        const header = document.getElementById("nav-bar");
        if (!header || !topBar) {
            throw new Error();
        }

        const topBarHeight = topBar.getBoundingClientRect().height;
        if (window.scrollY <= topBarHeight) {
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

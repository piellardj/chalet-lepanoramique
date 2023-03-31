(function initializeNavBar() {
    const navbar = document.querySelector("header nav");
    function updateNavbarStyle() {
        if (window.scrollY > 0) {
            navbar.classList.remove("bg-transparent");
            navbar.classList.remove("navbar-dark");
            navbar.classList.add("navbar-light");
            navbar.classList.add("backdrop-shadow");
            navbar.classList.add("bg-light");
        } else {
            navbar.classList.add("bg-transparent");
            navbar.classList.add("navbar-dark");
            navbar.classList.remove("backdrop-shadow");
        }
    }
    window.addEventListener("scroll", updateNavbarStyle);
    window.addEventListener("resize", updateNavbarStyle);
    updateNavbarStyle();
})();

(function initializeHero() {
    const hero = document.getElementById("site-hero");
    function updateParallax() {
        const heroHeight = hero.getBoundingClientRect().height;
        const r = window.scrollY / heroHeight;
        const pix = Math.floor(0.25 * r * heroHeight);
        hero.style.backgroundPosition = "center " + pix + "px";
    }
    window.addEventListener("scroll", updateParallax);
    window.addEventListener("resize", updateParallax);
    updateParallax();
})();

function closeNavbar() {
    const collapseElement = document.querySelector(".navbar-collapse");
    if (collapseElement.classList.contains("show")) {
        const collapse = new bootstrap.Collapse(collapseElement);
        collapse.hide();
    }
}
document.addEventListener("click", (event) => {
    if (!event.target.closest("nav")) {
        closeNavbar();
    }
});

function scrollToElement(id /* string */) /* false */ {
    const target = document.getElementById(id);

    const headerOffset = 58; // height of the navbar
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        left: 0,
        behavior: "smooth",
    });
    // closeNavbar();
    // return false;
}

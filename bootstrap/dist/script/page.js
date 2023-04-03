const navBar = (function initializeNavBar() {
    const navbarElement = document.querySelector("header nav");

    function updateNavbarStyle() {
        if (window.scrollY > 0) {
            navbarElement.classList.add("scrolled");
        } else {
            navbarElement.classList.remove("scrolled");
        }
    }
    window.addEventListener("scroll", updateNavbarStyle);
    window.addEventListener("resize", updateNavbarStyle);
    updateNavbarStyle();

    function isExpanded() {
        return navbarElement.classList.contains("expanded");
    }
    function expandNavbar() {
        navbarElement.classList.add("expanded");
    }
    function closeNavbar() {
        navbarElement.classList.remove("expanded");
    }

    function toggle() {
        if (isExpanded()) {
            closeNavbar();
        } else {
            expandNavbar();
        }
    };
    document.addEventListener("click", (event) => {
        let element = event.target;
        while (element) {
            if (element === navbarElement) {
                return;
            }
            element = element.parentNode;
        }
        closeNavbar();
    });

    return {
        closeNavbar,
        toggle,
    };
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
    navBar.closeNavbar();
}

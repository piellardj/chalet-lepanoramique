"use strict";
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.isElementVisible = function (element) {
        var box = element.getBoundingClientRect();
        return (box.top >= -box.height) && box.bottom <= (window.innerHeight + box.height);
    };
    return Helpers;
}());
var Carousels = /** @class */ (function () {
    function Carousels() {
        var _this = this;
        this.carousels = [];
        var carouselsElements = document.querySelectorAll(".carousel");
        for (var i = 0; i < carouselsElements.length; i++) {
            var carouselElement = carouselsElements[i];
            var carousel = {
                element: carouselElement,
                carousel: bootstrap.Carousel.getOrCreateInstance(carouselElement),
            };
            // carousel.carousel.interval = 1000;
            this.carousels.push(carousel);
        }
        document.addEventListener("scroll", function () { return _this.update(); });
        document.addEventListener("resize", function () { return _this.update(); });
        this.update();
    }
    Carousels.initialize = function () {
        new Carousels();
    };
    Carousels.prototype.update = function () {
        for (var _i = 0, _a = this.carousels; _i < _a.length; _i++) {
            var carousel = _a[_i];
            if (Helpers.isElementVisible(carousel.element)) {
                carousel.carousel.cycle();
            }
            else {
                carousel.carousel.pause();
            }
        }
    };
    return Carousels;
}());
var Hero = /** @class */ (function () {
    function Hero() {
    }
    Hero.initialize = function () {
        var hero = document.getElementById("site-hero");
        function updateParallax() {
            var heroHeight = hero.getBoundingClientRect().height;
            var r = window.scrollY / heroHeight;
            var pix = Math.floor(0.25 * r * heroHeight);
            hero.style.backgroundPosition = "center " + pix + "px";
        }
        window.addEventListener("scroll", updateParallax);
        window.addEventListener("resize", updateParallax);
        updateParallax();
    };
    return Hero;
}());
var Navbar = /** @class */ (function () {
    function Navbar() {
        var _this = this;
        this.navbarElement = document.querySelector("header nav");
        window.addEventListener("scroll", function () { return _this.updateScrollStyle(); });
        window.addEventListener("resize", function () { return _this.updateScrollStyle(); });
        this.updateScrollStyle();
        document.addEventListener("click", function (event) {
            var element = event.target;
            while (element) {
                if (element === _this.navbarElement) {
                    return;
                }
                element = element.parentNode;
            }
            _this.collapseMenu();
        });
    }
    Navbar.prototype.scrollToElement = function (id) {
        var target = document.getElementById(id);
        var headerOffset = 58; // height of the navbar
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            left: 0,
            behavior: "smooth",
        });
        this.collapseMenu();
    };
    Navbar.prototype.toggleMenu = function () {
        if (this.isMenuExpanded) {
            this.collapseMenu();
        }
        else {
            this.expandMenu();
        }
    };
    Navbar.prototype.updateScrollStyle = function () {
        if (window.scrollY > 0) {
            this.navbarElement.classList.add("scrolled");
        }
        else {
            this.navbarElement.classList.remove("scrolled");
        }
    };
    Object.defineProperty(Navbar.prototype, "isMenuExpanded", {
        get: function () {
            return this.navbarElement.classList.contains("expanded");
        },
        enumerable: false,
        configurable: true
    });
    Navbar.prototype.expandMenu = function () {
        this.navbarElement.classList.add("expanded");
    };
    Navbar.prototype.collapseMenu = function () {
        this.navbarElement.classList.remove("expanded");
    };
    return Navbar;
}());
var navbar = new Navbar();
Carousels.initialize();
Hero.initialize();
//# sourceMappingURL=page.js.map
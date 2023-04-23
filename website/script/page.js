"use strict";
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.isElementVisible = function (element) {
        var box = element.getBoundingClientRect();
        return (box.bottom >= Navbar.height) && box.top <= window.innerHeight;
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
                isVisible: Helpers.isElementVisible(carouselElement),
            };
            carousel.element.addEventListener("slide.bs.carousel", function (event) {
                var slide = event.relatedTarget;
                var video = slide.querySelector("video");
                if (video) {
                    video.currentTime = 0;
                    video.play();
                }
            });
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
        var _loop_1 = function (carousel) {
            var forEachVideo = function (callback) {
                var videos = carousel.element.querySelectorAll("video");
                for (var i = 0; i < videos.length; i++) {
                    callback(videos[i]);
                }
            };
            var isVisible = Helpers.isElementVisible(carousel.element);
            if (isVisible !== carousel.isVisible) {
                carousel.isVisible = isVisible;
                if (carousel.isVisible) {
                    carousel.carousel.cycle();
                    carousel.carousel.to(0);
                    forEachVideo(function (video) {
                        video.currentTime = 0;
                        video.play();
                    });
                }
            }
        };
        for (var _i = 0, _a = this.carousels; _i < _a.length; _i++) {
            var carousel = _a[_i];
            _loop_1(carousel);
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
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.scrollY - Navbar.height;
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
    Navbar.height = 58;
    return Navbar;
}());
var navbar = new Navbar();
Carousels.initialize();
Hero.initialize();
//# sourceMappingURL=page.js.map
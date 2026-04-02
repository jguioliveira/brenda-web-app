/* Mobile Menu */
const body = document.querySelector('body');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
const mobibleToggleButtons = document.querySelectorAll('.menu-mobile-toggle');
const backdrop = document.querySelector('#menu-backdrop');

function mobileMenuClassToggle() {
    body.classList.toggle('menu-open');
}

function mobileMenuToggle() {
    const toggleElements = [...mobileMenuLinks, ...mobibleToggleButtons, backdrop];

    toggleElements.forEach(element => {
        element.addEventListener('click', mobileMenuClassToggle);
    });
}

mobileMenuToggle();

/* Glider Carousel */
var glide = new Glide(".glide", {
    type: "carousel",
    focusAt: "center",
    perView: 3,
    startAt: 0,
    breakpoints: {
        1200: {
            perView: 2
        },
        768: {
            perView: 1
        }
    }
});

glide.mount();
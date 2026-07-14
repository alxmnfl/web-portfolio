/*Typing animation in hero section*/

const typed = new Typed("#typed", {
    strings: [
        "Front-End Developer",
        "HTML",
        "CSS",
        "JavaScript",
        "Tailwind CSS",
        "Bootstrap",
        "Express.js"
    ],

    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1500,

    loop: true,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|"
});

/* Mobile menu toggle */

const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header-nav');
const overlay = document.querySelector('.overlay');

function closeMenu() {
    headerNav.classList.remove('open');
    overlay.classList.remove('active');
}

if (hamburger && headerNav && overlay) {
    hamburger.addEventListener('click', () => {
        headerNav.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.header-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* Smooth scrolling for nav links */

document.querySelectorAll('.header-nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* Skills animation on scroll */

const skillElements = document.querySelectorAll(".skills span");

const aboutMeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add("visible");
                }, index * 120);
            });
            aboutMeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const aboutMeSection = document.getElementById("aboutme");
if (aboutMeSection) {
    aboutMeObserver.observe(aboutMeSection);
}

/* Active nav link on scroll */

const sections = document.querySelectorAll('section, main');
const navLinks = document.querySelectorAll('.header-nav a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});

/* Reveal animations on scroll */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


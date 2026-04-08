// Custom Cursor
const cursorBlob = document.querySelector('.cursor-blob');
const cursorGlow = document.querySelector('.cursor-blob-glow');
const interactables = document.querySelectorAll('a, button, .menu-toggle');

// Only run cursor logic if not on a touch device
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && cursorBlob && cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorBlob.style.left = `${e.clientX}px`;
        cursorBlob.style.top = `${e.clientY}px`;
        
        // Slight delay for glow effect
        setTimeout(() => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }, 80);
    });

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorBlob.style.width = '40px';
            cursorBlob.style.height = '40px';
            cursorBlob.style.backgroundColor = 'rgba(56, 189, 248, 0.4)';
            cursorBlob.style.border = '1px solid #38bdf8';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorBlob.style.width = '20px';
            cursorBlob.style.height = '20px';
            cursorBlob.style.backgroundColor = 'var(--accent-1)';
            cursorBlob.style.border = 'none';
        });
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger to X (simple visual toggle can be added here)
    const bars = menuToggle.querySelectorAll('.bar');
    if(navLinks.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
});

// Intersection Observer for Scroll Animations
const revealElements = document.querySelectorAll('.reveal-up');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Active Link highlighting on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

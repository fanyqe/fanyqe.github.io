// Initialize AOS with reduced motion for better performance
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true, // animations occur only once
        disable: 'mobile', // disable on mobile devices
        startEvent: 'load' // start animations after everything is loaded
    });
});

// Typing Animation - Optimized
const phrases = ["Unity Developer", "Game Developer", "Flutter Developer", "Mobile Developer"];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
const typedTextElement = document.querySelector('.typed-text');

function typeText() {
    if (!typedTextElement) return; // Guard clause

    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        currentCharIndex++;
        typingSpeed = 100;
    }

    typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex);

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    requestAnimationFrame(() => setTimeout(typeText, typingSpeed));
}

// Start typing animation when element is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeText();
            observer.disconnect();
        }
    });
});

if (typedTextElement) {
    observer.observe(typedTextElement);
}

// Mobile Navigation - Optimized
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Optimize VanillaTilt initialization
function initTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    if (window.innerWidth > 768) { // Only enable on desktop
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 200,
            glare: true,
            'max-glare': 0.3,
            scale: 1.02
        });
    }
}

// Initialize tilt effects after page load
window.addEventListener('load', initTilt);

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initTilt, 250);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-active') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target)) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Remove any scroll-related navbar effects
const navbar = document.querySelector('.navbar');
if (navbar.classList.contains('scrolled')) {
    navbar.classList.remove('scrolled');
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // Here you would typically send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Clear form
    contactForm.reset();
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
});

// Skills Animation
const skillCards = document.querySelectorAll('.skill-card');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            if (progressBar) {
                progressBar.style.width = progressBar.getAttribute('data-progress') + '%';
            }
        }
    });
}, observerOptions);

skillCards.forEach(card => observer.observe(card));

// Initialize Particles.js
particlesJS('particles-js',
{
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.5,
            "random": true
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        }
    },
    "retina_detect": true
});

// Tilt Effect on Cards
VanillaTilt.init(document.querySelectorAll('.project-card'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.5
});

// Magnetic Button Effect
const buttons = document.querySelectorAll('.cta-button, .project-link, .submit-btn');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
        btn.style.setProperty('--move-x', `${(x - rect.width / 2) * 0.2}px`);
        btn.style.setProperty('--move-y', `${(y - rect.height / 2) * 0.2}px`);
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--move-x', '0px');
        btn.style.setProperty('--move-y', '0px');
    });
});

// Smooth Parallax Scrolling
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic Skill Bars Animation
const skillBars = document.querySelectorAll('.progress');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const value = bar.dataset.progress || '0';
        bar.style.width = `${value}%`;
        
        // Add counter
        const counter = document.createElement('span');
        counter.classList.add('skill-counter');
        counter.textContent = '0%';
        bar.appendChild(counter);
        
        let count = 0;
        const updateCounter = () => {
            const target = parseInt(value);
            if (count < target) {
                count++;
                counter.textContent = count + '%';
                requestAnimationFrame(updateCounter);
            }
        };
        updateCounter();
    });
};

// Cursor Trail Effect
const cursor = document.createElement('div');
cursor.classList.add('cursor-trail');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
});

// Initialize AOS with more dynamic settings
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    anchorPlacement: 'center-bottom'
});

// Typing Animation
const phrases = ["Developer", "Designer", "Innovator"];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const typedTextElement = document.querySelector('.typed-text');
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before starting new word
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation
typeText();

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
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

// Initialize Vanilla Tilt
VanillaTilt.init(document.querySelectorAll(".floating-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
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

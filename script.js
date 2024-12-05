// Initialize AOS with minimal settings for mobile
document.addEventListener('DOMContentLoaded', function() {
    // Check if device is desktop
    const isDesktop = window.innerWidth >= 769;

    // Initialize desktop-only features
    if (isDesktop) {
        // Initialize particles.js
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 30,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "opacity": {
                    "value": 0.3
                },
                "size": {
                    "value": 3
                },
                "move": {
                    "speed": 2
                }
            }
        });

        // Initialize VanillaTilt for cards
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 0.5,
        });

        // Initialize AOS with full animations
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false
        });
    } else {
        // Mobile-optimized AOS
        AOS.init({
            duration: 500,
            once: true,
            mirror: false,
            disable: true
        });

        // Remove particles.js on mobile
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.remove();
        }
    }

    // Typing animation - optimized for both desktop and mobile
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.getAttribute('data-text');
        const typeSpeed = isDesktop ? 100 : 50;
        
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(text, 0, typeSpeed);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(typingText);
    }
});

// Typing Animation - Further Optimized
const phrases = ["Unity Developer", "Game Developer", "Flutter Developer", "Mobile Developer"];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let typingInterval;
const typedTextElement = document.querySelector('.typed-text');

function typeText() {
    if (!typedTextElement) return;

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

    clearTimeout(typingInterval);
    typingInterval = setTimeout(typeText, typingSpeed);
}

// Start typing animation only when visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeText();
            observer.disconnect();
        }
    });
}, { threshold: 0.5 });

if (typedTextElement) {
    observer.observe(typedTextElement);
}

// Mobile Navigation - Simplified
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Optimize scroll performance
let ticking = false;
function onScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Add any scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Initialize tilt only on desktop with reduced settings
function initTilt() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        VanillaTilt.init(tiltElements, {
            max: 5,
            speed: 400,
            scale: 1.01,
            glare: false
        });
    }
}

// Initialize tilt after page load
window.addEventListener('load', initTilt);

// Clean up event listeners when possible
window.addEventListener('unload', () => {
    window.removeEventListener('scroll', onScroll);
    clearTimeout(typingInterval);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-active') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target)) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
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

function typeWriter(text, i, speed) {
    if (i < text.length) {
        document.querySelector('.typing-text').textContent = text.substring(0, i + 1);
        setTimeout(() => typeWriter(text, i + 1, speed), speed);
    }
}

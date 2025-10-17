// Portfolio Animations and Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        // Animate elements on scroll
        animateOnScroll();
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to section with offset for fixed nav
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Animate elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('aos-animate');
            }
        });
    }

    // Add animation classes to elements
    function initAnimations() {
        // Add AOS attributes to elements
        const elementsToAnimate = document.querySelectorAll('.formation-card, .skill-category, .timeline-item, .encadreur-card, .section-title, .hero-text, .profile-image, .contact-info p, .social-links, .btn');
        
        // We've already added data-aos attributes in HTML, so we just need to initialize the observer
    }

    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        const speed = 0.5;
        
        header.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Image hover effects
    document.querySelectorAll('.image-frame, .formation-image, .timeline-image').forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Initialize animations
    initAnimations();
    
    // Trigger initial scroll check
    animateOnScroll();

    // Typewriter effect for hero text
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typewriter effect after page load
    const heroText = document.querySelector('.hero-text p');
    if (heroText) {
        const text = heroText.textContent;
        // Start animation after a short delay
        setTimeout(() => {
            typeWriter(heroText, text, 30);
        }, 1500);
    }

    // Confetti effect for button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            createConfetti();
        });
    });

    // Confetti effect function
    function createConfetti() {
        const colors = ['#2563eb', '#7e22ce', '#06b6d4', '#10b981', '#f59e0b'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(confettiContainer);
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                border-radius: 2px;
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            
            confettiContainer.appendChild(confetti);
        }
        
        // Remove after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
        
        // Add animation CSS
        if (!document.querySelector('#confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
});s
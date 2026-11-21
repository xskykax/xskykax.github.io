// GSAP animations with accessibility support
gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navCenter = document.querySelector('.nav-center');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenuToggle.setAttribute('aria-label', isExpanded ? 'Открыть меню' : 'Закрыть меню');
        navCenter.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Открыть меню');
            navCenter.classList.remove('active');
        });
    });
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

if (!prefersReducedMotion) {
    // Animate stats counter
    const animateCounter = (element) => {
        const target = parseInt(element.dataset.count);
        const duration = 2;

        element.innerText = target; // Set final value immediately

        gsap.from(element, {
            innerText: 0,
            duration: duration,
            ease: 'power1.out',
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                once: true
            },
            onUpdate: function() {
                const current = gsap.getProperty(element, 'innerText');
                element.innerText = Math.ceil(current);
            }
        });
    };

    document.querySelectorAll('.stat-number').forEach(animateCounter);

    // Reveal sections on scroll
    gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true
            }
        });
    });

    // Animate menu items with stagger
    const menuItems = gsap.utils.toArray('.menu-item');
    if (menuItems.length > 0) {
        gsap.set('.menu-item', { opacity: 1, y: 0 }); // Ensure visibility first
        gsap.from('.menu-item', {
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.menu-grid',
                start: 'top 80%',
                once: true
            }
        });
    }

    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.set(item, { opacity: 1, x: 0 }); // Ensure visibility first
        gsap.from(item, {
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                once: true
            }
        });
    });

    // Animate testimonials
    const testimonials = gsap.utils.toArray('.testimonial-card');
    if (testimonials.length > 0) {
        gsap.set('.testimonial-card', { opacity: 1, y: 0 }); // Ensure visibility first
        gsap.from('.testimonial-card', {
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.testimonials-grid',
                start: 'top 80%',
                once: true
            }
        });
    }


    // Story images parallax
    gsap.to('.story-image-main', {
        y: -40,
        ease: 'none',
        scrollTrigger: {
            trigger: '.story',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.story-image-accent', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
            trigger: '.story',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Fade in hero content
    const heroTimeline = gsap.timeline({ delay: 0.2 });

    heroTimeline
        .from('.hero-title', {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power2.out'
        })
        .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.7')
        .from('.cta-button', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.7')
        .from('.scroll-indicator', {
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.5');

} else {
    // For users who prefer reduced motion, just reveal sections immediately
    document.querySelectorAll('.reveal-section').forEach(section => {
        section.classList.add('revealed');
    });

    // Immediately show final counter values
    document.querySelectorAll('.stat-number').forEach(element => {
        element.innerText = element.dataset.count;
    });
}

// Lazy loading images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}
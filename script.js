document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.setAttribute('data-theme', 'dark');
    }
    
    themeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide change every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize first slide
    showSlide(0);

    // Animate Progress Bars on Scroll
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0';
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    bar.style.width = `${width}%`;
                    observer.unobserve(bar);
                }
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    }
    
    animateProgressBars();

    // Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For this template, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the email to a server
        // For this template, we'll just show an alert
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });

    // Scroll Reveal Animation
    const scrollReveal = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.hero-text, .hero-image, .section-header', { origin: 'top' });
    scrollReveal.reveal('.about-image, .service-card, .portfolio-item, .testimonial-card, .contact-info', { 
        origin: 'left',
        interval: 100
    });
    scrollReveal.reveal('.about-text, .contact-form', { origin: 'right' });
    scrollReveal.reveal('.footer-content > div', { 
        origin: 'bottom',
        interval: 100
    });
});
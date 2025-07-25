document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Clone navigation links
                const navLinksClone = navLinks.cloneNode(true);
                mobileMenu.appendChild(navLinksClone);
                
                // Clone auth buttons
                const authButtonsClone = authButtons.cloneNode(true);
                mobileMenu.appendChild(authButtonsClone);
                
                // Append to navbar
                document.querySelector('.navbar').appendChild(mobileMenu);
                
                // Add styles
                mobileMenu.style.position = 'absolute';
                mobileMenu.style.top = '100%';
                mobileMenu.style.left = '0';
                mobileMenu.style.width = '100%';
                mobileMenu.style.backgroundColor = 'white';
                mobileMenu.style.padding = '20px';
                mobileMenu.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                mobileMenu.style.display = 'none';
                mobileMenu.style.flexDirection = 'column';
                mobileMenu.style.gap = '20px';
                
                // Style the cloned elements
                navLinksClone.style.display = 'flex';
                navLinksClone.style.flexDirection = 'column';
                navLinksClone.style.gap = '15px';
                
                authButtonsClone.style.display = 'flex';
                authButtonsClone.style.gap = '10px';
            }
            
            // Toggle mobile menu
            mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'flex' : 'none';
        });
    }
    
    // Testimonial Slider
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelector('.testimonials-slider');
    
    if (dots.length > 0 && testimonials) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Update active dot
                document.querySelector('.dot.active').classList.remove('active');
                dot.classList.add('active');
                
                // Calculate slide position
                const slideWidth = document.querySelector('.testimonial').offsetWidth + 30; // width + gap
                testimonials.style.transform = `translateX(-${index * slideWidth}px)`;
                testimonials.style.transition = 'transform 0.5s ease';
            });
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simulate form submission
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.disabled = true;
                button.textContent = 'Subscribing...';
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    emailInput.value = '';
                    button.textContent = 'Subscribed!';
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        button.disabled = false;
                        button.textContent = originalText;
                    }, 2000);
                    
                    // Create and show notification
                    showNotification('Successfully subscribed to the newsletter!', 'success');
                }, 1500);
            }
        });
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Set color based on type
        if (type === 'success') {
            notification.style.backgroundColor = '#10b981';
            notification.style.color = 'white';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#ef4444';
            notification.style.color = 'white';
        } else {
            notification.style.backgroundColor = '#3b82f6';
            notification.style.color = 'white';
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Add animation class to elements
    document.querySelectorAll('.event-card, .step, .testimonial').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Initial check and add scroll listener
    if (animateElements.length > 0) {
        checkScroll();
        window.addEventListener('scroll', checkScroll);
    }
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
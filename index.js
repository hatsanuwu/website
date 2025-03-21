// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Guías - Category Filters
    const guideCategories = document.querySelectorAll('.guide-category');
    const guideCards = document.querySelectorAll('.guide-card');

    if (guideCategories.length > 0) {
        guideCategories.forEach(category => {
            category.addEventListener('click', () => {
                // Remove active class from all categories
                guideCategories.forEach(c => c.classList.remove('active'));

                // Add active class to clicked category
                category.classList.add('active');

                // Simple filter simulation
                const filter = category.textContent.toLowerCase();

                // Show animation for filter change
                guideCards.forEach(card => {
                    card.style.opacity = '0.5';
                    card.style.transform = 'scale(0.95)';

                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 300);
                });
            });
        });
    }

    // Calendar Button Selection
    const calendarBtns = document.querySelectorAll('.calendar-btn');

    if (calendarBtns.length > 0) {
        calendarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                calendarBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const subjectSelect = this.querySelector('#subject');
            const messageTextarea = this.querySelector('#message');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectSelect.value;
            const message = messageTextarea.value.trim();

            if (name && email && subject && message && isValidEmail(email)) {
                // Show success message
                showToast('¡Gracias por tu mensaje! Te responderemos lo antes posible.', 'success');

                // Reset form
                contactForm.reset();
            } else {
                // Show error message
                showToast('Por favor, completa todos los campos correctamente.', 'error');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mainNav && mainNav.classList.contains('active') && !e.target.closest('nav') && e.target !== menuToggle) {
            mainNav.classList.remove('active');
        }
    });

    // Navigation active state based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');

    function highlightNavOnScroll() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // Reviews Slider Functionality
    const reviewsSlider = document.getElementById('reviews-slider');
    const prevReviewBtn = document.getElementById('prev-review');
    const nextReviewBtn = document.getElementById('next-review');

    if (reviewsSlider && prevReviewBtn && nextReviewBtn) {
        const reviewCards = reviewsSlider.querySelectorAll('.review-card');
        let currentIndex = 0;
        let cardWidth = reviewCards[0].offsetWidth + 30; // Card width + gap
        let maxIndex = reviewCards.length - getVisibleCards();

        // Update card width on window resize
        window.addEventListener('resize', () => {
            cardWidth = reviewCards[0].offsetWidth + 30;
            maxIndex = reviewCards.length - getVisibleCards();
            moveSlider(currentIndex);
        });

        // Function to determine how many cards are visible based on viewport
        function getVisibleCards() {
            const viewportWidth = window.innerWidth;
            if (viewportWidth > 1200) return 3;
            if (viewportWidth > 768) return 2;
            return 1;
        }

        // Move slider to specified index
        function moveSlider(index) {
            // Ensure index is within bounds
            if (index < 0) index = 0;
            if (index > maxIndex) index = maxIndex;

            currentIndex = index;
            const translateX = -currentIndex * cardWidth;
            reviewsSlider.style.transform = `translateX(${translateX}px)`;

            // Update button states
            prevReviewBtn.disabled = currentIndex === 0;
            nextReviewBtn.disabled = currentIndex >= maxIndex;

            // Visual feedback for disabled buttons
            prevReviewBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextReviewBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        }

        // Initialize slider position and style
        reviewsSlider.style.display = 'flex';
        reviewsSlider.style.transition = 'transform 0.4s ease';
        moveSlider(0);

        // Event listeners for slider controls
        prevReviewBtn.addEventListener('click', () => moveSlider(currentIndex - 1));
        nextReviewBtn.addEventListener('click', () => moveSlider(currentIndex + 1));
    }

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (isValidEmail(email)) {
                // Show success message
                showToast('¡Gracias por suscribirte! Recibirás pronto nuestras novedades.', 'success');
                emailInput.value = '';
            } else {
                // Show error message
                showToast('Por favor, introduce un email válido.', 'error');
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Toast notification system
    function showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');

        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);

            // Add styles for toast container
            toastContainer.style.position = 'fixed';
            toastContainer.style.bottom = '20px';
            toastContainer.style.right = '20px';
            toastContainer.style.zIndex = '1000';
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        // Toast styles
        toast.style.backgroundColor = type === 'success' ? '#4CAF50' :
            type === 'error' ? '#F44336' : '#2196F3';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '4px';
        toast.style.marginTop = '10px';
        toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';

        // Add toast to container
        toastContainer.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);

        // Remove toast after delay
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';

            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, 4000);
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.game-card, .news-card, .review-card');

    // Add initial styles to elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial check and add scroll listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Typing animation enhancement
    const typingText = document.querySelector('.typing-text span');

    if (typingText) {
        // Keep the CSS animation for basic functionality
        // This is just to ensure it works even if JS doesn't load
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if it's open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {

    // ===== NAVIGATION =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ===== ANIMATED COUNTERS =====
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            }
            updateCounter();
        });
    }

    // Intersection Observer for counters
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    if (document.querySelector('.stat-number')) {
        observer.observe(document.querySelector('.stat-number'));
    }

    // ===== MENU SEARCH & FILTER =====
    const menuSearch = document.getElementById('menuSearch');
    const menuItems = document.querySelectorAll('.menu-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');

    if (menuSearch) {
        // Search functionality
        menuSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            let visibleCount = 0;

            menuItems.forEach(function(item) {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Show/hide no results
            if (noResults) {
                if (visibleCount === 0) {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                }
            }

            // Reset filter buttons
            filterBtns.forEach(function(btn) {
                btn.classList.remove('active');
            });
            document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
        });

        // Filter functionality
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                // Remove active from all
                filterBtns.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');

                const category = this.getAttribute('data-category');
                let visibleCount = 0;

                menuItems.forEach(function(item) {
                    const itemCategory = item.getAttribute('data-category');
                    if (category === 'all' || itemCategory === category) {
                        item.classList.remove('hidden');
                        visibleCount++;
                    } else {
                        item.classList.add('hidden');
                    }
                });

                // Clear search
                if (menuSearch) {
                    menuSearch.value = '';
                }

                // Show/hide no results
                if (noResults) {
                    if (visibleCount === 0) {
                        noResults.style.display = 'block';
                    } else {
                        noResults.style.display = 'none';
                    }
                }
            });
        });
    }

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close all others
            faqItems.forEach(function(other) {
                if (other !== item) {
                    other.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // ===== TESTIMONIAL SLIDER (Home page) =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 3) {
        // Simple auto-rotate if there are more than 3
        let currentIndex = 0;
        const total = testimonialCards.length;

        function showTestimonials() {
            testimonialCards.forEach(function(card, index) {
                if (index >= currentIndex && index < currentIndex + 3) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Only auto-rotate on homepage
        if (document.querySelector('.testimonial-slider')) {
            showTestimonials();
            setInterval(function() {
                currentIndex = (currentIndex + 1) % (total - 2);
                showTestimonials();
            }, 5000);
        }
    }

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== PAGE TRANSITION (fade-in effect) =====
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);

    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(function(img) {
        imageObserver.observe(img);
    });

});

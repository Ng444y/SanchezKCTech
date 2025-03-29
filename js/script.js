document.addEventListener("DOMContentLoaded", function () {
    // Function to load components dynamically
    function loadComponent(elementId, filePath, callback) {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (callback) callback(); // Ensure event listeners are initialized after loading
            })
            .catch(error => console.error(`Error loading ${filePath}:`, error));
    }

    // Global Dark Mode Management
    const DarkMode = {
        init() {
            this.setupThemeToggle();
            this.applyInitialTheme();
        },

        setupThemeToggle() {
            // Ensure theme toggle exists on all pages
            this.createThemeToggleIfMissing();
            
            const themeToggle = document.getElementById("theme-toggle");
            if (themeToggle) {
                themeToggle.addEventListener("click", () => this.toggleTheme());
            }
        },

        createThemeToggleIfMissing() {
            if (!document.getElementById("theme-toggle")) {
                const navbar = document.getElementById("navbar-container");
                if (navbar) {
                    let button = document.createElement("button");
                    button.id = "theme-toggle";
                    button.textContent = this.getCurrentTheme() === "dark" ? "☀️" : "🌙";
                    button.style.marginLeft = "20px";
                    button.setAttribute('aria-label', 'Toggle Dark Mode');
                    navbar.appendChild(button);
                }
            }
        },

        applyInitialTheme() {
            const savedTheme = this.getCurrentTheme();
            const themeToggle = document.getElementById("theme-toggle");

            if (savedTheme === "dark") {
                document.body.classList.add("dark-mode");
                if (themeToggle) themeToggle.textContent = "☀️";
                this.applyDarkModeStyles();
            } else {
                document.body.classList.remove("dark-mode");
                if (themeToggle) themeToggle.textContent = "🌙";
                this.removeDarkModeStyles();
            }
        },

        toggleTheme() {
            const themeToggle = document.getElementById("theme-toggle");
            
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                if (themeToggle) themeToggle.textContent = "☀️";
                this.applyDarkModeStyles();
            } else {
                localStorage.setItem("theme", "light");
                if (themeToggle) themeToggle.textContent = "🌙";
                this.removeDarkModeStyles();
            }
        },

        getCurrentTheme() {
            return localStorage.getItem("theme") || "light";
        },

        applyDarkModeStyles() {
            const elementsToStyle = [
                'body', 
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                'p', 'span', 'div', 
                '.text-content', 
                '.card', 
                '.navbar', 
                'a', 
                'section', 
                'article'
            ];

            elementsToStyle.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (!el.classList.contains('dark-mode-exempt')) {
                        el.style.backgroundColor = '#121212';
                        el.style.color = '#E0E0E0';
                    }
                });
            });
        },

        removeDarkModeStyles() {
            const elementsToStyle = [
                'body', 
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                'p', 'span', 'div', 
                '.text-content', 
                '.card', 
                '.navbar', 
                'a', 
                'section', 
                'article'
            ];

            elementsToStyle.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.backgroundColor = '';
                    el.style.color = '';
                });
            });
        }
    };

    // Projects Carousel Functionality
    function initProjectCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const projectDetails = document.querySelectorAll('.project-info');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (!slides.length) return; // Exit if no carousel on this page
        
        let currentSlide = 0;

        function showSlide(index) {
            // Hide all slides and project details
            slides.forEach(slide => slide.classList.remove('active'));
            projectDetails.forEach(detail => detail.classList.remove('active'));

            // Show current slide and corresponding project details
            slides[index].classList.add('active');
            projectDetails[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Event listeners for navigation buttons
        if (prevBtn && nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
        }

        // Optional: Auto-slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Load Navbar and Footer components
    function loadComponents() {
        loadComponent("navbar-container", "components/navbar.html", function () {
            DarkMode.init();
        });

        loadComponent("footer-container", "components/footer.html");
    }

    // Centralized initialization
    loadComponents();
    initProjectCarousel();

    // Fallback to ensure dark mode toggle works even if components load slowly
    setTimeout(() => {
        DarkMode.init();
        initProjectCarousel();
    }, 1000);
});

// resume download tracking
// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Add download tracking (optional)
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('Resume downloaded');
            // You could add analytics tracking here
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Initialize the carousel
    function initCarousel() {
        const carouselTrack = document.querySelector('.carousel-track');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!slides.length) return; // Exit if no carousel found
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        // Set initial position
        updateCarousel();
        
        // Next button click handler
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        });
        
        // Previous button click handler
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        });
        
        // Indicator click handlers
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Update carousel position and active states
        function updateCarousel() {
            // Update track position - use percentage for better responsiveness
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Auto-advance slides every 5 seconds
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }, 5000);
        
        // Pause on hover
        carouselTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }, 5000);
        });
    }
    
    // Initialize the carousel
    initCarousel();
});
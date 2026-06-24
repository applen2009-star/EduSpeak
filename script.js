// EduSpeak - Main JavaScript File

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('EduSpeak loaded successfully');
    initializeEventListeners();
    setupSmoothScrolling();
});

// Initialize event listeners
function initializeEventListeners() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', handleCTAClick);
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

// Handle CTA button click
function handleCTAClick() {
    alert('Welcome to EduSpeak! Let\'s get started with improving your speaking skills.');
    console.log('CTA button clicked');
}

// Handle navigation link clicks
function handleNavClick(event) {
    const targetId = event.target.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
        event.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            console.log('Navigated to ' + targetId);
        }
    }
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Utility function to log user actions
function logUserAction(action, details) {
    console.log(`[${new Date().toLocaleTimeString()}] ${action}:`, details);
}

// Track page scroll position
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const navbar = document.querySelector('header');
    
    if (scrollPosition > 50) {
        navbar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleCTAClick,
        handleNavClick,
        setupSmoothScrolling,
        logUserAction
    };
}

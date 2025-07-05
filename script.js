// Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const totalSlides = slides.length;

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    updateCarousel();
}

function currentSlide(n) {
    currentSlideIndex = n - 1;
    updateCarousel();
}

// Auto-play carousel
function startAutoPlay() {
    return setInterval(() => {
        changeSlide(1);
    }, 4000);
}

let autoPlayInterval = startAutoPlay();

// Pause auto-play on hover
const carousel = document.querySelector('.carousel-container');
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoPlayInterval = startAutoPlay();
});

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
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

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(16, 16, 30, 0.98)';
        } else {
            header.style.background = 'rgba(16, 16, 30, 0.95)';
        }
    });

    // Add click animation to service buttons
    document.querySelectorAll('.service-btn, .booking-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = e.offsetX - 10 + 'px';
            ripple.style.top = e.offsetY - 10 + 'px';
            ripple.style.width = ripple.style.height = '20px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
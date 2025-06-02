document.addEventListener('DOMContentLoaded', function() {
    // Random Image Loader
    const imageFiles = [
        'our_picture.jpg', 'us.jpg', 'us10.jpeg', 'us11.jpeg', 'us12.jpeg', 
        'us13.jpeg', 'us14.jpeg', 'us15.jpeg', 'us16.jpeg', 'us17.jpeg', 
        'us18.jpeg', 'us2.jpg', 'us3.jpg', 'us4.jpeg', 'us4.jpg', 
        'us5.jpeg', 'us6.jpeg', 'us7.jpeg', 'us8.jpeg', 'us9.jpeg'
    ];
    
    // Replace images with random unique ones
    function randomizeImages() {
        // Create a copy of the image files array to work with
        const availableImages = [...imageFiles];
        const imageElements = document.querySelectorAll('img');
        const carouselImages = document.querySelectorAll('.carousel-item img');
        
        // First, collect all images that are already fixed in the carousel
        const usedImages = new Set();
        carouselImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src) usedImages.add(src);
        });
        
        // Now randomize the remaining images
        imageElements.forEach(img => {
            // Skip images that shouldn't be randomized or are in the carousel
            if (img.parentElement && !img.parentElement.classList.contains('no-random') && 
                !img.closest('.carousel-item')) {
                
                // If we've used all available images, skip
                if (availableImages.length === 0) return;
                
                // Get a random image that hasn't been used yet
                const randomIndex = Math.floor(Math.random() * availableImages.length);
                const selectedImage = availableImages[randomIndex];
                
                // Remove the selected image from available images
                availableImages.splice(randomIndex, 1);
                
                // Set the image source
                img.src = selectedImage;
            }
        });
    }
    
    // Randomize images on page load
    randomizeImages();
    
    // Easter Egg Functionality
    const hiddenHeart = document.getElementById('hidden-heart');
    const secretMessage = document.getElementById('secret-message');
    const closeBtn = document.querySelector('.close-btn');
    
    hiddenHeart.addEventListener('click', function() {
        secretMessage.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        secretMessage.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === secretMessage) {
            secretMessage.style.display = 'none';
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add shooting stars animation
    function createShootingStar() {
        const nightSky = document.querySelector('.night-sky');
        if (!nightSky) return;
        
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        // Random position and angle
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const angle = Math.random() * 45;
        
        shootingStar.style.top = `${startY}%`;
        shootingStar.style.left = `${startX}%`;
        shootingStar.style.transform = `rotate(${angle}deg)`;
        
        nightSky.appendChild(shootingStar);
        
        // Remove after animation completes
        setTimeout(() => {
            shootingStar.remove();
        }, 1000);
    }
    
    // Create shooting stars periodically
    if (document.querySelector('.night-sky')) {
        setInterval(createShootingStar, 3000);
    }
    
    // Add parallax effect to sections
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for landing section
        const landingSection = document.querySelector('#landing');
        if (landingSection) {
            landingSection.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
        }
        
        // Parallax for polaroid images (excluding carousel)
        const polaroids = document.querySelectorAll('.polaroid:not(.carousel .polaroid)');
        polaroids.forEach((polaroid, index) => {
            const speed = 0.05 + (index * 0.01);
            const yPos = -(scrollPosition * speed);
            polaroid.style.transform = `translateY(${yPos}px) rotate(${polaroid.dataset.rotation || 0}deg)`;
        });
    });
    
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
        
        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateCarousel();
            });
        });
        
        // Auto-advance carousel
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            }
        }, 5000);
    }
    
    // Add hover effects for polaroids
    document.querySelectorAll('.polaroid').forEach(polaroid => {
        polaroid.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05) rotate(0)';
        });
        
        polaroid.addEventListener('mouseout', function() {
            const isEven = Array.from(document.querySelectorAll('.polaroid')).indexOf(this) % 2 === 0;
            this.style.transform = isEven ? 'rotate(2deg)' : 'rotate(-2deg)';
        });
    });
    
    // Add double-click Easter egg
    document.addEventListener('dblclick', function(e) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('floating-heart');
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    });
    
    // Add CSS for the floating hearts
    const style = document.createElement('style');
    style.innerHTML = `
        .floating-heart {
            position: fixed;
            font-size: 24px;
            pointer-events: none;
            animation: float 2s ease-out;
            z-index: 9999;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(1.5);
                opacity: 0;
            }
        }
        
        .shooting-star {
            position: absolute;
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, rgba(255,255,255,0), #ffffff);
            animation: shooting 1s linear;
            opacity: 0;
        }
        
        @keyframes shooting {
            0% {
                transform: translateX(0) translateY(0) rotate(var(--angle, 45deg));
                opacity: 1;
            }
            100% {
                transform: translateX(200px) translateY(200px) rotate(var(--angle, 45deg));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
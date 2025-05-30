document.addEventListener('DOMContentLoaded', () => {
    // Get filter elements
    const brandFilter = document.getElementById('brand-filter');
    const priceFilter = document.getElementById('price-filter');
    const typeFilter = document.getElementById('type-filter');
    const carCards = document.querySelectorAll('.car-card');

    // Filter function
    const filterCars = () => {
        const selectedBrand = brandFilter.value;
        const selectedPrice = priceFilter.value;
        const selectedType = typeFilter.value;

        carCards.forEach(card => {
            const brand = card.dataset.brand;
            const price = parseInt(card.dataset.price);
            const type = card.dataset.type;

            const brandMatch = selectedBrand === 'all' || brand === selectedBrand;
            const typeMatch = selectedType === 'all' || type === selectedType;
            
            let priceMatch = true;
            if (selectedPrice !== 'all') {
                const [min, max] = selectedPrice.split('-').map(Number);
                priceMatch = price >= min && price <= max;
            }

            if (brandMatch && priceMatch && typeMatch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    };

    // Add event listeners to filters
    if (brandFilter) brandFilter.addEventListener('change', filterCars);
    if (priceFilter) priceFilter.addEventListener('change', filterCars);
    if (typeFilter) typeFilter.addEventListener('change', filterCars);

    // Physics-based hover effect for car cards
    carCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

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

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe car cards and feature items
    document.querySelectorAll('.car-card, .feature-item').forEach(item => {
        observer.observe(item);
    });

    // Book Now button click handler
    document.querySelectorAll('.book-now-btn').forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate booking process
            setTimeout(() => {
                this.disabled = false;
                this.textContent = originalText;
                alert('Booking feature coming soon!');
            }, 1500);
        });
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .car-card {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .car-card.animate {
        animation: fadeIn 0.5s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .book-now-btn {
        position: relative;
        overflow: hidden;
    }
    
    .book-now-btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
    }
    
    .book-now-btn:active::after {
        width: 200px;
        height: 200px;
    }
`;
document.head.appendChild(style); 
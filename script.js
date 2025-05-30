document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-open');
            navToggle.classList.toggle('nav-open'); // For hamburger animation
            // Toggle body scroll
            if (navLinksContainer.classList.contains('nav-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile nav when a link is clicked
        const allNavLinks = navLinksContainer.querySelectorAll('a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('nav-open')) {
                    navLinksContainer.classList.remove('nav-open');
                    navToggle.classList.remove('nav-open');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
    // --- End Mobile Navigation Toggle ---


    // Smooth scrolling for navigation links
    const mainNavLinks = document.querySelectorAll('nav ul.nav-links li a'); // Target specific links
    mainNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default only if it's a hash link for smooth scroll
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
            } else {
                return; // Allow default behavior for external links or non-hash links
            }

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const header = document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                let offsetPosition = elementPosition - headerOffset;

                // Special adjustment if the mobile nav is open, as its height might affect calculations
                // This is a simplified approach; more complex scenarios might need different logic
                if (navLinksContainer && navLinksContainer.classList.contains('nav-open')) {
                    // If mobile nav is fullscreen, the offset might not need adjustment,
                    // or it might need adjustment based on how the nav covers content.
                    // For now, we use the standard headerOffset.
                }
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CTA button smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = ctaButton.getAttribute('href');
            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const header = document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('.content-section');
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Image Modal Functionality
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("zoomedImage");
    const captionText = document.getElementById("caption");
    const previewImages = document.querySelectorAll(".preview-image");
    const closeModalSpan = document.querySelector(".close-modal");

    if (modal && modalImg && captionText && closeModalSpan && previewImages.length > 0) {
        previewImages.forEach(img => {
            img.onclick = function(event){
                event.preventDefault();
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
                document.body.style.overflow = 'hidden';
            }
        });

        closeModalSpan.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }

        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
            }
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape" && modal.style.display === "block") {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
            }
        });
    } else {
        if (!modal) console.error("Modal element with ID 'imageModal' not found.");
        if (!modalImg) console.error("Modal image element with ID 'zoomedImage' not found.");
        if (!captionText) console.error("Modal caption element with ID 'caption' not found.");
        if (!closeModalSpan) console.error("Modal close button with class '.close-modal' not found.");
        if (previewImages.length === 0) console.warn("No preview images with class '.preview-image' found.");
    }
});
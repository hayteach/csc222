// scripts.js — shared interactive behavior for TOC, Menu button, and Back-to-Top

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const menuBtn = document.getElementById('menuBtn');
        const toc = document.getElementById('tableOfContents');
        const backToTopBtn = document.getElementById('backToTop');
        const sections = document.querySelectorAll('section[id]');
        const tocLinks = document.querySelectorAll('#tableOfContents a');

        let lastScrollTop = 0;
        let ticking = false;

        if (!menuBtn || !toc || !backToTopBtn) {
            // Required elements not present on this page — bail out gracefully
            return;
        }

        // Toggle menu
        menuBtn.addEventListener('click', function () {
            const isShowing = toc.classList.contains('show');
            toc.classList.toggle('show');
            menuBtn.setAttribute('aria-expanded', String(!isShowing));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!toc.contains(event.target) && event.target !== menuBtn) {
                toc.classList.remove('show');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Smooth scrolling for anchor links and focus management
        tocLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    toc.classList.remove('show');
                    menuBtn.setAttribute('aria-expanded', 'false');

                    // Set focus to the section for accessibility
                    targetSection.setAttribute('tabindex', '-1');
                    targetSection.focus();
                }
            });
        });

        // Scroll handling with requestAnimationFrame
        function updateOnScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Show/hide menu button
            if (scrollTop > 200) {
                menuBtn.classList.add('visible');
            } else {
                menuBtn.classList.remove('visible');
            }

            // Show/hide back to top button
            if (scrollTop > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }

            // Highlight active section
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSection) {
                    link.classList.add('active');
                }
            });

            lastScrollTop = scrollTop;
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });

        // Back to top functionality
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Keyboard navigation for back to top
        backToTopBtn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Initial call to set up buttons correctly
        updateOnScroll();
    });
})();
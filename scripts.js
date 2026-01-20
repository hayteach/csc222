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

        // Persist checklist checkbox state: save and restore per-page using localStorage ✅
        (function handleChecklistPersistence() {
            const checklist = document.getElementById('checklist');
            if (!checklist) return;

            const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((cb, index) => {
                // key namespaced by pathname and index so multiple pages don't collide
                const key = `check:${window.location.pathname}:${index}`;

                // Restore saved state
                const saved = localStorage.getItem(key);
                if (saved === '1') cb.checked = true;

                // Save on change
                cb.addEventListener('change', () => {
                    localStorage.setItem(key, cb.checked ? '1' : '0');
                });
            });
        })();
    });
})();

// Add Check and Feedback functionality for quizzes
const funnyNoAnswer = [
    '⚠️ Whoops! You forgot to select an answer. Give it another try!',
    '⚠️ No answer selected! Don\'t be shy, pick one and try again!',
    '⚠️ Hold up! You need to choose an option before we can check it.',
    '⚠️ Uh-oh! It looks like you missed selecting an answer. Try again!',
    '⚠️ Attention! Please select an answer to proceed.',
    '⚠️ Heads up! You haven\'t chosen an answer yet. Take another look!'
];

const funnyCorrect = [
    '✅ Nailed it! You\'re a natural!',
    '✅ Boom! Correct! You\'re on fire! 🔥',
    '✅ Yes! You\'re crushing this!',
    '✅ Perfect! Keep it up, superstar! ⭐',
    '✅ Correct! C++ is lucky to have you!',
    '✅ Absolutely right! High five! 🙌'
];
            
const funnyIncorrect = [
    '❌ Oops! Not quite. Give it another shot! 💪',
    '❌ Close, but not cigar! Try again!',
    '❌ Nice try! Review the material and come back stronger!',
    '❌ Almost! You\'re getting warmer! 🔥',
    '❌ Not this time, but you\'re learning! Keep going!',
    '❌ Swing and a miss! But that\'s okay—try again!'
];
 function checkAnswer(qName, correct, id) {
        const radios = document.getElementsByName(qName);
        let selected = null;
        for (const r of radios) { if (r.checked) selected = r.value; }
        const feedback = document.getElementById('feedback' + id);
        feedback.style.display = 'block';
        if (!selected) {
            feedback.textContent = funnyNoAnswer[Math.floor(Math.random() * funnyNoAnswer.length)];
            feedback.className = 'feedback incorrect';
            feedback.setAttribute('tabindex','-1');
            feedback.focus();
            return;
        }
        if (selected === correct) {
            feedback.textContent = funnyCorrect[Math.floor(Math.random() * funnyCorrect.length)];
            feedback.className = 'feedback correct';
            feedback.setAttribute('tabindex','-1');
            feedback.focus();
        } else {
            feedback.textContent = funnyIncorrect[Math.floor(Math.random() * funnyIncorrect.length)];
            feedback.className = 'feedback incorrect';
            feedback.setAttribute('tabindex','-1');
            feedback.focus();
        }
    }

    function checkAll(answers) {
        //const answers = { q1: 'b', q2: 'c', q3: 'b', q4: 'b' };
        let score = 0; let total = Object.keys(answers).length;
        for (const [q, ans] of Object.entries(answers)) {
            const radios = document.getElementsByName(q);
            let selected = null; for (const r of radios) if (r.checked) selected = r.value;
            if (selected === ans) score++;
            const id = q.replace('q','');
            const feedback = document.getElementById('feedback' + id);
            feedback.style.display = 'block';
            checkAnswer(q, ans, id);
            // if (!selected) { feedback.textContent = 'No answer selected.'; feedback.className='feedback incorrect'; }
            // else if (selected === ans) { feedback.textContent = 'Correct! ✅'; feedback.className='feedback correct'; }
            // else { feedback.textContent = 'Incorrect. ❌'; feedback.className='feedback incorrect'; }
        }
        const summary = document.getElementById('quiz-summary');
        summary.textContent = `You scored ${score} / ${total}.`;
        summary.setAttribute('tabindex','-1');
        summary.focus();
    }


// For the TOC active section highlighting on scroll
    
// Smooth, reliable TOC navigation that plays nice with menu toggling/layout
function smoothScrollToHash(hash) {
  const id = hash.replace(/^#/, '');
  const el = document.getElementById(id);
  if (!el) return;

  // Let CSS scroll-margin-top do the offset work
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Update the URL hash without jumping
  history.pushState(null, '', '#' + id);
}

document.getElementById('tableOfContents')?.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  e.preventDefault(); // we will handle scrolling
  const hash = a.getAttribute('href');

  // If your menu closes/toggles, do that first:
  document.getElementById('tableOfContents')?.classList.remove('show');
  document.getElementById('menuBtn')?.setAttribute('aria-expanded', 'false');

  // After layout settles (menu closing can move content), scroll:
  requestAnimationFrame(() => {
    setTimeout(() => smoothScrollToHash(hash), 0);
  });
});

// Handle direct loads with a hash (e.g., /page.html#complete-example)
window.addEventListener('load', () => {
  if (location.hash) {
    requestAnimationFrame(() => {
      setTimeout(() => smoothScrollToHash(location.hash), 0);
    });
  }
});

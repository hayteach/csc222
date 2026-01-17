 const funnyNoAnswer = [
            '⚠️ Whoa there! Please select an answer first!',
            '⚠️ Hold up! You need to pick an option before checking!',
            '⚠️ Don\'t be shy! Select an answer to see if you\'re right!',
            '⚠️ Oops! Looks like you forgot to choose an answer!',
            '⚠️ Hey! You gotta pick one before I can tell you if it\'s right!',
            '⚠️ No answer selected! Give it a go and try again!'
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

        function showFeedback(feedbackEl, type) {
            if (!feedbackEl) return;
            feedbackEl.style.display = 'block';
            let msg = '';
            if (type === 'noanswer') {
                msg = funnyNoAnswer[Math.floor(Math.random() * funnyNoAnswer.length)];
                feedbackEl.className = 'feedback incorrect';
            } else if (type === 'correct') {
                msg = funnyCorrect[Math.floor(Math.random() * funnyCorrect.length)];
                feedbackEl.className = 'feedback correct';
            } else {
                msg = funnyIncorrect[Math.floor(Math.random() * funnyIncorrect.length)];
                feedbackEl.className = 'feedback incorrect';
            }
            feedbackEl.textContent = msg;
            feedbackEl.setAttribute('tabindex', '-1');
            feedbackEl.focus();
        }

    function checkAnswer(qName, correct, id) {
        const radios = document.getElementsByName(qName);
        let selected = null;
        for (const r of radios) { if (r.checked) selected = r.value; }
        const feedback = document.getElementById('feedback' + id);
        feedback.style.display = 'block';

        if (!selected) {
            showFeedback(feedback, 'noanswer');
            return;
        }
        if (selected === correct) {
            showFeedback(feedback, 'correct');
        } else {
            showFeedback(feedback, 'incorrect');
        }
    }

    function checkAll(answers) {
        //const answers = { q1: 'b', q2: 'c', q3: 'b', q4: 'b' };
        let score = 0; let total = Object.keys(answers).length;
        try {
            for (const [q, ans] of Object.entries(answers)) {
                const radios = document.getElementsByName(q);
                let selected = null; for (const r of radios) if (r.checked) selected = r.value;
                if (selected === ans) score++;
                const id = q.replace('q','');
                const feedback = document.getElementById('feedback' + id);
                if (feedback) feedback.style.display = 'block';
                if (!selected) { showFeedback(feedback, 'noanswer'); }
                else if (selected === ans) { showFeedback(feedback, 'correct'); }
                else { showFeedback(feedback, 'incorrect'); }
            }
        } catch (err) {
            console.error('checkAll error', err);
        }

        const scoreEl = document.getElementById('quiz-score');
        const wittyEl = document.getElementById('quiz-witty');
        if (scoreEl || wittyEl) {
            try {
                const witty = (typeof getScoreMessage === 'function') ? getScoreMessage(score, total) : '';
                if (scoreEl) {
                    scoreEl.textContent = `You scored ${score} / ${total}.`;
                    scoreEl.setAttribute('tabindex','-1');
                    scoreEl.focus();
                    scoreEl.classList.add('summary-flash');
                    setTimeout(() => scoreEl.classList.remove('summary-flash'), 900);
                }
                if (wittyEl) {
                    wittyEl.textContent = witty;
                    wittyEl.setAttribute('tabindex','-1');
                }
            } catch (err) {
                console.error('Error updating score/witty', err);
            }
        } else {
            console.warn('No score/witty elements found');
        }
    }

    // Clear all answers and reset feedback/summary
    function clearAnswers() {
        // Uncheck all radio buttons inside the quiz
        const radios = document.querySelectorAll('#quiz input[type="radio"]');
        radios.forEach(r => { r.checked = false; });

        // Hide and clear all feedback elements inside the quiz
        const feedbacks = document.querySelectorAll('#quiz .feedback');
        feedbacks.forEach(f => {
            f.style.display = 'none';
            f.textContent = '';
            // Reset to base class
            f.className = 'feedback';
            f.removeAttribute('tabindex');
        });

        // Update and announce the score/message cleared
        const scoreEl = document.getElementById('quiz-score');
        const wittyEl = document.getElementById('quiz-witty');
        if (scoreEl) {
            scoreEl.textContent = 'Answers cleared.';
            scoreEl.setAttribute('tabindex', '-1');
            scoreEl.focus();
            scoreEl.classList.add('summary-flash');
            setTimeout(() => scoreEl.classList.remove('summary-flash'), 700);
        }
        if (wittyEl) {
            wittyEl.textContent = '';
            wittyEl.removeAttribute('tabindex');
        }

        // Focus the first radio input to guide keyboard users
        const firstInput = document.querySelector('#quiz input[type="radio"]');
        if (firstInput) {
            firstInput.focus();
        }
    }

    // Witty message generator for final score
    function getScoreMessage(score, total) {
        const pct = total ? Math.round((score / total) * 100) : 0;
        const perfect = ["Perfect! You're unstoppable. 🎉", "Flawless victory — teach me your ways! 🏆"];
        const great = ["Great job! You're almost perfect. Keep it up! 💪", "So close to perfect — awesome work! 🚀"];
        const solid = ["Nice work — solid understanding. A bit more practice and you'll ace it!", "Good job! Review what you missed and try again for even more points."];
        const keepTrying = ["Keep going — practice makes progress! 📚", "Not this time — read the sections you missed and try again! 💡"];

        if (pct === 100) return perfect[Math.floor(Math.random() * perfect.length)];
        if (pct >= 80) return great[Math.floor(Math.random() * great.length)];
        if (pct >= 50) return solid[Math.floor(Math.random() * solid.length)];
        return keepTrying[Math.floor(Math.random() * keepTrying.length)];
    }

        // ===== Collapsible TOC Menu, Back to Top, and Active Section Highlighting =====
        const toc = document.querySelector('.toc');
        const tocLinks = document.querySelectorAll('.toc a');
        const backToTopButton = document.getElementById('backToTop');
        const tocMenuButton = document.getElementById('tocMenuButton');
        let tocIsOpen = false;

        // Get all section IDs from TOC links
        const sections = Array.from(tocLinks).map(link => {
            const href = link.getAttribute('href');
            return href ? document.querySelector(href) : null;
        }).filter(section => section !== null);

        // Toggle TOC menu
        tocMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            tocIsOpen = !tocIsOpen;
            tocMenuButton.setAttribute('aria-expanded', tocIsOpen ? 'true' : 'false');
            if (tocIsOpen) {
                toc.classList.add('sticky', 'open');
                tocMenuButton.textContent = '✖️ Close';
                // move focus into TOC for keyboard users
                const firstLink = toc.querySelector('a'); if (firstLink) firstLink.focus();
            } else {
                toc.classList.remove('open');
                tocMenuButton.textContent = '📋 Menu';
                tocMenuButton.focus();
            }
        });

        // Close menu with Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && tocIsOpen) {
                toc.classList.remove('open');
                tocMenuButton.textContent = '📋 Menu';
                tocMenuButton.setAttribute('aria-expanded', 'false');
                tocIsOpen = false;
                tocMenuButton.focus();
            }
        });

        // Close TOC when clicking outside
        document.addEventListener('click', function(event) {
            if (tocIsOpen && !toc.contains(event.target) && event.target !== tocMenuButton) {
                toc.classList.remove('open');
                tocMenuButton.textContent = '📋 Menu';
                tocMenuButton.setAttribute('aria-expanded', 'false');
                tocIsOpen = false;
            }
        });

        // Simple scroll handler
        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                    // Show menu button after scrolling 200px
                    if (scrollPosition > 200) {
                        tocMenuButton.classList.add('show');
                        toc.classList.add('sticky');
                    } else {
                        if (!tocIsOpen) {
                            tocMenuButton.classList.remove('show');
                            toc.classList.remove('sticky');
                        }
                    }

                    // Show/hide back to top button
                    if (scrollPosition > 300) {
                        backToTopButton.classList.add('show');
                    } else {
                        backToTopButton.classList.remove('show');
                    }

                    // Highlight active section in TOC
                    let currentSection = '';
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop - 150;
                        const sectionBottom = sectionTop + section.offsetHeight;

                        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                            currentSection = section.getAttribute('id');
                        }
                    });

                    // Update active link
                    tocLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + currentSection) {
                            link.classList.add('active');
                        }
                    });

                    ticking = false;
                });

                ticking = true;
            }
        }, { passive: true });

        // Back to top button click
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Smooth scroll for TOC links and close menu
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 20;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });

                    // Close TOC menu after clicking a link
                    if (tocIsOpen) {
                        toc.classList.remove('open');
                        tocMenuButton.textContent = '📋 Menu';
                        tocIsOpen = false;
                    }
                }
            });
        });
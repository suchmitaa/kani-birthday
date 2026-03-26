document.addEventListener('DOMContentLoaded', () => {
    const landingScreen = document.getElementById('landing-screen');
    const surprisePage = document.getElementById('surprise-page');
    const openGiftBtn = document.getElementById('open-gift-btn');
    const bgMusic = document.getElementById('bg-music');
    const typingText = document.getElementById('typing-text');
    const replayBtn = document.getElementById('replay-btn');

    const messageLines = [
        "Hey Kaniii 🥺💖",
        "Advance Happy Birthday to my most special person :)",
        "I really hope you know how much you mean to me because you are truly something rare in my life. You’re not just a person, you’re a feeling I never want to lose.",
        "My favourite co-rider 🛵💨 I wish I could take you with me forever, through every road, every phase, every little moment.",
        "You’ve become my favourite memory in recent times. You are the kind I keep replaying in my mind with a smile.",
        "My Dhanalakshmi 💛 thank you for giving me so much love, care, and happiness… without ever expecting anything in return. That’s something I’ll always cherish.",
        "I love you, my favourite girl 💖✨"
    ];

    // Transition to main page
    openGiftBtn.addEventListener('click', () => {
        landingScreen.classList.add('hidden');
        surprisePage.classList.remove('hidden');
        bgMusic.play().catch(e => console.error("Audio playback error:", e));
        startSurprise();
    });

    function startSurprise() {
        // Start particle effects
        startParticles();
        
        // Start countdown
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Start slideshow
        startSlideshow();

        // Reveal Gallery ONLY after typing finishes
        typeMessage().then(() => {
            const gallerySection = document.querySelector('.gallery-section');
            const countdownSection = document.querySelector('.countdown-section');
            const thankYouSection = document.querySelector('.thank-you-section');
            
            // Show sections sequentially
            setTimeout(() => gallerySection.classList.add('is-visible'), 500);
            setTimeout(() => countdownSection.classList.add('is-visible'), 1500);
            setTimeout(() => thankYouSection.classList.add('is-visible'), 2500);
        });
    }


    // Typing Animation (Character by Character)
    async function typeMessage() {
        typingText.innerHTML = '';
        const typingSpeed = 50; // Milliseconds per character
        
        for (let index = 0; index < messageLines.length; index++) {
            const lineText = messageLines[index];
            const lineElement = document.createElement('span');
            lineElement.className = 'typed-line';
            if (index === 0 || index === messageLines.length - 1) {
                lineElement.classList.add('cursive');
            }
            typingText.appendChild(lineElement);
            lineElement.classList.add('show');
            
            // Type each character
            for (let charIndex = 0; charIndex < lineText.length; charIndex++) {
                lineElement.textContent += lineText[charIndex];
                await new Promise(r => setTimeout(r, typingSpeed));
            }
            
            // Delay between lines
            await new Promise(r => setTimeout(r, 1200));
        }
    }

    // Particle Effects (Floating Hearts & Sparkles)
    function startParticles() {
        const container = document.getElementById('particles-container');
        const symbols = ['💖', '✨', '🌸', '❤️', '🌟', '💕'];
        
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = Math.random() > 0.5 ? 'heart' : 'sparkle';
            particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            
            const startX = Math.random() * window.innerWidth;
            const size = Math.random() * (30 - 15) + 15;
            const duration = Math.random() * (10 - 5) + 5;
            
            particle.style.left = `${startX}px`;
            particle.style.fontSize = `${size}px`;
            particle.style.setProperty('--duration', `${duration}s`);
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }, 400);
    }

    // Slideshow Logic
    function startSlideshow() {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }

    // Countdown Timer
    function updateCountdown() {
        const targetDate = new Date("April 25, 2026 00:00:00").getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }

    // Intersection Observer for Scroll Effects
    function observeSections() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.fade-in-section').forEach(section => {
            observer.observe(section);
        });
    }

    // Replay Functionality
    replayBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        typeMessage();
    });
});

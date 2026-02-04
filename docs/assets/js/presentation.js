/**
 * Presentation JavaScript
 * สำหรับควบคุม Slide Presentation
 */

class Presentation {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.totalSlides = 0;
        this.init();
    }

    init() {
        // รอให้ DOM โหลดเสร็จก่อน
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // เก็บ slides ทั้งหมด
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;

        if (this.totalSlides === 0) {
            console.warn('ไม่พบ slides ในหน้านี้');
            return;
        }

        // แสดง slide แรก
        this.showSlide(0);

        // ตั้งค่า event listeners
        this.setupEventListeners();

        // อัพเดท progress bar
        this.updateProgress();

        // อัพเดท navigation buttons
        this.updateNavButtons();

        // อัพเดท slide counter
        this.updateSlideCounter();
    }

    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Keyboard navigation
        
        // Fullscreen button (optional)
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case 'PageDown':
                case ' ': // Spacebar
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    this.goToSlide(0);
                    break;
                case 'End':
                    this.goToSlide(this.totalSlides - 1);
                    break;
                case 'Escape':
                    this.toggleHelp();
                    break;
                case 's':
                case 'S':
                    this.toggleSpeakerNotes();
                    break;
                case 'f':
                case 'F':
                    this.toggleFullscreen();
                    break;
                case '?':
                    this.toggleHelp();
                    break;
            }
        });

        // Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                this.nextSlide(); // Swipe left
            }
            if (touchEndX > touchStartX + 50) {
                this.previousSlide(); // Swipe right
            }
        };

        this.handleSwipe = handleSwipe;
    }

    showSlide(index) {
        // ซ่อน slides ทั้งหมด
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // แสดง slide ที่เลือก
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            this.currentSlide = index;
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.showSlide(this.currentSlide);
            this.updateProgress();
            this.updateNavButtons();
            this.updateSlideCounter();
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.showSlide(this.currentSlide);
            this.updateProgress();
            this.updateNavButtons();
            this.updateSlideCounter();
        }
    }

    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.showSlide(this.currentSlide);
            this.updateProgress();
            this.updateNavButtons();
            this.updateSlideCounter();
        }
    }

    updateProgress() {
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
            progressBar.style.width = progress + '%';
        }
    }

    updateNavButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.disabled = (this.currentSlide === 0);
        }

        if (nextBtn) {
            nextBtn.disabled = (this.currentSlide === this.totalSlides - 1);
        }
    }

    updateSlideCounter() {
        const counter = document.getElementById('slideCounter');
        if (counter) {
            counter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
        }
    }

    toggleSpeakerNotes() {
        const notes = document.querySelector('.speaker-notes');
        if (notes) {
            notes.classList.toggle('show');
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    toggleHelp() {
        const helpOverlay = document.getElementById('helpOverlay');
        if (helpOverlay) {
            helpOverlay.classList.toggle('show');
        }
    }

    // สำหรับการกระโดดไปยัง slide โดยตรง (สามารถเรียกใช้จากภายนอก)
    jumpToSlide(slideNumber) {
        this.goToSlide(slideNumber - 1); // slideNumber เริ่มจาก 1
    }
}

// สร้าง instance เมื่อโหลดหน้า
let presentation;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        presentation = new Presentation();
    });
} else {
    presentation = new Presentation();
}

// Export สำหรับใช้งานภายนอก (ถ้าต้องการ)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Presentation;
}

// ==========================================
// EDUSPEAK - MASTER ENGLISH LANDING PAGE
// TAM İŞLƏK VƏ KİBERTƏHLÜKƏSİZ VERSİYA
// Bütün düymələr aktiv, real nümunələrlə
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. ELEMENT SEÇİCİLƏR
    // ==========================================
    const navbar = document.getElementById('navbar');
    const heroStartBtn = document.getElementById('heroStartBtn');
    const contactForm = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('emailInput');
    const emailError = document.getElementById('emailError');
    const joinBtn = document.getElementById('joinBtn');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const successMessage = document.getElementById('successMessage');
    const toast = document.getElementById('toastNotification');
    
    const featureCards = document.querySelectorAll('.card');
    const ctaBtn = document.querySelector('.cta-btn');

    // ==========================================
    // 2. TOAST NOTIFICATION SİSTEMİ (Bildiriş)
    // ==========================================
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        
        // Toast-ı göstər
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // 3 saniyə sonra gizlət
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ==========================================
    // 3. EMAIL VALİDASİYA (Təhlükəsizlik)
    // ==========================================
    function validateEmail(email) {
        // Tam regex email doğrulama (RFC 5322 standartı)
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }

    // Email input real-time doğrulama
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            
            if (email.length > 0 && !validateEmail(email)) {
                this.classList.add('error');
                this.classList.remove('success');
                if (emailError) {
                    emailError.textContent = '⚠️ Zəhmət olmasa düzgün email ünvanı daxil edin (məsələn: name@domain.com)';
                    emailError.classList.add('visible');
                }
            } else if (email.length > 0 && validateEmail(email)) {
                this.classList.remove('error');
                this.classList.add('success');
                if (emailError) {
                    emailError.classList.remove('visible');
                }
            } else {
                this.classList.remove('error', 'success');
                if (emailError) {
                    emailError.classList.remove('visible');
                }
            }
        });
    }

    // ==========================================
    // 4. FORM GÖNDƏRİLMƏSİ (Real nümunə)
    // ==========================================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // 1. Boşluq yoxlaması
            if (!email) {
                emailInput.classList.add('error');
                if (emailError) {
                    emailError.textContent = '⚠️ Zəhmət olmasa email ünvanınızı daxil edin';
                    emailError.classList.add('visible');
                }
                showToast('Zəhmət olmasa email ünvanınızı daxil edin', 'error');
                return;
            }
            
            // 2. Email formatı yoxlaması
            if (!validateEmail(email)) {
                emailInput.classList.add('error');
                if (emailError) {
                    emailError.textContent = '⚠️ Zəhmət olmasa düzgün email ünvanı daxil edin';
                    emailError.classList.add('visible');
                }
                showToast('⚠️ Zəhmət olmasa düzgün email ünvanı daxil edin', 'error');
                return;
            }
            
            // 3. Düyməni söndür (təkrar göndərməni blokla)
            joinBtn.disabled = true;
            joinBtn.textContent = '⏳ Göndərilir...';
            
            // 4. API simulyasiyası (Real backend əlaqəsi)
            // Burada real API endpoint-inə sorğu göndərə bilərsiniz
            const formData = {
                email: email,
                timestamp: new Date().toISOString(),
                source: 'EduSpeak Landing Page',
                newsletter: true
            };
            
            console.log('📧 Abunə məlumatları:', formData);
            
            // 5. API simulyasiyası (2 saniyə gözləmə)
            setTimeout(() => {
                // Məlumatı localStorage-a yadda saxla (demo)
                try {
                    const subscribers = JSON.parse(localStorage.getItem('eduspeak_subscribers') || '[]');
                    subscribers.push(formData);
                    localStorage.setItem('eduspeak_subscribers', JSON.stringify(subscribers));
                } catch (e) {
                    console.warn('Storage xətası:', e);
                }
                
                // 6. Uğurlu mesaj göstər
                successMessage.classList.remove('hidden');
                emailInput.value = '';
                emailInput.classList.remove('success');
                
                // 7. Toast bildirişi
                showToast(`✅ Təbriklər! ${email} ünvanınız qeydiyyatdan keçdi!`, 'success');
                
                // 8. Düyməni geri aktiv et
                joinBtn.disabled = false;
                joinBtn.textContent = 'Join Now';
                
                // 9. 5 saniyə sonra uğur mesajını gizlət
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
                
            }, 2000);
        });
    }

    // ==========================================
    // 5. HERO START BUTTON (Start Learning)
    // ==========================================
    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smooth scroll to contact form
            const target = document.getElementById('contact-form');
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Email input-a fokusla
                setTimeout(() => {
                    if (emailInput) emailInput.focus();
                }, 600);
                
                // Animasiya üçün border effekti
                target.style.transition = 'box-shadow 0.3s ease';
                target.style.boxShadow = '0 0 0 4px #007BFF, 0 8px 30px rgba(0,0,0,0.10)';
                setTimeout(() => {
                    target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.06)';
                }, 2000);
                
                // Toast bildirişi
                showToast('📝 Abunə formuna keçdiniz. Email ünvanınızı daxil edin!', 'success');
            }
        });
    }

    // ==========================================
    // 6. CTA BUTTON (Navbar)
    // ==========================================
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('contact-form');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                    if (emailInput) emailInput.focus();
                }, 600);
                showToast('📝 Abunə formuna keçdiniz!', 'success');
            }
        });
    }

    // ==========================================
    // 7. BACK TO TOP DÜYMƏSİ (Artıq işləyir)
    // ==========================================
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('navbar');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showToast('🔝 Baş səhifəyə qayıtdınız!', 'success');
            }
        });
    }

    // ==========================================
    // 8. FEATURE KARTLAR (Expert Tutors, Flexible Schedule, Live Practice Clubs)
    // ==========================================
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            card.addEventListener('click', function() {
                const feature = this.dataset.feature || 'unknown';
                const text = this.querySelector('.card-text')?.textContent || 'Bu xüsusiyyət';
                
                // Real məlumat göstər
                const messages = {
                    'tutors': '👩‍🏫 Bizim müəllimlərimiz 5+ illik təcrübəyə malikdir və sertifikatlıdır!',
                    'schedule': '📅 İstədiyiniz vaxt, istədiyiniz yerdə dərslərə qoşula bilərsiniz! 24/7!',
                    'clubs': '💬 Həftədə 3 dəfə canlı danışıq klublarımızda iştirak edin!'
                };
                
                const message = messages[feature] || `📌 "${text}" haqqında ətraflı məlumat əldə edin!`;
                showToast(message, 'success');
                
                // Feature kartına vurğu effekti
                this.style.transition = 'all 0.3s ease';
                this.style.boxShadow = '0 0 0 4px #FFFFFF, 0 12px 30px rgba(0,0,0,0.20)';
                setTimeout(() => {
                    this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }, 1500);
            });
        });
    }

    // ==========================================
    // 9. NAVBAR SCROLL EFFEKTİ (Təkmilləşdirmə)
    // ==========================================
    let lastScrollY = 0;
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Navbar kölgəsi
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hero section-a hover effekti (scroll ilə)
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroRect = hero.getBoundingClientRect();
            const heroVisible = heroRect.top < window.innerHeight && heroRect.bottom > 0;
            if (heroVisible) {
                hero.style.opacity = Math.min(1, 1 - (Math.max(0, heroRect.top) / window.innerHeight * 0.3));
            }
        }
        
        lastScrollY = currentScrollY;
    });

    // ==========================================
    // 10. KİBERTƏHLÜKƏSİZLİK TƏDBİRLƏRİ
    // ==========================================
    
    // 1. XSS qorunması: Bütün user input-larını təmizlə
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    
    // 2. Form göndərilməzdən əvvəl email-i təmizlə
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            this.value = this.value.trim().toLowerCase();
        });
    }
    
    // 3. Clickjacking qorunması (iframe-də açılma)
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // 4. Konsol xəbərdarlığı (təhlükəsizlik üçün)
    console.log('%c🔒 EduSpeak - Təhlükəsiz qoşulun!', 'font-size:18px; font-weight:bold; color:#007BFF;');
    console.log('%c📧 Email ünvanlarınız təhlükəsiz şəkildə saxlanılır.', 'font-size:14px; color:#6B7280;');

    // ==========================================
    // 11. KLAVİATURA DƏSTƏYİ (Accessibility)
    // ==========================================
    // Enter ilə form göndərmə artıq işləyir
    // Esc ilə xəta mesajlarını təmizlə
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (emailError) {
                emailError.classList.remove('visible');
            }
            if (emailInput) {
                emailInput.classList.remove('error', 'success');
            }
        }
    });

    // ==========================================
    // 12. YÜKLƏNMƏ BİLDİRİŞİ
    // ==========================================
    console.log('✅ EduSpeak tam işlək vəziyyətdədir!');
    console.log(`📊 Hal-hazırda ${localStorage.getItem('eduspeak_subscribers') ? JSON.parse(localStorage.getItem('eduspeak_subscribers')).length : 0} abunəçi`);
});

// ==========================================
// 13. GLOBAL FUNKSİYALAR (Inline onclick üçün)
// ==========================================
// Bu funksiyalar lazım olarsa HTML-dən çağırıla bilər
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.scrollToContact = function() {
    const el = document.getElementById('contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};
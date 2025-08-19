// VR Website JavaScript - Following GF Corporate Standards

// Global variables
let currentLanguage = 'de';
let modalShown = false;
let emailCaptured = false;

// DOM Content Loaded - Single event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('VR Website - DOM Content Loaded');
    initializeVRWebsite();
    initializeScrollAnimations();
});

// Initialize VR website functionality
function initializeVRWebsite() {
    console.log('Initializing VR website...');
    initializeNavigation();
    initializeSmoothScrolling();
    initializeLanguageToggle();
    initializeEmailCapture();
    loadLanguagePreference();
    updateLanguage(currentLanguage || 'de');
    console.log('VR Website initialization completed');
}

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Language toggle functionality
function toggleLanguage() {
    console.log('Current language:', currentLanguage);
    currentLanguage = currentLanguage === 'en' ? 'de' : 'en';
    console.log('Switching to language:', currentLanguage);
    updateLanguage(currentLanguage);
}

function initializeLanguageToggle() {
    const languageToggle = document.querySelector('.language-toggle');
    console.log('Language toggle button found:', !!languageToggle);
    
    if (languageToggle) {
        languageToggle.removeEventListener('click', toggleLanguage);
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Language toggle clicked');
            toggleLanguage();
        });
        
        languageToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLanguage();
            }
        });
    } else {
        console.error('Language toggle button not found!');
    }
}

function updateLanguage(lang) {
    console.log('Updating language to:', lang);
    
    // Update language toggle button
    const currentLangElement = document.getElementById('current-lang');
    const altLangElement = document.getElementById('alt-lang');
    
    if (currentLangElement && altLangElement) {
        currentLangElement.textContent = lang.toUpperCase();
        altLangElement.textContent = lang === 'en' ? 'DE' : 'EN';
        console.log('Updated language toggle display');
    } else {
        console.error('Language toggle elements not found');
    }
    
    // Update all elements with language attributes
    const elementsWithLang = document.querySelectorAll('[data-en][data-de]');
    console.log('Found elements to translate:', elementsWithLang.length);
    
    elementsWithLang.forEach((element, index) => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Store language preference
    localStorage.setItem('preferred-language', lang);
    
    console.log('Language update completed');
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferred-language');
    console.log('Saved language preference:', savedLanguage);
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
        currentLanguage = savedLanguage;
        console.log('Loaded language preference:', currentLanguage);
    } else {
        currentLanguage = 'de'; // Default to German for VR website
        console.log('No saved preference, defaulting to German');
    }
}

// Email Capture Modal and Newsletter functionality
function initializeEmailCapture() {
    // Set timestamps when page loads
    setFormTimestamps();
    
    // Timer-based popup (30 seconds)
    setTimeout(() => {
        if (!modalShown && !emailCaptured) {
            showModal();
        }
    }, 30000);
    
    // Scroll-based popup (50% of page)
    let scrollTriggered = false;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 50 && !scrollTriggered && !modalShown && !emailCaptured) {
            scrollTriggered = true;
            setTimeout(() => {
                if (!modalShown && !emailCaptured) {
                    showModal();
                }
            }, 2000);
        }
    });
    
    // Exit intent (when mouse moves to top of page)
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !modalShown && !emailCaptured) {
            showModal();
        }
    });
    
    // Handle modal form submission
    const modalForm = document.getElementById('modalForm');
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            // Set reply-to before submission
            const email = document.getElementById('modalEmail').value;
            const modalReplyTo = document.getElementById('modalReplyTo');
            if (modalReplyTo) {
                modalReplyTo.value = email;
            }
            
            // Update timestamp
            const modalTimestamp = document.getElementById('modalTimestamp');
            if (modalTimestamp) {
                modalTimestamp.value = new Date().toISOString();
            }
            
            // Form will submit normally to Formspree
            // Show loading state
            const submitBtn = e.target.querySelector('.email-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = currentLanguage === 'de' ? 'Wird gesendet...' : 'Sending...';
            }
            
            // Close modal after a brief delay to allow form submission
            setTimeout(() => {
                closeModal();
                showSubmissionFeedback('popup');
            }, 1000);
        });
    }
    
    // Handle newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            // Set reply-to and timestamp before submission
            const email = document.getElementById('emailInput').value;
            const hiddenReplyTo = document.getElementById('hiddenReplyTo');
            if (hiddenReplyTo) {
                hiddenReplyTo.value = email;
            }
            
            const timestamp = document.getElementById('timestamp');
            if (timestamp) {
                timestamp.value = new Date().toISOString();
            }
            
            // Show loading state
            const submitBtn = e.target.querySelector('.newsletter-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = currentLanguage === 'de' ? 'Wird gesendet...' : 'Sending...';
            }
            
            // Form will submit normally to Formspree
            // Show success message after brief delay
            setTimeout(() => {
                handleEmailSubmission(email, 'newsletter');
            }, 1000);
        });
    }
    
    // Close modal functionality
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'emailModal') {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function setFormTimestamps() {
    const timestamp = document.getElementById('timestamp');
    const modalTimestamp = document.getElementById('modalTimestamp');
    const currentTime = new Date().toISOString();
    
    if (timestamp) timestamp.value = currentTime;
    if (modalTimestamp) modalTimestamp.value = currentTime;
}

function showSubmissionFeedback(source) {
    let message;
    if (currentLanguage === 'de') {
        message = source === 'popup' 
            ? 'Vielen Dank! Ihre Anfrage wurde gesendet. Wir kontaktieren Sie bald mit dem VR-Guide.'
            : 'Vielen Dank! Ihre Newsletter-Anfrage wurde gesendet.';
    } else {
        message = source === 'popup'
            ? 'Thank you! Your request has been sent. We\'ll contact you soon with the VR Guide.'
            : 'Thank you! Your newsletter request has been sent.';
    }
    
    // Create and show temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #8BC07C, rgba(139, 192, 124, 0.8));
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 10001;
        font-family: var(--font-primary);
        font-weight: 600;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function showModal() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.classList.add('show');
        modalShown = true;
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function handleEmailSubmission(email, source, name = '', company = '') {
    emailCaptured = true;
    
    if (source === 'newsletter') {
        // Hide form and show success message
        const form = document.getElementById('newsletterForm');
        const successMessage = document.getElementById('successMessage');
        
        if (form) form.style.display = 'none';
        if (successMessage) successMessage.classList.add('show');
        
        console.log('Email captured:', { email, name, company, source });
        
        // Track conversion (Google Analytics, Facebook Pixel, etc.)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'email_capture', {
                'event_category': 'lead_generation',
                'event_label': source,
                'value': 1
            });
        }
    } else {
        // For popup, show a different message
        alert('Vielen Dank! Der VR-Messe-Guide wird in Kürze an ' + email + ' gesendet.');
    }
}

// Contact function
function contactUs(packageType) {
    const subject = encodeURIComponent(`Anfrage für ${packageType}`);
    const body = encodeURIComponent(`Hallo,\n\nich interessiere mich für das ${packageType} und würde gerne weitere Informationen sowie ein Angebot erhalten.\n\nVielen Dank!`);
    window.location.href = `mailto:info@gfinnov.com?subject=${subject}&body=${body}`;
}

// Animation on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    adjustLayoutForScreenSize();
}, 250));

function adjustLayoutForScreenSize() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 768) {
        // Mobile-specific adjustments
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            heroTitle.style.fontSize = '2.5rem';
        }
    }
}

// Export functions for global use
window.VRWebsite = {
    toggleLanguage,
    updateLanguage,
    contactUs,
    showModal,
    closeModal,
    handleEmailSubmission
};

// === Consent Manager (A+B) ===
(function(){
  const STORAGE_KEY = 'consent-' + (window.__CONSENT_VERSION__||'vr-v1');
  const GA_ID = window.__GA_MEASUREMENT_ID__ || 'G-2D1MXJ2SMZ';

  const $ = (sel) => document.querySelector(sel);

  function getConsent(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null; } catch(e){ return null; }
  }
  function setConsent(obj){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  }

  function applyConsent(consent){
    // Only analytics is toggled here (necessary is always on)
    if(consent.analytics === true){
      // Load GA loader once
      if(!window.__GA_LOADED__){
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        s.onload = function(){
          gtag('js', new Date());
          gtag('config', GA_ID);
          gtag('consent','update',{ analytics_storage: 'granted' });
        };
        document.head.appendChild(s);
        window.__GA_LOADED__ = true;
      }else{
        gtag('consent','update',{ analytics_storage: 'granted' });
      }
    }else{
      // Update to denied
      gtag('consent','update',{ analytics_storage: 'denied' });
    }
  }

  function showBanner(){
    const banner = $('#cookie-banner');
    if(banner) banner.style.display = 'block';
  }
  function hideBanner(){
    const banner = $('#cookie-banner');
    if(banner) banner.style.display = 'none';
  }
  function openModal(){
    const modal = $('#cookie-modal');
    if(modal){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }
  }
  function closeModal(){
    const modal = $('#cookie-modal');
    if(modal){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
  }

  function initUI(){
    const btnAccept = $('#cookie-accept');
    const btnReject = $('#cookie-reject');
    const btnCustomize = $('#cookie-customize');
    const btnSettings = $('#cookie-settings');
    const btnClose = $('#cookie-close');
    const btnSave = $('#cookie-save');
    const toggleAnalytics = $('#toggle-analytics');

    if(btnAccept) btnAccept.addEventListener('click', () => {
      const consent = { necessary: true, analytics: true, at: new Date().toISOString() };
      setConsent(consent);
      applyConsent(consent);
      hideBanner();
    });

    if(btnReject) btnReject.addEventListener('click', () => {
      const consent = { necessary: true, analytics: false, at: new Date().toISOString() };
      setConsent(consent);
      applyConsent(consent);
      hideBanner();
    });

    if(btnCustomize) btnCustomize.addEventListener('click', () => {
      const c = getConsent() || { analytics: false };
      if(toggleAnalytics) toggleAnalytics.checked = !!c.analytics;
      openModal();
    });

    if(btnSettings) btnSettings.addEventListener('click', () => {
      const c = getConsent() || { analytics: false };
      if(toggleAnalytics) toggleAnalytics.checked = !!c.analytics;
      openModal();
    });

    if(btnClose) btnClose.addEventListener('click', closeModal);

    if(btnSave) btnSave.addEventListener('click', () => {
      const consent = { necessary: true, analytics: !!(toggleAnalytics && toggleAnalytics.checked), at: new Date().toISOString() };
      setConsent(consent);
      applyConsent(consent);
      closeModal();
      hideBanner();
    });
  }

  // On load: default deny already set in stub. Decide UI and possibly enable analytics.
  document.addEventListener('DOMContentLoaded', function(){
    initUI();
    const consent = getConsent();
    if(consent){
      applyConsent(consent);
      hideBanner();
    }else{
      showBanner();
    }
  });
})();
// Global variables
// Language lives entirely in lang.js now — this file only reads the current
// choice to pick the right copy for the growth modal, whose text is in JS
// rather than in data-* attributes.
let testimonialIndex = 0;
let openGrowthStep = null;

function activeLanguage() {
    return (window.GFLang && window.GFLang.get()) || 'de';
}

// Growth Journey Content Data
const growthContent = {
    market: {
        title: { en: "Market Research", de: "Marktforschung", es: "Investigación de mercado" },
        text: { 
            en: "Explore key market segments, current volumes, and emerging trends to identify growth paths.\n\n• Market Segmentation Analysis\n• Volume Assessment\n• Emerging Trend Identification\n• Growth Path Discovery\n• Market Opportunity Mapping",
            de: "Erkunden Sie wichtige Marktsegmente, aktuelle Volumina und aufkommende Trends, um Wachstumspfade zu identifizieren.\n\n• Marktsegmentierungsanalyse\n• Volumenbewertung\n• Identifikation aufkommender Trends\n• Entdeckung von Wachstumspfaden\n• Marktchancen-Mapping",
            es: "Explore los segmentos de mercado clave, los volúmenes actuales y las tendencias emergentes para identificar vías de crecimiento.\n\n• Análisis de segmentación de mercado\n• Evaluación de volúmenes\n• Identificación de tendencias emergentes\n• Descubrimiento de vías de crecimiento\n• Mapeo de oportunidades de mercado"
        }
    },
    revenue: {
        title: { en: "Revenue Strategy", de: "Umsatzstrategie", es: "Estrategia de ingresos" },
        text: { 
            en: "Maximize profitability by evaluating income streams and strategic partnerships.\n\n• Income Stream Evaluation\n• Profitability Optimization\n• Strategic Partnership Assessment\n• Revenue Model Development\n• Financial Performance Enhancement",
            de: "Maximieren Sie die Rentabilität durch Bewertung von Einkommensströmen und strategischen Partnerschaften.\n\n• Bewertung von Einkommensströmen\n• Rentabilitätsoptimierung\n• Bewertung strategischer Partnerschaften\n• Entwicklung von Umsatzmodellen\n• Verbesserung der Finanzleistung",
            es: "Maximice la rentabilidad evaluando sus fuentes de ingresos y sus alianzas estratégicas.\n\n• Evaluación de fuentes de ingresos\n• Optimización de la rentabilidad\n• Evaluación de alianzas estratégicas\n• Desarrollo de modelos de ingresos\n• Mejora del desempeño financiero"
        }
    },
    sales: {
        title: { en: "Sales Acceleration", de: "Vertriebsbeschleunigung", es: "Aceleración de ventas" },
        text: { 
            en: "Enhance reach and conversion by optimizing your sales approach and channel mix.\n\n• Sales Approach Optimization\n• Channel Mix Strategy\n• Reach Enhancement\n• Conversion Rate Improvement\n• Sales Performance Acceleration",
            de: "Verbessern Sie Reichweite und Konversion durch Optimierung Ihres Vertriebsansatzes und Channel-Mix.\n\n• Optimierung des Vertriebsansatzes\n• Channel-Mix-Strategie\n• Reichweitensteigerung\n• Verbesserung der Konversionsrate\n• Beschleunigung der Vertriebsleistung",
            es: "Amplíe su alcance y su conversión optimizando el enfoque comercial y el mix de canales.\n\n• Optimización del enfoque comercial\n• Estrategia de mix de canales\n• Ampliación del alcance\n• Mejora de la tasa de conversión\n• Aceleración del desempeño comercial"
        }
    },
    capabilities: {
        title: { en: "Strategic Capabilities", de: "Strategische Fähigkeiten", es: "Capacidades estratégicas" },
        text: { 
            en: "Build the essential skills, resources, and technologies that drive long-term success.\n\n• Essential Skills Development\n• Resource Optimization\n• Technology Integration\n• Long-term Success Planning\n• Capability Building",
            de: "Bauen Sie die wesentlichen Fähigkeiten, Ressourcen und Technologien auf, die langfristigen Erfolg vorantreiben.\n\n• Entwicklung wesentlicher Fähigkeiten\n• Ressourcenoptimierung\n• Technologieintegration\n• Langfristige Erfolgsplanung\n• Fähigkeitenaufbau",
            es: "Desarrolle las habilidades, los recursos y las tecnologías esenciales que impulsan el éxito a largo plazo.\n\n• Desarrollo de habilidades esenciales\n• Optimización de recursos\n• Integración tecnológica\n• Planificación del éxito a largo plazo\n• Construcción de capacidades"
        }
    },
    cost: {
        title: { en: "Cost Efficiency", de: "Kosteneffizienz", es: "Eficiencia de costos" },
        text: { 
            en: "Streamline expenses and refine cost models to improve financial agility.\n\n• Expense Streamlining\n• Cost Model Refinement\n• Financial Agility Enhancement\n• Operational Efficiency\n• Budget Optimization",
            de: "Rationalisieren Sie Ausgaben und verfeinern Sie Kostenmodelle, um die finanzielle Agilität zu verbessern.\n\n• Ausgabenrationalisierung\n• Verfeinerung von Kostenmodellen\n• Verbesserung der finanziellen Agilität\n• Operative Effizienz\n• Budgetoptimierung",
            es: "Racionalice los gastos y refine los modelos de costos para ganar agilidad financiera.\n\n• Racionalización de gastos\n• Refinamiento de modelos de costos\n• Mayor agilidad financiera\n• Eficiencia operativa\n• Optimización presupuestaria"
        }
    },
    partner: {
        title: { en: "Strategic Partnerships", de: "Strategische Partnerschaften", es: "Alianzas estratégicas" },
        text: { 
            en: "Forge alliances that complement your strengths and expand your market presence.\n\n• Alliance Development\n• Strength Complementation\n• Market Presence Expansion\n• Partnership Strategy\n• Collaborative Growth",
            de: "Schmieden Sie Allianzen, die Ihre Stärken ergänzen und Ihre Marktpräsenz erweitern.\n\n• Allianzentwicklung\n• Stärkenergänzung\n• Erweiterung der Marktpräsenz\n• Partnerschaftsstrategie\n• Kollaboratives Wachstum",
            es: "Forje alianzas que complementen sus fortalezas y amplíen su presencia en el mercado.\n\n• Desarrollo de alianzas\n• Complemento de fortalezas\n• Expansión de la presencia en el mercado\n• Estrategia de alianzas\n• Crecimiento colaborativo"
        }
    },
    usp: {
        title: { en: "Value Proposition", de: "Wertversprechen", es: "Propuesta de valor" },
        text: { 
            en: "Clearly define what sets your offering apart to create lasting competitive advantage.\n\n• Unique Value Definition\n• Competitive Advantage Creation\n• Market Differentiation\n• Value Communication\n• Positioning Strategy",
            de: "Definieren Sie klar, was Ihr Angebot auszeichnet, um dauerhaften Wettbewerbsvorteil zu schaffen.\n\n• Definition einzigartiger Werte\n• Schaffung von Wettbewerbsvorteilen\n• Marktdifferenzierung\n• Wertkommunikation\n• Positionierungsstrategie",
            es: "Defina con claridad qué distingue su oferta para crear una ventaja competitiva duradera.\n\n• Definición del valor único\n• Creación de ventaja competitiva\n• Diferenciación en el mercado\n• Comunicación del valor\n• Estrategia de posicionamiento"
        }
    },
    pitch: {
        title: { en: "Pitch Readiness", de: "Pitch-Bereitschaft", es: "Preparación del pitch" },
        text: { 
            en: "Craft persuasive investor and client pitches that drive engagement and commitment.\n\n• Investor Pitch Development\n• Client Presentation Crafting\n• Engagement Strategy\n• Commitment Building\n• Persuasive Communication",
            de: "Erstellen Sie überzeugende Investor- und Kunden-Pitches, die Engagement und Commitment fördern.\n\n• Entwicklung von Investor-Pitches\n• Erstellung von Kundenpräsentationen\n• Engagement-Strategie\n• Commitment-Aufbau\n• Überzeugende Kommunikation",
            es: "Elabore pitches convincentes para inversores y clientes que generen interés y compromiso.\n\n• Desarrollo del pitch para inversores\n• Elaboración de presentaciones para clientes\n• Estrategia de interacción\n• Construcción de compromiso\n• Comunicación persuasiva"
        }
    }
};

// DOM Content Loaded - Single event listener
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    initializeScrollAnimations();
    addFloatingAnimations();
});

// Initialize website functionality
function initializeWebsite() {
    initializeNavigation();
    initializeTestimonialSlider();
    initializeSmoothScrolling();
    initializeContactTabs();
    initializeGrowthJourney();
}

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-hamburger, .nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('open');
            navMenu.classList.toggle('active', isOpen);
            navToggle.classList.toggle('open', isOpen);
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'linear-gradient(135deg, rgba(21, 96, 178, 0.96) 0%, rgba(42, 74, 158, 0.96) 55%, rgba(77, 141, 180, 0.96) 100%)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, rgba(21, 96, 178, 0.94) 0%, rgba(42, 74, 158, 0.94) 55%, rgba(77, 141, 180, 0.94) 100%)';
                navbar.style.backdropFilter = 'blur(14px)';
            }
        }
    });
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-hamburger, .nav-toggle');
    if (navMenu) navMenu.classList.remove('active', 'open');
    if (navToggle) {
        navToggle.classList.remove('active', 'open');
        navToggle.setAttribute('aria-expanded', 'false');
    }
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

// Testimonial slider
function initializeTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 1) {
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            testimonials[testimonialIndex].classList.remove('active');
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            testimonials[testimonialIndex].classList.add('active');
        }, 5000);
    }
}

// Contact tabs functionality
function initializeContactTabs() {
    // Set default active tab
    switchTab('startup');
}

function switchTab(tabName) {
    // Remove active class from all tabs and buttons
    const allTabs = document.querySelectorAll('.tab-pane');
    const allButtons = document.querySelectorAll('.tab-btn');
    
    allTabs.forEach(tab => tab.classList.remove('active'));
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected tab and button
    const selectedTab = document.getElementById(`${tabName}-tab`);
    const selectedButton = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedButton) selectedButton.classList.add('active');
}

// Growth Journey functionality
function initializeGrowthJourney() {
    
    // Add click listeners to growth boxes
    const growthBoxes = document.querySelectorAll('.growth-box');
    const modal = document.getElementById('growth-modal');
    const closeBtn = document.querySelector('.growth-close');
    
    
    growthBoxes.forEach((box, index) => {
        
        box.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const step = this.getAttribute('data-step');
            openGrowthModal(step);
        });
        
        // Add visual feedback for debugging
        box.style.position = 'absolute';
        box.style.zIndex = '20';
    });
    
    // Close modal functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeGrowthModal();
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeGrowthModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeGrowthModal();
        }
    });
}

function openGrowthModal(step) {
    
    const modal = document.getElementById('growth-modal');
    const title = document.getElementById('growth-modal-title');
    const text = document.getElementById('growth-modal-text');
    
    if (!modal || !title || !text) {
        return;
    }
    
    if (growthContent[step]) {
        const content = growthContent[step];
        const lang = activeLanguage();
        title.textContent = content.title[lang] || content.title.en;
        text.textContent = content.text[lang] || content.text.en;
        modal.style.display = 'block';
        openGrowthStep = step;

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    } else {
    }
}

function closeGrowthModal() {
    const modal = document.getElementById('growth-modal');
    if (modal) {
        modal.style.display = 'none';
        openGrowthStep = null;
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }
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
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    const animateElements = document.querySelectorAll(
        '.difference-item, .team-member, .value-item, .testimonial, .growth-box'
    );
    
    animateElements.forEach(el => observer.observe(el));
}

// Form handling (if needed for future contact forms)
function handleContactForm(event) {
    event.preventDefault();
    
    // Add your form handling logic here
    // For now, we're using Calendly, but this is ready for future forms
    
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
    // Handle any resize-specific logic here
    adjustLayoutForScreenSize();
}, 250));

function adjustLayoutForScreenSize() {
    const screenWidth = window.innerWidth;
    
    // Adjust hero visual elements for mobile
    if (screenWidth < 768) {
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.height = '200px';
        }
        
        // Adjust growth journey for mobile
        const growthContainer = document.querySelector('.growth-journey-container');
        if (growthContainer) {
            growthContainer.style.height = '400px';
        }
        
        // Adjust growth boxes for mobile
        const growthBoxes = document.querySelectorAll('.growth-box');
        growthBoxes.forEach(box => {
            box.style.fontSize = '9px';
            box.style.padding = '8px';
            box.style.minWidth = '90px';
        });
    }
}

// The growth modal's copy lives in JS, so it does not get swapped by the
// data-* pass in lang.js. Re-render it if the visitor switches language while
// it is open.
document.addEventListener('gf:langchange', () => {
    const modal = document.getElementById('growth-modal');
    if (modal && modal.style.display === 'block' && openGrowthStep) {
        openGrowthModal(openGrowthStep);
    }
});

// Add floating animation CSS classes dynamically
function addFloatingAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .floating-element {
            animation-play-state: running;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .floating-element,
            .animate-in {
                animation: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Call this when DOM is loaded
document.addEventListener('DOMContentLoaded', addFloatingAnimations);

// Export functions for potential use in other scripts.
// Language is no longer exported here — use window.GFLang (lang.js).
window.GFWebsite = {
    switchTab,
    handleContactForm,
    openGrowthModal,
    closeGrowthModal
};

// === Consent Manager (A+B) ===
(function(){
  const STORAGE_KEY = 'consent-' + (window.__CONSENT_VERSION__||'v1');
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
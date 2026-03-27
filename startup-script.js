// Global variables
let currentLanguage = 'en';

// Startup-focused Growth Journey Content
const growthContent = {
    'startup-clarity': {
        title: { 
            en: "1. Startup Clarity – Building on solid foundation", 
            de: "1. Startup Klarheit – Aufbau auf solidem Fundament" 
        },
        text: { 
            en: "For early-stage startups looking to validate their idea and understand the playing field.\n\nKey Areas:\n• Market insights: Identify the right segment, assess the opportunity, and spot emerging trends\n• Competitive landscape: Understand your competitors and carve out your unique space\n• Value proposition: Get crystal clear on what makes you irresistible to your target customers\n• Strategic positioning: Position your startup for maximum market impact\n\nWhy it matters: Without clarity, even the best ideas struggle. This package helps you validate your vision, position smartly, and prepare for fast, confident execution.",
            de: "Für Start-ups in der Frühphase, die ihre Idee validieren und das Umfeld verstehen möchten.\n\nKernbereiche:\n• Marktanalysen: Erkennen Sie das richtige Segment, schätzen Sie die Chancen ein und entdecken Sie aufkommende Trends\n• Wettbewerbslandschaft: Verstehen Sie Ihre Konkurrenten und positionieren Sie sich einzigartig\n• Wertangebot: Erkennen Sie klar, was Sie für Ihre Zielkunden unwiderstehlich macht\n• Strategische Positionierung: Positionieren Sie Ihr Start-up für maximale Marktauswirkung\n\nWarum es wichtig ist: Ohne Klarheit können auch die besten Ideen scheitern. Dieses Paket hilft Ihnen, Ihre Vision zu validieren, sich smart zu positionieren und sich auf eine schnelle, selbstbewusste Umsetzung vorzubereiten."
        }
    },
    'revenue-engine': {
        title: { 
            en: "2. Revenue Engine – Get your business model running", 
            de: "2. Umsatzmotor – Ihr Geschäftsmodell in Gang bringen" 
        },
        text: { 
            en: "For startups ready to turn traction into money.\n\nKey Areas:\n• Revenue strategy: Define scalable income streams and unlock smart monetization paths\n• Strategic partnerships: Discover who can open doors and fuel your growth\n• Business model optimization: Validate and refine your path to profitability\n• Market fit assessment: Ensure your product meets real market demand\n\nWhy it matters: A great idea is only half the journey. This package helps you make money faster – with the right partners and a revenue model that works.",
            de: "Für Start-ups, die bereit sind, aus der Traktion Geld zu machen.\n\nKernbereiche:\n• Umsatzstrategie: Definieren Sie skalierbare Einkommensströme und erschließen Sie intelligente Monetarisierungspfade\n• Strategische Partnerschaften: Finden Sie heraus, wer Türen öffnen und Ihr Wachstum beflügeln kann\n• Geschäftsmodell-Optimierung: Validieren und verfeinern Sie Ihren Weg zur Profitabilität\n• Marktfit-Bewertung: Stellen Sie sicher, dass Ihr Produkt echte Marktnachfrage erfüllt\n\nWarum es wichtig ist: Eine großartige Idee ist nur die halbe Miete. Dieses Paket hilft Ihnen, schneller Geld zu verdienen – mit den richtigen Partnern und einem funktionierenden Geschäftsmodell."
        }
    },
    'sales-boost': {
        title: { 
            en: "3. Sales Boost – Turn interest into income", 
            de: "3. Verkaufs-Schub – Interesse in Einkommen umwandeln" 
        },
        text: { 
            en: "For growing startups ready to scale customer acquisition.\n\nKey Areas:\n• Sales acceleration: Optimize your channels and sharpen your pitch-to-close journey\n• Pitch readiness: Build a compelling deck and message that resonates with investors and customers alike\n• Customer acquisition: Develop systematic approaches to finding and converting prospects\n• Sales process optimization: Streamline your sales funnel for maximum efficiency\n\nWhy it matters: You have attention – now convert it. This package gives you the tools and confidence to sell, close, and grow.",
            de: "Für wachsende Start-ups, die bereit sind, ihre Kundenakquise zu skalieren.\n\nKernbereiche:\n• Verkaufsbeschleunigung: Optimieren Sie Ihre Kanäle und verfeinern Sie Ihre Verkaufspräsentation\n• Überzeugende Ansprache: Erstellen Sie ein überzeugendes Pitch-Deck und eine Botschaft, die bei Investoren und Kunden ankommt\n• Kundenakquise: Entwickeln Sie systematische Ansätze zum Finden und Konvertieren von Interessenten\n• Verkaufsprozess-Optimierung: Optimieren Sie Ihren Verkaufstrichter für maximale Effizienz\n\nWarum es wichtig ist: Sie haben Aufmerksamkeit – jetzt geht es darum, diese in Umsatz umzuwandeln. Dieses Paket gibt Ihnen die Werkzeuge und das Selbstvertrauen, zu verkaufen, abzuschließen und zu wachsen."
        }
    },
    'growth-capabilities': {
        title: { 
            en: "4. Growth Capabilities – Build what makes you unstoppable", 
            de: "4. Wachstumsfähigkeiten – Bauen Sie auf, was Sie unaufhaltsam macht" 
        },
        text: { 
            en: "For scaling startups investing in long-term strength.\n\nKey Areas:\n• Strategic capabilities: Identify and build the talents, systems, and technologies that power your mission\n• Cost efficiency: Improve margins by working smarter, not just harder\n• AI Tools workshops: Equip your team with practical know-how to leverage cutting-edge AI tools for productivity and innovation\n• System optimization: Build processes that scale with your growth\n\nWhy it matters: Scaling isn't just about more customers – it's about stronger systems. This package helps you grow sustainably while staying agile.",
            de: "Für wachstumsorientierte Start-ups, die in langfristige Stärke investieren.\n\nKernbereiche:\n• Strategische Fähigkeiten: Identifizieren und entwickeln Sie die Talente, Systeme und Technologien, die Ihre Mission antreiben\n• Kosteneffizienz: Verbessern Sie Ihre Margen, indem Sie klüger und nicht nur härter arbeiten\n• KI-Tools Workshops: Rüsten Sie Ihr Team mit praktischem Know-how aus, um moderne KI-Tools für Produktivität und Innovation zu nutzen\n• Systemoptimierung: Bauen Sie Prozesse auf, die mit Ihrem Wachstum skalieren\n\nWarum es wichtig ist: Skalierung bedeutet nicht nur mehr Kunden – es geht um stärkere Systeme. Dieses Paket hilft Ihnen, nachhaltig zu wachsen und agil zu bleiben."
        }
    },
    'scale-strategy': {
        title: { 
            en: "5. Scale Strategy – Become the category leader", 
            de: "5. Skalierungsstrategie – Werden Sie zum Branchenführer" 
        },
        text: { 
            en: "For mature startups ready to lead, launch larger funding rounds or expand globally.\n\nKey Areas:\n• AI Tools mastery: Advanced AI integration to automate operations and build competitive advantages\n• Comprehensive strategy: All of the above packages fully tailored to your current scaling challenges\n• Senior advisor access: Tailored workshops and strategy sessions with experienced advisors\n• Market expansion: Strategic planning for geographic and vertical growth\n• Leadership development: Build the leadership capabilities needed for scale\n\nWhy it matters: When you're ready to scale up, you need more than just advice - you need strategic clout. This flagship package turns ambition into execution.",
            de: "Für etablierte Start-ups, die bereit sind, zu führen, größere Finanzierungsrunden zu starten oder global zu expandieren.\n\nKernbereiche:\n• KI-Tools Mastery: Fortgeschrittene KI-Integration zur Automatisierung und Aufbau von Wettbewerbsvorteilen\n• Umfassende Strategie: All das oben Genannte – maßgeschneidert auf Ihre aktuellen Skalierungsherausforderungen\n• Senior-Berater-Zugang: Maßgeschneiderte Workshops und Strategiesitzungen mit erfahrenen Beratern\n• Markterweiterung: Strategische Planung für geografisches und vertikales Wachstum\n• Führungskräfteentwicklung: Bauen Sie die Führungskompetenzen auf, die für Skalierung erforderlich sind\n\nWarum es wichtig ist: Wenn Sie bereit sind zu wachsen, brauchen Sie mehr als nur Ratschläge – Sie brauchen strategische Schlagkraft. Dieses Flaggschiff-Paket verwandelt Ambitionen in Umsetzung."
        }
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Startup website loaded');
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    initializeNavigation();
    initializeLanguageToggle();
    initializeGrowthJourney();
    initializeSmoothScrolling();
    
    // Load saved language preference
    loadLanguagePreference();
    
    // Set initial language
    if (!currentLanguage) {
        currentLanguage = 'en';
    }
    updateLanguage(currentLanguage);
}

// Navigation functionality
function initializeNavigation() {
    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
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
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Language toggle functionality
function initializeLanguageToggle() {
    const languageToggle = document.querySelector('.language-toggle');
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLanguage();
        });
        
        languageToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLanguage();
            }
        });
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'de' : 'en';
    updateLanguage(currentLanguage);
    
    // If modal is open, refresh its content with new language
    const modal = document.getElementById('growth-modal');
    if (modal && modal.style.display === 'block') {
        // Find which step is currently displayed by checking the title
        const currentTitle = document.getElementById('growth-modal-title').textContent;
        let currentStep = null;
        
        // Find the step that matches the current title
        for (const [step, content] of Object.entries(growthContent)) {
            if (content.title.en === currentTitle || content.title.de === currentTitle) {
                currentStep = step;
                break;
            }
        }
        
        // Refresh modal content if we found the step
        if (currentStep) {
            openGrowthModal(currentStep);
        }
    }
}

function updateLanguage(lang) {
    // Update language toggle button
    const currentLangElement = document.getElementById('current-lang');
    const altLangElement = document.getElementById('alt-lang');
    
    if (currentLangElement && altLangElement) {
        currentLangElement.textContent = lang.toUpperCase();
        altLangElement.textContent = lang === 'en' ? 'DE' : 'EN';
    }
    
    // Update all elements with language attributes
    const elementsWithLang = document.querySelectorAll('[data-en][data-de]');
    
    elementsWithLang.forEach(element => {
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
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
        currentLanguage = savedLanguage;
    } else {
        currentLanguage = 'en';
    }
}

// Growth Journey functionality
function initializeGrowthJourney() {
    const growthBoxes = document.querySelectorAll('.growth-box');
    const modal = document.getElementById('growth-modal');
    const closeBtn = document.querySelector('.growth-close');
    
    console.log('Found growth boxes:', growthBoxes.length);
    console.log('Growth content keys:', Object.keys(growthContent));
    
    growthBoxes.forEach((box, index) => {
        const step = box.getAttribute('data-step');
        console.log(`Box ${index + 1} has data-step:`, step);
        
        box.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const step = this.getAttribute('data-step');
            console.log('Clicked box with step:', step);
            console.log('Available content for step:', growthContent[step] ? 'Found' : 'Not found');
            openGrowthModal(step);
        });
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
    console.log('openGrowthModal called with step:', step);
    const modal = document.getElementById('growth-modal');
    const title = document.getElementById('growth-modal-title');
    const text = document.getElementById('growth-modal-text');
    
    if (!modal || !title || !text) {
        console.error('Modal elements not found:', { modal: !!modal, title: !!title, text: !!text });
        return;
    }
    
    if (growthContent[step]) {
        const content = growthContent[step];
        console.log('Found content for step:', step, content);
        
        // Set title
        title.textContent = content.title[currentLanguage];
        
        // Format text content with proper structure
        const fullText = content.text[currentLanguage];
        
        // Split into sections
        const sections = fullText.split('\n\n');
        const description = sections[0];
        const keyAreasSection = sections[1]; // "Key Areas:" section
        const whyItMattersSection = sections[2]; // "Why it matters:" section
        
        // Clear previous content
        text.innerHTML = '';
        
        // Add description
        const descParagraph = document.createElement('p');
        descParagraph.textContent = description;
        descParagraph.style.marginBottom = '20px';
        descParagraph.style.fontWeight = '500';
        text.appendChild(descParagraph);
        
        // Process Key Areas section
        if (keyAreasSection && (keyAreasSection.includes('Key Areas:') || keyAreasSection.includes('Kernbereiche:'))) {
            const keyAreasDiv = document.createElement('div');
            keyAreasDiv.style.marginBottom = '20px';
            
            const keyAreasTitle = document.createElement('h4');
            keyAreasTitle.textContent = currentLanguage === 'en' ? 'Key Areas:' : 'Kernbereiche:';
            keyAreasTitle.style.marginBottom = '12px';
            keyAreasTitle.style.fontSize = '18px';
            keyAreasTitle.style.fontWeight = '600';
            keyAreasTitle.style.color = '#8cbe7d';
            keyAreasDiv.appendChild(keyAreasTitle);
            
            const list = document.createElement('ul');
            list.style.paddingLeft = '0';
            list.style.listStyle = 'none';
            list.style.margin = '0';
            
            // Extract bullet points
            const bulletPoints = keyAreasSection.split('\n').filter(line => line.trim().startsWith('•'));
            
            bulletPoints.forEach(point => {
                const listItem = document.createElement('li');
                listItem.style.marginBottom = '10px';
                listItem.style.paddingLeft = '24px';
                listItem.style.position = 'relative';
                listItem.style.lineHeight = '1.6';
                
                // Check if this is an AI Tools related point
                const isAITools = point.toLowerCase().includes('ai tools') || point.toLowerCase().includes('ki-tools');
                
                // Create custom bullet
                const bullet = document.createElement('span');
                bullet.innerHTML = isAITools ? '🤖' : '→';
                bullet.style.position = 'absolute';
                bullet.style.left = '0';
                bullet.style.color = isAITools ? '#FF6B35' : '#8BC07C';
                bullet.style.fontWeight = 'bold';
                bullet.style.fontSize = isAITools ? '14px' : '16px';
                
                listItem.appendChild(bullet);
                
                // Add text content (remove the bullet character)
                const textSpan = document.createElement('span');
                textSpan.textContent = point.replace('•', '').trim();
                
                // Special styling for AI Tools content
                if (isAITools) {
                    textSpan.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
                    textSpan.style.webkitBackgroundClip = 'text';
                    textSpan.style.webkitTextFillColor = 'transparent';
                    textSpan.style.backgroundClip = 'text';
                    textSpan.style.fontWeight = '700';
                    textSpan.style.fontSize = '15px';
                    
                    // Add a subtle glow effect
                    listItem.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(247, 147, 30, 0.05) 100%)';
                    listItem.style.borderRadius = '6px';
                    listItem.style.padding = '8px 8px 8px 24px';
                    listItem.style.border = '1px solid rgba(255, 107, 53, 0.2)';
                    listItem.style.marginBottom = '12px';
                }
                
                listItem.appendChild(textSpan);
                
                list.appendChild(listItem);
            });
            
            keyAreasDiv.appendChild(list);
            text.appendChild(keyAreasDiv);
        }
        
        // Process "Why it matters" section
        if (whyItMattersSection && (whyItMattersSection.includes('Why it matters:') || whyItMattersSection.includes('Warum es wichtig ist:'))) {
            const whyDiv = document.createElement('div');
            whyDiv.style.marginTop = '20px';
            whyDiv.style.padding = '16px';
            whyDiv.style.backgroundColor = '#F5F5F5';
            whyDiv.style.borderRadius = '8px';
            whyDiv.style.borderLeft = '4px solid #8BC07C';
            
            const whyTitle = document.createElement('h4');
            whyTitle.textContent = currentLanguage === 'en' ? 'Why It Matters:' : 'Warum es wichtig ist:';
            whyTitle.style.marginBottom = '8px';
            whyTitle.style.fontSize = '16px';
            whyTitle.style.fontWeight = '600';
            whyTitle.style.color = '#8cbe7d';
            whyDiv.appendChild(whyTitle);
            
            const whyText = document.createElement('p');
            whyText.textContent = whyItMattersSection.replace('Why it matters:', '').replace('Warum es wichtig ist:', '').trim();
            whyText.style.margin = '0';
            whyText.style.lineHeight = '1.6';
            whyText.style.color = '#4A4A4A';
            whyDiv.appendChild(whyText);
            
            text.appendChild(whyDiv);
        }
        
        modal.style.display = 'block';
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    } else {
        console.error('No content found for step:', step);
        console.error('Available steps:', Object.keys(growthContent));
        
        // Show error message in modal
        title.textContent = 'Content Not Found';
        text.textContent = `No content available for "${step}". Available steps: ${Object.keys(growthContent).join(', ')}`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeGrowthModal() {
    const modal = document.getElementById('growth-modal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }
}

// Make functions globally available for any inline calls
window.openGrowthModal = openGrowthModal;
window.closeGrowthModal = closeGrowthModal;

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

// Export functions for potential use
window.StartupWebsite = {
    toggleLanguage,
    updateLanguage,
    openGrowthModal,
    closeGrowthModal
};

// === Consent Manager (A+B) ===
(function(){
  const STORAGE_KEY = 'consent-' + (window.__CONSENT_VERSION__||'startup-v1');
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
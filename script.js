// Global variables
let currentLanguage = 'en';
let testimonialIndex = 0;

// Growth Journey Content Data
const growthContent = {
    market: {
        title: { en: "Market Research", de: "Marktforschung" },
        text: { 
            en: "Explore key market segments, current volumes, and emerging trends to identify growth paths.\n\n• Market Segmentation Analysis\n• Volume Assessment\n• Emerging Trend Identification\n• Growth Path Discovery\n• Market Opportunity Mapping",
            de: "Erkunden Sie wichtige Marktsegmente, aktuelle Volumina und aufkommende Trends, um Wachstumspfade zu identifizieren.\n\n• Marktsegmentierungsanalyse\n• Volumenbewertung\n• Identifikation aufkommender Trends\n• Entdeckung von Wachstumspfaden\n• Marktchancen-Mapping"
        }
    },
    revenue: {
        title: { en: "Revenue Strategy", de: "Umsatzstrategie" },
        text: { 
            en: "Maximize profitability by evaluating income streams and strategic partnerships.\n\n• Income Stream Evaluation\n• Profitability Optimization\n• Strategic Partnership Assessment\n• Revenue Model Development\n• Financial Performance Enhancement",
            de: "Maximieren Sie die Rentabilität durch Bewertung von Einkommensströmen und strategischen Partnerschaften.\n\n• Bewertung von Einkommensströmen\n• Rentabilitätsoptimierung\n• Bewertung strategischer Partnerschaften\n• Entwicklung von Umsatzmodellen\n• Verbesserung der Finanzleistung"
        }
    },
    sales: {
        title: { en: "Sales Acceleration", de: "Vertriebsbeschleunigung" },
        text: { 
            en: "Enhance reach and conversion by optimizing your sales approach and channel mix.\n\n• Sales Approach Optimization\n• Channel Mix Strategy\n• Reach Enhancement\n• Conversion Rate Improvement\n• Sales Performance Acceleration",
            de: "Verbessern Sie Reichweite und Konversion durch Optimierung Ihres Vertriebsansatzes und Channel-Mix.\n\n• Optimierung des Vertriebsansatzes\n• Channel-Mix-Strategie\n• Reichweitensteigerung\n• Verbesserung der Konversionsrate\n• Beschleunigung der Vertriebsleistung"
        }
    },
    capabilities: {
        title: { en: "Strategic Capabilities", de: "Strategische Fähigkeiten" },
        text: { 
            en: "Build the essential skills, resources, and technologies that drive long-term success.\n\n• Essential Skills Development\n• Resource Optimization\n• Technology Integration\n• Long-term Success Planning\n• Capability Building",
            de: "Bauen Sie die wesentlichen Fähigkeiten, Ressourcen und Technologien auf, die langfristigen Erfolg vorantreiben.\n\n• Entwicklung wesentlicher Fähigkeiten\n• Ressourcenoptimierung\n• Technologieintegration\n• Langfristige Erfolgsplanung\n• Fähigkeitenaufbau"
        }
    },
    cost: {
        title: { en: "Cost Efficiency", de: "Kosteneffizienz" },
        text: { 
            en: "Streamline expenses and refine cost models to improve financial agility.\n\n• Expense Streamlining\n• Cost Model Refinement\n• Financial Agility Enhancement\n• Operational Efficiency\n• Budget Optimization",
            de: "Rationalisieren Sie Ausgaben und verfeinern Sie Kostenmodelle, um die finanzielle Agilität zu verbessern.\n\n• Ausgabenrationalisierung\n• Verfeinerung von Kostenmodellen\n• Verbesserung der finanziellen Agilität\n• Operative Effizienz\n• Budgetoptimierung"
        }
    },
    partner: {
        title: { en: "Strategic Partnerships", de: "Strategische Partnerschaften" },
        text: { 
            en: "Forge alliances that complement your strengths and expand your market presence.\n\n• Alliance Development\n• Strength Complementation\n• Market Presence Expansion\n• Partnership Strategy\n• Collaborative Growth",
            de: "Schmieden Sie Allianzen, die Ihre Stärken ergänzen und Ihre Marktpräsenz erweitern.\n\n• Allianzentwicklung\n• Stärkenergänzung\n• Erweiterung der Marktpräsenz\n• Partnerschaftsstrategie\n• Kollaboratives Wachstum"
        }
    },
    usp: {
        title: { en: "Value Proposition", de: "Wertversprechen" },
        text: { 
            en: "Clearly define what sets your offering apart to create lasting competitive advantage.\n\n• Unique Value Definition\n• Competitive Advantage Creation\n• Market Differentiation\n• Value Communication\n• Positioning Strategy",
            de: "Definieren Sie klar, was Ihr Angebot auszeichnet, um dauerhaften Wettbewerbsvorteil zu schaffen.\n\n• Definition einzigartiger Werte\n• Schaffung von Wettbewerbsvorteilen\n• Marktdifferenzierung\n• Wertkommunikation\n• Positionierungsstrategie"
        }
    },
    pitch: {
        title: { en: "Pitch Readiness", de: "Pitch-Bereitschaft" },
        text: { 
            en: "Craft persuasive investor and client pitches that drive engagement and commitment.\n\n• Investor Pitch Development\n• Client Presentation Crafting\n• Engagement Strategy\n• Commitment Building\n• Persuasive Communication",
            de: "Erstellen Sie überzeugende Investor- und Kunden-Pitches, die Engagement und Commitment fördern.\n\n• Entwicklung von Investor-Pitches\n• Erstellung von Kundenpräsentationen\n• Engagement-Strategie\n• Commitment-Aufbau\n• Überzeugende Kommunikation"
        }
    }
};

// DOM Content Loaded - Single event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    initializeWebsite();
    initializeScrollAnimations();
    addFloatingAnimations();
});

// Initialize website functionality
function initializeWebsite() {
    console.log('Initializing website...');
    initializeNavigation();
    initializeTestimonialSlider();
    initializeSmoothScrolling();
    initializeLanguageToggle();
    initializeContactTabs();
    initializeGrowthJourney();
    
    // Load saved language preference first
    loadLanguagePreference();
    
    // Set initial language (fallback to 'en' if no preference saved)
    if (!currentLanguage) {
        currentLanguage = 'en';
    }
    updateLanguage(currentLanguage);
    
    console.log('Website initialization completed');
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
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
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
        // Remove any existing event listeners and add a new one
        languageToggle.removeEventListener('click', toggleLanguage);
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Language toggle clicked');
            toggleLanguage();
        });
        
        // Also add keyboard support
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
            // Check if element is an input or has special handling needed
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
    console.log('Initializing Growth Journey...');
    
    // Add click listeners to growth boxes
    const growthBoxes = document.querySelectorAll('.growth-box');
    const modal = document.getElementById('growth-modal');
    const closeBtn = document.querySelector('.growth-close');
    
    console.log('Found growth boxes:', growthBoxes.length);
    console.log('Found modal:', modal ? 'Yes' : 'No');
    
    growthBoxes.forEach((box, index) => {
        console.log(`Setting up box ${index + 1}:`, box.getAttribute('data-step'));
        
        box.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const step = this.getAttribute('data-step');
            console.log('Clicked box:', step);
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
    console.log('Opening modal for step:', step);
    
    const modal = document.getElementById('growth-modal');
    const title = document.getElementById('growth-modal-title');
    const text = document.getElementById('growth-modal-text');
    
    if (!modal || !title || !text) {
        console.error('Modal elements not found:', { modal: !!modal, title: !!title, text: !!text });
        return;
    }
    
    if (growthContent[step]) {
        const content = growthContent[step];
        title.textContent = content.title[currentLanguage];
        text.textContent = content.text[currentLanguage];
        modal.style.display = 'block';
        
        console.log('Modal opened successfully');
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Content not found for step:', step);
    }
}

function closeGrowthModal() {
    console.log('Closing modal');
    const modal = document.getElementById('growth-modal');
    if (modal) {
        modal.style.display = 'none';
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
    
    console.log('Contact form submitted');
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

// Load saved language preference
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferred-language');
    console.log('Saved language preference:', savedLanguage);
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
        currentLanguage = savedLanguage;
        console.log('Loaded language preference:', currentLanguage);
    } else {
        currentLanguage = 'en'; // Default to English
        console.log('No saved preference, defaulting to English');
    }
}

// Initialize language preference on load
document.addEventListener('DOMContentLoaded', () => {
    loadLanguagePreference();
    initializeScrollAnimations();
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

// Export functions for potential use in other scripts
window.GFWebsite = {
    toggleLanguage,
    switchTab,
    updateLanguage,
    handleContactForm,
    openGrowthModal,
    closeGrowthModal
};
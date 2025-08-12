// Global variables
let currentLanguage = 'en';

// Startup-focused Growth Journey Content
const growthContent = {
    competitive: {
        title: { en: "Competitive Landscape", de: "Wettbewerbslandschaft" },
        text: { 
            en: "Understand your competitive landscape and find your unique positioning.\n\n• Competitor Mapping\n• SWOT Analysis\n• Competitive Advantage Definition\n• Market Gap Identification\n• Differentiation Strategy",
            de: "Verstehen Sie Ihre Wettbewerbslandschaft und finden Sie Ihre einzigartige Positionierung.\n\n• Wettbewerber-Mapping\n• SWOT-Analyse\n• Definition von Wettbewerbsvorteilen\n• Marktlücken-Identifikation\n• Differenzierungsstrategie"
        }
    },
    market: {
        title: { en: "Market Insights", de: "Markteinblicke" },
        text: { 
            en: "Explore key market segments and emerging trends to identify growth opportunities.\n\n• Market Segmentation Analysis\n• Customer Research\n• Market Size Assessment\n• Trend Identification\n• Opportunity Mapping",
            de: "Erkunden Sie wichtige Marktsegmente und aufkommende Trends, um Wachstumschancen zu identifizieren.\n\n• Marktsegmentierungsanalyse\n• Kundenforschung\n• Marktgrößenbewertung\n• Trend-Identifikation\n• Chancen-Mapping"
        }
    },
    revenue: {
        title: { en: "Revenue Strategy", de: "Umsatzstrategie" },
        text: { 
            en: "Design sustainable revenue streams that scale with your growth.\n\n• Business Model Canvas\n• Revenue Stream Design\n• Pricing Strategy\n• Unit Economics\n• Scalability Planning",
            de: "Gestalten Sie nachhaltige Umsatzströme, die mit Ihrem Wachstum skalieren.\n\n• Business Model Canvas\n• Revenue Stream Design\n• Preisstrategie\n• Unit Economics\n• Skalierbarkeitsplanung"
        }
    },
    sales: {
        title: { en: "Sales Acceleration", de: "Vertriebsbeschleunigung" },
        text: { 
            en: "Build efficient customer acquisition channels that drive sustainable growth.\n\n• Customer Acquisition Strategy\n• Channel Optimization\n• Conversion Funnel Design\n• CAC/LTV Analysis\n• Growth Hacking Techniques",
            de: "Bauen Sie effiziente Kundenakquise-Kanäle auf, die nachhaltiges Wachstum fördern.\n\n• Kundenakquise-Strategie\n• Kanal-Optimierung\n• Conversion-Funnel-Design\n• CAC/LTV-Analyse\n• Growth-Hacking-Techniken"
        }
    },
    capabilities: {
        title: { en: "Strategic Capabilities", de: "Strategische Fähigkeiten" },
        text: { 
            en: "Build a robust, scalable technology foundation for your startup.\n\n• Technology Architecture\n• Platform Selection\n• Scalability Planning\n• Security Framework\n• AI/ML Integration",
            de: "Bauen Sie eine robuste, skalierbare Technologie-Grundlage für Ihr Startup.\n\n• Technologie-Architektur\n• Plattform-Auswahl\n• Skalierbarkeitsplanung\n• Sicherheits-Framework\n• KI/ML-Integration"
        }
    },
    cost: {
        title: { en: "Cost Efficiency", de: "Kosteneffizienz" },
        text: { 
            en: "Optimize your cost structure for lean operations and efficient scaling.\n\n• Cost Analysis & Optimization\n• Budget Planning\n• Cash Flow Management\n• Resource Allocation\n• Financial Efficiency",
            de: "Optimieren Sie Ihre Kostenstruktur für schlanke Abläufe und effiziente Skalierung.\n\n• Kostenanalyse & Optimierung\n• Budgetplanung\n• Cash-Flow-Management\n• Ressourcenallokation\n• Finanzielle Effizienz"
        }
    },
    partner: {
        title: { en: "Strategic Partnerships", de: "Strategische Partnerschaften" },
        text: { 
            en: "Identify and secure strategic partnerships that accelerate your growth.\n\n• Partnership Strategy\n• Partner Identification\n• Alliance Development\n• Integration Planning\n• Mutual Value Creation",
            de: "Identifizieren und sichern Sie strategische Partnerschaften, die Ihr Wachstum beschleunigen.\n\n• Partnerschaftsstrategie\n• Partner-Identifikation\n• Allianz-Entwicklung\n• Integrationsplanung\n• Gegenseitige Wertschöpfung"
        }
    },
    usp: {
        title: { en: "Value Proposition", de: "Wertversprechen" },
        text: { 
            en: "Craft a compelling value proposition that resonates with your target market.\n\n• Value Proposition Canvas\n• Customer Pain Point Analysis\n• Unique Value Definition\n• Message-Market Fit\n• Brand Positioning",
            de: "Erstellen Sie ein überzeugendes Wertversprechen, das bei Ihrem Zielmarkt ankommt.\n\n• Value Proposition Canvas\n• Analyse der Kundenschmerzen\n• Definition einzigartiger Werte\n• Message-Market Fit\n• Markenpositionierung"
        }
    },
    pitch: {
        title: { en: "Pitch Readiness", de: "Pitch-Bereitschaft" },
        text: { 
            en: "Prepare compelling investor materials that secure funding for your startup.\n\n• Pitch Deck Development\n• Financial Projections\n• Due Diligence Preparation\n• Investor Targeting\n• Funding Strategy",
            de: "Bereiten Sie überzeugende Investor-Materialien vor, die Finanzierung für Ihr Startup sichern.\n\n• Pitch-Deck-Entwicklung\n• Finanzprognosen\n• Due-Diligence-Vorbereitung\n• Investor-Targeting\n• Finanzierungsstrategie"
        }
    },
    ai: {
        title: { en: "AI for Startups", de: "KI für Startups" },
        text: { 
            en: "Integrate AI strategically to accelerate your startup's growth and efficiency.\n\n• AI Strategy Development\n• Technology Assessment\n• Implementation Planning\n• ROI Optimization\n• Competitive Advantage through AI",
            de: "Integrieren Sie KI strategisch, um das Wachstum und die Effizienz Ihres Startups zu beschleunigen.\n\n• KI-Strategieentwicklung\n• Technologiebewertung\n• Implementierungsplanung\n• ROI-Optimierung\n• Wettbewerbsvorteil durch KI"
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
        
        // Format text content with proper list structure
        const fullText = content.text[currentLanguage];
        const parts = fullText.split('\n\n');
        const description = parts[0];
        const bulletPoints = parts[1] ? parts[1].split('\n') : [];
        
        // Clear previous content
        text.innerHTML = '';
        
        // Add description paragraph
        const descParagraph = document.createElement('p');
        descParagraph.textContent = description;
        descParagraph.style.marginBottom = '20px';
        descParagraph.style.lineHeight = '1.6';
        text.appendChild(descParagraph);
        
        // Add bullet points as a proper list
        if (bulletPoints.length > 0) {
            const listContainer = document.createElement('div');
            listContainer.style.marginTop = '16px';
            
            const listTitle = document.createElement('h4');
            listTitle.textContent = currentLanguage === 'en' ? 'Key Areas:' : 'Kernbereiche:';
            listTitle.style.marginBottom = '12px';
            listTitle.style.fontSize = '1.1rem';
            listTitle.style.fontWeight = '600';
            listTitle.style.color = '#211D58';
            listContainer.appendChild(listTitle);
            
            const list = document.createElement('ul');
            list.style.paddingLeft = '0';
            list.style.listStyle = 'none';
            list.style.margin = '0';
            
            bulletPoints.forEach(point => {
                if (point.trim() && point.startsWith('•')) {
                    const listItem = document.createElement('li');
                    listItem.style.marginBottom = '8px';
                    listItem.style.paddingLeft = '24px';
                    listItem.style.position = 'relative';
                    listItem.style.lineHeight = '1.5';
                    
                    // Create custom bullet
                    const bullet = document.createElement('span');
                    bullet.innerHTML = '●';
                    bullet.style.position = 'absolute';
                    bullet.style.left = '8px';
                    bullet.style.color = '#8BC07C';
                    bullet.style.fontWeight = 'bold';
                    
                    listItem.appendChild(bullet);
                    
                    // Add text content (remove the original • character)
                    const textSpan = document.createElement('span');
                    textSpan.textContent = point.replace('•', '').trim();
                    listItem.appendChild(textSpan);
                    
                    list.appendChild(listItem);
                }
            });
            
            listContainer.appendChild(list);
            text.appendChild(listContainer);
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
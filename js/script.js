const themeStorageKey = "portfolio-theme";

function getStoredTheme() {
    try {
        return localStorage.getItem(themeStorageKey);
    } catch (error) {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
        // Le site reste fonctionnel si le navigateur bloque le stockage local.
    }
}

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.setAttribute("aria-label", isDark ? "Activer le mode clair" : "Activer le mode sombre");
        themeToggle.setAttribute("title", isDark ? "Mode clair" : "Mode sombre");
    }
}

const storedTheme = getStoredTheme();
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

function openSidebar(sidebarId) {
    // Ouvre la barre spécifique demandée
    const sidebar = document.getElementById(sidebarId);
    if (!sidebar) {
        return;
    }

    sidebar.classList.add("active");
    // Active l'overlay (le fond noir)
    document.getElementById("overlay").classList.add("active");
    // Empêche le scroll
    document.body.style.overflow = "hidden";
}

function closeSidebar() {
    // Ferme toutes les sidebars ouvertes
    const sidebars = document.querySelectorAll('.sidebar');
    sidebars.forEach(sidebar => {
        sidebar.classList.remove('active');
    });
    
    // Désactive l'overlay
    document.getElementById("overlay").classList.remove("active");
    // Réactive le scroll
    document.body.style.overflow = "auto";
}

function switchTab(tabName) {
    // 1. Cacher tous les contenus
    document.getElementById('tech').classList.remove('active-grid');
    document.getElementById('human').classList.remove('active-grid');

    // 2. Désactiver tous les boutons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 3. Afficher le contenu demandé et activer le bouton cliqué
    const activeGrid = document.getElementById(tabName);
    if (!activeGrid) {
        return;
    }

    activeGrid.classList.add('active-grid');

    // Trouver le bouton correspondant pour lui mettre la classe active
    const activeButton = document.querySelector(`.tab-btn[onclick="switchTab('${tabName}')"]`);
    if(activeButton) {
        activeButton.classList.add('active');
    }

    activeGrid.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}

function toggleAccordion(button) {
    // 1. Basculer la classe 'active' sur le bouton (pour la flèche et la couleur)
    button.classList.toggle("active");

    // 2. Récupérer le contenu associé (le div juste après le bouton)
    var content = button.nextElementSibling;

    // 3. Si c'est ouvert, on ferme. Si c'est fermé, on ouvre.
    if (content.style.maxHeight) {
        content.style.maxHeight = null; // Fermer
    } else {
        // On définit la hauteur max sur la hauteur réelle du contenu (scrollHeight)
        content.style.maxHeight = content.scrollHeight + "px"; 
    }
}

// --- GESTION DE LA LIGHTBOX ---

function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // On récupère la source de l'image cliquée pour la mettre dans le lightbox
    lightboxImg.src = imgElement.src;
    
    // On affiche le lightbox
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

// --- GESTION DU MENU HAMBURGER ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');
    const themeToggle = document.getElementById('theme-toggle');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    applyTheme(getStoredTheme() || (prefersDark ? "dark" : "light"));

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('dark-mode') ? "light" : "dark";
            applyTheme(nextTheme);
            saveTheme(nextTheme);
        });
    }

    if (navbar) {
        const updateNavbar = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        };

        updateNavbar();
        window.addEventListener('scroll', updateNavbar, { passive: true });
    }

    const setActiveNavLink = (sectionId) => {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const sections = [...navLinks]
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (sections.length) {
        const updateActiveSection = () => {
            const offset = (navbar ? navbar.offsetHeight : 0) + 80;
            let activeSection = sections[0];

            sections.forEach(section => {
                if (window.scrollY + offset >= section.offsetTop) {
                    activeSection = section;
                }
            });

            setActiveNavLink(activeSection.id);
        };

        if (window.location.hash) {
            setActiveNavLink(window.location.hash.replace('#', ''));
        } else {
            updateActiveSection();
        }

        window.addEventListener('scroll', updateActiveSection, { passive: true });
    }

    const revealElements = document.querySelectorAll('.hero-content, .section > .container > h2, #about > .container > p, .project-grid > .card > .card-content, .skills-grid > .skill-card, .tabs-container, .cv-img, .boton-elegante, #contacts .hero-text');

    revealElements.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 80}ms`);
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add('visible'));
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Basculer la classe 'active' sur le menu de navigation
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Mettre à jour l'attribut ARIA pour l'accessibilité
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSidebar();
            closeLightbox();

            if (hamburger && navMenu) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            }
        }
    });
});

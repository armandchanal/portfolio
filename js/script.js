function openSidebar(sidebarId) {
    // Ouvre la barre spécifique demandée
    document.getElementById(sidebarId).classList.add("active");
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
    document.getElementById(tabName).classList.add('active-grid');
    
    // Trouver le bouton cliqué pour lui mettre la classe active
    // Note: event est global dans les attributs onclick HTML, 
    // mais dans un fichier externe, il vaut mieux s'assurer qu'il est bien passé.
    if(event) {
        event.currentTarget.classList.add('active');
    }
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

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Basculer la classe 'active' sur le menu de navigation
            navMenu.classList.toggle('active');

            // Mettre à jour l'attribut ARIA pour l'accessibilité
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
    }
});

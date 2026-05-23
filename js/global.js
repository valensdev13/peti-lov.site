/**
 * PetFood - Global JavaScript
 * Funciones compartidas en todas las páginas
 */

'use strict';

/* =========================================================
   NAVBAR: efecto al hacer scroll
   ========================================================= */
(function initNavbarScroll() {
  const navbar = document.querySelector('.pf-navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial
})();

/* =========================================================
   NAVBAR: marcar enlace activo según página actual
   ========================================================= */
(function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  const navLinks = document.querySelectorAll('.pf-navbar .nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPage.includes(href.replace('.html', ''))) {
      link.classList.add('active');
    }
  });
})();

/* =========================================================
   SCROLL TO TOP
   ========================================================= */
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =========================================================
   ANIMACIONES AL ENTRAR EN VIEWPORT (Intersection Observer)
   ========================================================= */
(function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || '0';
        entry.target.style.animationDelay = delay + 'ms';
        entry.target.classList.add('animate-fadeInUp');
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
})();

/* =========================================================
   TOPBAR: cerrar barra de anuncio
   ========================================================= */
(function initTopbarDismiss() {
  const dismissBtn = document.getElementById('topbarDismiss');
  const topbar = document.getElementById('pf-topbar');
  if (!dismissBtn || !topbar) return;

  dismissBtn.addEventListener('click', () => {
    topbar.style.transition = 'all .3s ease';
    topbar.style.maxHeight = '0';
    topbar.style.overflow = 'hidden';
    topbar.style.padding = '0';
    setTimeout(() => topbar.remove(), 350);
  });
})();

/* =========================================================
   UTILIDAD: formatear precio
   ========================================================= */
function formatPrice(amount, currency = 'COP') {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(amount);
}

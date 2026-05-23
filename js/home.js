/**
 * PetFood - Home Page JavaScript
 * Funcionalidades específicas de la página principal
 */

'use strict';

/* =========================================================
   CONTADOR ANIMADO DE ESTADÍSTICAS
   ========================================================= */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const rawText = el.textContent.trim();

        // Extraer número y sufijo
        const match = rawText.match(/^([+\d.,]+)(.*)/);
        if (!match) return;

        const numStr = match[1].replace(/[+,.]/g, '');
        const suffix = match[2] || '';
        const prefix = rawText.startsWith('+') ? '+' : '';
        const target = parseInt(numStr, 10);

        if (isNaN(target)) return;

        let current = 0;
        const duration = 1800;
        const step = target / (duration / 16);

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(current).toLocaleString('es-CO') + suffix;
        }, 16);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* =========================================================
   GALERÍA: lightbox simple
   ========================================================= */
(function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  // Crear modal lightbox
  const modal = document.createElement('div');
  modal.id = 'galleryLightbox';
  modal.innerHTML = `
    <div class="lightbox-backdrop">
      <button class="lightbox-close" aria-label="Cerrar">
        <i class="bi bi-x-lg"></i>
      </button>
      <img src="" alt="" class="lightbox-img" />
    </div>
  `;
  modal.style.cssText = `
    display:none; position:fixed; inset:0; z-index:9999;
    background:rgba(0,0,0,.85); align-items:center; justify-content:center;
  `;

  const backdrop = modal.querySelector('.lightbox-backdrop');
  backdrop.style.cssText = `
    position:relative; max-width:90vw; max-height:90vh;
    display:flex; align-items:center; justify-content:center;
  `;

  const img = modal.querySelector('.lightbox-img');
  img.style.cssText = `
    max-width:90vw; max-height:85vh; object-fit:contain;
    border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,.5);
  `;

  const closeBtn = modal.querySelector('.lightbox-close');
  closeBtn.style.cssText = `
    position:absolute; top:-2.5rem; right:0;
    background:rgba(255,255,255,.2); border:none; color:#fff;
    width:36px; height:36px; border-radius:50%; cursor:pointer;
    display:flex; align-items:center; justify-content:center; font-size:1rem;
  `;

  document.body.appendChild(modal);

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      const alt = item.querySelector('img').alt;
      img.src = src;
      img.alt = alt;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    img.src = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

/* =========================================================
   PRODUCTOS: hover efecto adicional en botón
   ========================================================= */
(function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const btn = card.querySelector('.btn-pf-primary');
    if (!btn) return;

    card.addEventListener('mouseenter', () => {
      btn.innerHTML = '<i class="bi bi-bag-plus-fill"></i>';
    });
    card.addEventListener('mouseleave', () => {
      btn.innerHTML = '<i class="bi bi-bag-plus"></i>';
    });
  });
})();

/**
 * PetFood - Nosotros Page JavaScript
 * Funcionalidades específicas de la página Nosotros
 */

'use strict';

/* =========================================================
   CONTADORES ANIMADOS DE ESTADÍSTICAS
   ========================================================= */
(function initStoryCounters() {
  const counters = document.querySelectorAll('.story-stat-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const rawText = el.textContent.trim();
      const match = rawText.match(/^([+\d.,]+)(.*)/);
      if (!match) return;

      const numStr = match[1].replace(/[+,.]/g, '');
      const suffix = match[2] || '';
      const prefix = rawText.startsWith('+') ? '+' : '';
      const target = parseInt(numStr, 10);

      if (isNaN(target)) return;

      let current = 0;
      const duration = 1600;
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
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* =========================================================
   PROCESO: animación secuencial de pasos
   ========================================================= */
(function initProcessAnimation() {
  const steps = document.querySelectorAll('.process-step');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const step = entry.target;
        const delay = parseInt(step.dataset.delay || '0', 10);

        setTimeout(() => {
          step.style.opacity = '1';
          step.style.transform = 'translateX(0)';
        }, delay);

        observer.unobserve(step);
      }
    });
  }, { threshold: 0.2 });

  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-20px)';
    step.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(step);
  });
})();

/* =========================================================
   EQUIPO: tooltip con descripción al hover (mobile)
   ========================================================= */
(function initTeamCards() {
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    // En dispositivos táctiles, toggle de social al tap
    card.addEventListener('touchstart', () => {
      const social = card.querySelector('.team-social');
      if (social) {
        const isVisible = social.style.transform === 'translateY(0px)';
        social.style.transform = isVisible ? 'translateY(100%)' : 'translateY(0px)';
      }
    }, { passive: true });
  });
})();

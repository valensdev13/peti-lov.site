/**
 * PetFood - Catálogo Page JavaScript
 * Filtros, búsqueda, ordenamiento, vista y carrito
 */

'use strict';

/* =========================================================
   ESTADO GLOBAL DEL CATÁLOGO
   ========================================================= */
const catalogState = {
  categoria: 'todos',
  tipos: [],
  edades: [],
  precioMax: 120000,
  searchTerm: '',
  sortBy: 'default'
};

/* =========================================================
   REFERENCIAS DOM
   ========================================================= */
const productsGrid   = document.getElementById('productsGrid');
const noResults      = document.getElementById('noResults');
const productCount   = document.getElementById('productCount');
const searchInput    = document.getElementById('searchInput');
const priceRange     = document.getElementById('priceRange');
const priceLabel     = document.getElementById('priceLabel');
const sortSelect     = document.getElementById('sortSelect');
const clearFiltersBtn = document.getElementById('clearFilters');
const resetSearchBtn  = document.getElementById('resetSearch');
const viewGridBtn    = document.getElementById('viewGrid');
const viewListBtn    = document.getElementById('viewList');
const cartToastEl    = document.getElementById('cartToast');
const toastMessage   = document.getElementById('toastMessage');

/* =========================================================
   FUNCIÓN PRINCIPAL: APLICAR FILTROS
   ========================================================= */
function applyFilters() {
  const items = Array.from(productsGrid.querySelectorAll('.product-item'));
  let visibleCount = 0;

  items.forEach(item => {
    const categoria = item.dataset.categoria;
    const tipo      = item.dataset.tipo;
    const edad      = item.dataset.edad;
    const precio    = parseInt(item.dataset.precio, 10);
    const nombre    = (item.dataset.nombre || '').toLowerCase();

    // Filtro categoría
    const matchCat = catalogState.categoria === 'todos' || categoria === catalogState.categoria;

    // Filtro tipo (OR entre seleccionados)
    const matchTipo = catalogState.tipos.length === 0 || catalogState.tipos.includes(tipo);

    // Filtro edad (OR entre seleccionados)
    const matchEdad = catalogState.edades.length === 0 ||
                      catalogState.edades.includes(edad) ||
                      catalogState.edades.includes('todas') ||
                      edad === 'todas';

    // Filtro precio
    const matchPrecio = precio <= catalogState.precioMax;

    // Filtro búsqueda
    const matchSearch = catalogState.searchTerm === '' ||
                        nombre.includes(catalogState.searchTerm.toLowerCase());

    const visible = matchCat && matchTipo && matchEdad && matchPrecio && matchSearch;

    if (visible) {
      item.classList.remove('hidden');
      visibleCount++;
    } else {
      item.classList.add('hidden');
    }
  });

  // Actualizar contador
  productCount.textContent = visibleCount;

  // Mostrar/ocultar mensaje sin resultados
  if (visibleCount === 0) {
    noResults.classList.remove('d-none');
    productsGrid.style.display = 'none';
  } else {
    noResults.classList.add('d-none');
    productsGrid.style.display = '';
  }

  // Aplicar ordenamiento
  sortProducts();
}

/* =========================================================
   ORDENAMIENTO
   ========================================================= */
function sortProducts() {
  const items = Array.from(productsGrid.querySelectorAll('.product-item:not(.hidden)'));

  items.sort((a, b) => {
    const priceA = parseInt(a.dataset.precio, 10);
    const priceB = parseInt(b.dataset.precio, 10);
    const nameA  = a.dataset.nombre || '';
    const nameB  = b.dataset.nombre || '';

    switch (catalogState.sortBy) {
      case 'price-asc':  return priceA - priceB;
      case 'price-desc': return priceB - priceA;
      case 'name':       return nameA.localeCompare(nameB, 'es');
      default:           return 0;
    }
  });

  // Re-insertar en el DOM en el orden correcto
  items.forEach(item => productsGrid.appendChild(item));
}

/* =========================================================
   LISTENERS: FILTROS
   ========================================================= */

// Categoría (radio)
document.querySelectorAll('input[name="categoria"]').forEach(radio => {
  radio.addEventListener('change', () => {
    catalogState.categoria = radio.value;
    applyFilters();
  });
});

// Tipo (checkbox)
document.querySelectorAll('input[name="tipo"]').forEach(cb => {
  cb.addEventListener('change', () => {
    catalogState.tipos = Array.from(
      document.querySelectorAll('input[name="tipo"]:checked')
    ).map(el => el.value);
    applyFilters();
  });
});

// Edad (checkbox)
document.querySelectorAll('input[name="edad"]').forEach(cb => {
  cb.addEventListener('change', () => {
    catalogState.edades = Array.from(
      document.querySelectorAll('input[name="edad"]:checked')
    ).map(el => el.value);
    applyFilters();
  });
});

// Precio (range)
if (priceRange) {
  priceRange.addEventListener('input', () => {
    const val = parseInt(priceRange.value, 10);
    catalogState.precioMax = val;
    priceLabel.textContent = '$' + val.toLocaleString('es-CO');
    applyFilters();
  });
}

// Búsqueda
if (searchInput) {
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      catalogState.searchTerm = searchInput.value.trim();
      applyFilters();
    }, 300);
  });
}

// Ordenamiento
if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    catalogState.sortBy = sortSelect.value;
    applyFilters();
  });
}

// Limpiar filtros
if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener('click', resetAllFilters);
}

if (resetSearchBtn) {
  resetSearchBtn.addEventListener('click', () => {
    resetAllFilters();
    if (searchInput) searchInput.value = '';
  });
}

function resetAllFilters() {
  // Reset estado
  catalogState.categoria  = 'todos';
  catalogState.tipos      = [];
  catalogState.edades     = [];
  catalogState.precioMax  = 120000;
  catalogState.searchTerm = '';
  catalogState.sortBy     = 'default';

  // Reset UI
  document.querySelector('input[name="categoria"][value="todos"]').checked = true;
  document.querySelectorAll('input[name="tipo"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('input[name="edad"]').forEach(cb => cb.checked = false);
  if (priceRange)  { priceRange.value = 120000; }
  if (priceLabel)  { priceLabel.textContent = '$120.000'; }
  if (sortSelect)  { sortSelect.value = 'default'; }
  if (searchInput) { searchInput.value = ''; }

  applyFilters();
}

/* =========================================================
   VISTA GRID / LISTA
   ========================================================= */
if (viewGridBtn && viewListBtn) {
  viewGridBtn.addEventListener('click', () => {
    productsGrid.classList.remove('list-view');
    viewGridBtn.classList.replace('btn-outline-secondary', 'btn-pf-primary');
    viewListBtn.classList.replace('btn-pf-primary', 'btn-outline-secondary');
    // Restaurar columnas
    productsGrid.querySelectorAll('.product-item').forEach(item => {
      item.className = item.className.replace(/col-12\b/, 'col-sm-6 col-xl-4');
    });
  });

  viewListBtn.addEventListener('click', () => {
    productsGrid.classList.add('list-view');
    viewListBtn.classList.replace('btn-outline-secondary', 'btn-pf-primary');
    viewGridBtn.classList.replace('btn-pf-primary', 'btn-outline-secondary');
    // Hacer columnas de ancho completo
    productsGrid.querySelectorAll('.product-item').forEach(item => {
      item.classList.remove('col-sm-6', 'col-xl-4');
      item.classList.add('col-12');
    });
  });
}

/* =========================================================
   WISHLIST (favoritos)
   ========================================================= */
(function initWishlist() {
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.classList.replace('bi-heart', 'bi-heart-fill');
        icon.style.color = '#E53E3E';
      } else {
        icon.classList.replace('bi-heart-fill', 'bi-heart');
        icon.style.color = '';
      }
    });
  });
})();

/* =========================================================
   CARRITO: AGREGAR PRODUCTO (toast)
   ========================================================= */
(function initAddToCart() {
  const addBtns = document.querySelectorAll('.add-to-cart');
  const toast   = cartToastEl ? new bootstrap.Toast(cartToastEl, { delay: 2800 }) : null;

  addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name || 'Producto';
      if (toastMessage) {
        toastMessage.textContent = `"${name}" agregado al carrito.`;
      }
      if (toast) toast.show();

      // Animación del botón
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check2 me-1"></i> Agregado';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.disabled = false;
      }, 2000);
    });
  });
})();

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */
applyFilters();

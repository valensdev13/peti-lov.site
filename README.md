# NutriPaws – Plantilla Web para Tienda de Alimentos para Mascotas

Plantilla HTML/CSS/JS para sitio web de venta de alimentos naturales para animales.
Desarrollada con **Bootstrap 5.3**, CSS personalizado y JavaScript vanilla.

---

## Estructura del proyecto

```
petfood-template/
│
├── home.html           → Página principal (Home)
├── nosotros.html       → Página Nosotros / Acerca de
├── catalogo.html       → Página Catálogo de productos
│
├── css/
│   ├── global.css      → Variables, navbar, footer, botones, utilidades globales
│   ├── home.css        → Estilos específicos de Home
│   ├── nosotros.css    → Estilos específicos de Nosotros
│   └── catalogo.css    → Estilos específicos del Catálogo
│
├── js/
│   ├── global.js       → Navbar scroll, scroll-to-top, animaciones de entrada
│   ├── home.js         → Contadores animados, lightbox de galería
│   ├── nosotros.js     → Animaciones de timeline, contadores
│   └── catalogo.js     → Filtros, búsqueda, ordenamiento, carrito (toast)
│
└── README.md
```

---

## Páginas y secciones

### `home.html`
- Topbar de anuncio (descartable)
- Navbar sticky con efecto scroll
- **Hero Section** con imagen flotante, stats y CTAs
- **Beneficios** (4 columnas con íconos)
- **Presentación / About mini** con imágenes superpuestas
- **Productos Destacados** (4 cards con tags)
- **Galería** (grid CSS con lightbox)
- **Banner CTA** con descuento de bienvenida
- **Testimonios** (3 cards con avatar)
- Footer completo con redes sociales

### `nosotros.html`
- Page Hero con breadcrumb y ola decorativa
- **Historia** con imagen y badge de año fundación
- **Misión, Visión y Valores** (cards + íconos emoji)
- **Proceso artesanal** (timeline vertical numerado)
- **Equipo** (4 cards con hover de redes sociales)
- **Certificaciones** (badges con íconos)
- Banner CTA
- Footer

### `catalogo.html`
- Page Hero con buscador integrado
- **Sidebar de filtros**: categoría (radio), tipo (checkbox), precio (range), edad (checkbox)
- **Toolbar**: contador de resultados, ordenamiento, toggle vista grid/lista
- **Grid de 12 productos** con tags, wishlist y botón agregar
- **Filtrado dinámico** en tiempo real (sin recarga)
- **Vista lista** alternativa
- **Toast de confirmación** al agregar al carrito
- Paginación decorativa
- Footer

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| Bootstrap | 5.3.3 | Grid, componentes, utilidades |
| Bootstrap Icons | 1.11.3 | Iconografía |
| Google Fonts | – | Poppins (títulos), Nunito (cuerpo) |
| CSS Custom Properties | – | Variables de diseño (colores, sombras, etc.) |
| JavaScript Vanilla | ES6+ | Interactividad sin dependencias |

---

## Paleta de colores

| Variable | Valor | Uso |
|---|---|---|
| `--pf-primary` | `#E07B39` | Color principal (naranja cálido) |
| `--pf-primary-dark` | `#C4622A` | Hover de botones primarios |
| `--pf-secondary` | `#4A7C59` | Color secundario (verde natural) |
| `--pf-accent` | `#F2C94C` | Acento (amarillo suave) |
| `--pf-dark` | `#2B2B2B` | Texto principal |
| `--pf-light-bg` | `#FDF8F3` | Fondo crema suave |

---

## Adaptación a Laravel Blade

Para convertir esta plantilla a Blade:

1. Crear un layout maestro `layouts/app.blade.php` con el navbar y footer.
2. Cada página HTML se convierte en una vista Blade que extiende el layout.
3. Reemplazar las imágenes de Unsplash por `asset('img/...')` o variables de modelo.
4. Los textos estáticos se reemplazan por variables `{{ $variable }}` o directivas `@foreach`.
5. Los filtros del catálogo pueden conectarse a rutas de Laravel con `fetch()` o Livewire.

---

## Notas de desarrollo

- Todas las imágenes usan URLs de **Unsplash** como placeholder. Reemplazar con imágenes propias.
- Los precios están en formato COP (pesos colombianos).
- El carrito es solo visual (toast de confirmación). Conectar a backend según necesidad.
- El sitio es **100% responsive** (mobile-first con Bootstrap 5.3).
- Las animaciones de entrada usan **Intersection Observer API** (sin dependencias externas).

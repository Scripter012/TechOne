<script>
// ===== INICIO: TechOne Product Loader =====
(function() {
  const PRODUCTOS_JSON = 'productos.json';

  async function cargarProductos() {
    try {
      const resp = await fetch(PRODUCTOS_JSON);
      if (!resp.ok) throw new Error('No se pudo cargar');
      return await resp.json();
    } catch (e) {
      console.log('⚠️ No se pudo cargar productos.json, usando productos estáticos');
      return null;
    }
  }

  function crearProductCard(producto) {
    const stockBadge = producto.stock > 0
      ? `<div class="badge-sale">Stock: ${producto.stock}</div>`
      : '';

    return `
      <div class="product-card fade-up">
        <div class="product-img">${stockBadge}<img src="${producto.imagen}" onerror="tryImage(this,'${producto.imagen}')" alt="${producto.nombre}"><div class="no-img" style="display:none">🎧</div></div>
        <div class="product-info"><div class="product-cat">${producto.categoria || 'Electrónica'}</div><div class="product-name">${producto.nombre}</div><div class="product-price">$${producto.precio.toFixed(2)}</div></div>
        <button class="product-buy" onclick="openModal('${producto.nombre}', ${producto.precio}, '${producto.imagen}')">🛍️ Comprar</button>
      </div>
    `;
  }

  async function init() {
    const productos = await cargarProductos();
    if (!productos || productos.length === 0) return;

    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    // Limpiar grid existente
    grid.innerHTML = '';

    // Agregar productos del JSON
    productos.forEach(p => {
      grid.insertAdjacentHTML('beforeend', crearProductCard(p));
    });
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
// ===== FIN: TechOne Product Loader =====
</script>

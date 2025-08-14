/* ================================
   FUNCIONES JAVASCRIPT PARA LAS TARJETAS DE PRODUCTOS
   ================================ */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // INICIALIZACIÓN DE EVENTOS
    // ================================
    
    initializeProductCards();
    initializeButtons();
    initializeResponsiveDebug();
    
    console.log('🛍️ Sistema de tarjetas de productos inicializado correctamente');
});

/* ================================
   INICIALIZACIÓN DE TARJETAS
   ================================ */

function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    // Añadir eventos a cada tarjeta
    productCards.forEach((card, index) => {
        // Evento al pasar el mouse sobre la tarjeta
        card.addEventListener('mouseenter', function() {
            handleCardHover(this, true);
        });
        
        // Evento al quitar el mouse de la tarjeta
        card.addEventListener('mouseleave', function() {
            handleCardHover(this, false);
        });
        
        // Evento de click en la tarjeta (opcional)
        card.addEventListener('click', function(e) {
            // Solo si el click no es en el botón
            if (!e.target.classList.contains('add-to-cart')) {
                handleCardClick(this, index);
            }
        });
        
        // Añadir atributo de índice para identificación
        card.setAttribute('data-product-index', index);
    });
    
    console.log(`✅ ${productCards.length} tarjetas de productos inicializadas`);
}

/* ================================
   MANEJO DE EVENTOS DE TARJETAS
   ================================ */

// Función para manejar el hover en las tarjetas
function handleCardHover(card, isEntering) {
    const image = card.querySelector('.product-image img');
    const title = card.querySelector('.product-title');
    
    if (isEntering) {
        // Efectos al entrar con el mouse
        card.style.zIndex = '10';
        
        // Añadir clase para animaciones adicionales si es necesario
        card.classList.add('card-hovered');
        
        // Log para debugging
        console.log(`🎯 Hover activado en: ${title.textContent}`);
    } else {
        // Efectos al salir con el mouse
        card.style.zIndex = '1';
        card.classList.remove('card-hovered');
    }
}

// Función para manejar clicks en las tarjetas
function handleCardClick(card, index) {
    const title = card.querySelector('.product-title').textContent;
    const price = card.querySelector('.product-price').textContent;
    
    // Efecto visual de click
    card.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
    
    console.log(`🔍 Producto seleccionado: ${title} - ${price}`);
    
    // Aquí podrías añadir lógica para mostrar detalles del producto
    showProductDetails(title, price, index);
}

/* ================================
   INICIALIZACIÓN DE BOTONES
   ================================ */

function initializeButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach((button, index) => {
        // Evento click en botón de añadir al carrito
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se propague al click de la tarjeta
            handleAddToCart(this, index);
        });
        
        // Evento hover para efectos adicionales
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1.05)'; // Mantener el scale del hover del CSS
        });
    });
    
    console.log(`🛒 ${addToCartButtons.length} botones de carrito inicializados`);
}

/* ================================
   FUNCIONES DE CARRITO
   ================================ */

function handleAddToCart(button, index) {
    const card = button.closest('.product-card');
    const title = card.querySelector('.product-title').textContent;
    const price = card.querySelector('.product-price').textContent;
    
    // Efecto visual de éxito
    const originalText = button.textContent;
    const originalBackground = button.style.background;
    
    // Cambiar texto y color temporalmente
    button.textContent = '✅ ¡Añadido!';
    button.style.background = 'linear-gradient(45deg, #38a169, #2f855a)';
    button.style.transform = 'scale(1.1)';
    
    // Vibración en dispositivos móviles (si está disponible)
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    
    // Restaurar estado original después de 2 segundos
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBackground;
        button.style.transform = '';
    }, 2000);
    
    // Log del producto añadido
    console.log(`🛒 Añadido al carrito: ${title} - ${price}`);
    
    // Mostrar notificación (opcional)
    showNotification(`${title} añadido al carrito`, 'success');
}

/* ================================
   FUNCIONES DE UTILIDAD
   ================================ */

// Función para mostrar detalles del producto (ejemplo)
function showProductDetails(title, price, index) {
    // Esta función podría expandirse para mostrar un modal o más información
    const details = `
        📦 Producto: ${title}
        💰 Precio: ${price}
        🔢 Índice: ${index}
        📱 Pantalla: ${getScreenSize()}
    `;
    
    console.log('📋 Detalles del producto:\n', details);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos básicos para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '1000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#38a169' : '#3182ce'
    });
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar la notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar y eliminar la notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para obtener el tamaño de pantalla actual
function getScreenSize() {
    const width = window.innerWidth;
    
    if (width >= 1024) {
        return 'Desktop (≥1024px)';
    } else if (width >= 768) {
        return 'Tablet (768px-1023px)';
    } else {
        return 'Móvil (<768px)';
    }
}

/* ================================
   DEBUG Y DESARROLLO
   ================================ */

function initializeResponsiveDebug() {
    // Solo en modo desarrollo - comentar o eliminar en producción
    const DEBUG_MODE = false; // Cambiar a true para activar debug
    
    if (!DEBUG_MODE) return;
    
    // Mostrar información de pantalla al redimensionar
    window.addEventListener('resize', function() {
        console.log(`📱 Pantalla redimensionada: ${window.innerWidth}x${window.innerHeight} - ${getScreenSize()}`);
    });
    
    // Log inicial del tamaño de pantalla
    console.log(`📱 Tamaño inicial: ${window.innerWidth}x${window.innerHeight} - ${getScreenSize()}`);
}

// Función para filtrar productos (ejemplo para futuras mejoras)
function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const shouldShow = category === 'all' || title.includes(category.toLowerCase());
        
        card.style.display = shouldShow ? 'block' : 'none';
    });
    
    console.log(`🔍 Filtros aplicados: ${category}`);
}

// Función para ordenar productos por precio (ejemplo)
function sortProductsByPrice(ascending = true) {
    const grid = document.querySelector('.products-grid');
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    
    cards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[$,]/g, ''));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[$,]/g, ''));
        
        return ascending ? priceA - priceB : priceB - priceA;
    });
    
    // Reordenar en el DOM
    cards.forEach(card => grid.appendChild(card));
    
    console.log(`💰 Productos ordenados por precio: ${ascending ? 'Ascendente' : 'Descendente'}`);
}


window.ProductCards = {
    filterProducts,
    sortProductsByPrice,
    getScreenSize,
    showNotification
};
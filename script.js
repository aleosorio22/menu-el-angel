// Cargar el menú desde el archivo JSON
async function fetchMenuData() {
    try {
        const response = await fetch('data/menu.json');
        const data = await response.json();
        return data.menu;  // Devolver solo el array de "menu"
    } catch (error) {
        console.error('Error al cargar el menú:', error);
    }
}

// Crear los botones de categorías dinámicamente
async function createCategoryButtons() {
    const menuData = await fetchMenuData();
    const categories = [...new Set(menuData.map(item => item.categoria))];  // Extraer categorías únicas
    const menuNav = document.getElementById('menu-nav');
    menuNav.innerHTML = ''; // Limpiar botones existentes
    
    categories.forEach((category, index) => {
        const button = document.createElement('button');
        button.textContent = category || 'Sin Categoría';  // Muestra 'Sin Categoría' si está vacía
        button.classList.add('category-btn');
        if (index === 0) button.classList.add('active');
        button.addEventListener('click', () => showCategory(menuData, category));
        menuNav.appendChild(button);
    });

    // Mostrar la primera categoría por defecto
    showCategory(menuData, categories[0]);
}

// Mostrar los elementos de una categoría seleccionada
function showCategory(menuData, category) {
    const menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = ''; // Limpiar elementos existentes
    
    const filteredItems = menuData.filter(item => item.categoria === category);
    const menuItemsContainer = document.createElement('div');
    menuItemsContainer.classList.add('menu-items-container');
    
    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('menu-item', 'fade-in');
        itemElement.innerHTML = `
            <div class="menu-item-image-container">
                <img src="img/${item.imagen}" alt="${item.nombre}" class="menu-item-image">
            </div>
            <div class="menu-item-info">
                <h3 class="menu-item-name">${item.nombre}</h3>
                <p class="menu-item-description">${item.descripcion}</p>
                <p class="menu-item-price">Q${item.precio.toFixed(2)}</p>
                <button class="view-more-btn">Ver más</button>
            </div>
        `;
        menuItemsContainer.appendChild(itemElement);
        
        const viewMoreBtn = itemElement.querySelector('.view-more-btn');
        viewMoreBtn.addEventListener('click', () => showItemDetails(item));
    });
    
    menuItems.appendChild(menuItemsContainer);

    // Actualizar el botón activo
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) btn.classList.add('active');
    });
}

// Mostrar detalles de un elemento en el modal
function showItemDetails(item) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <h2>${item.nombre}</h2>
        <div style="width: 100%; max-width: 400px; aspect-ratio: 1 / 1; margin: 0 auto 1rem; overflow: hidden;">
            <img src="img/${item.imagen}" alt="${item.nombre}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <p>${item.descripcion}</p>
        <p><strong>Precio:</strong> Q${item.precio.toFixed(2)}</p>
    `;
    modal.style.display = 'block';
}

// Cerrar el modal
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal || event.target.classList.contains('close')) {
        modal.style.display = 'none';
    }
}

// Inicializar el menú
document.addEventListener('DOMContentLoaded', () => {
    createCategoryButtons();
});

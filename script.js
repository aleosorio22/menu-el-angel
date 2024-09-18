const menuData = {
    "Refacciones": [
        { name: "Desayuno Completo", description: "Huevos, frijoles, plátanos fritos y pan tostado", price: "Q45.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Desayuno", details: "Nuestro desayuno completo incluye huevos preparados a su gusto, frijoles negros cremosos, plátanos fritos dorados y pan tostado artesanal. Se sirve con café o jugo de naranja fresco." },
        { name: "Sandwich de Pollo", description: "Pollo a la parrilla con lechuga y tomate", price: "Q35.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Sandwich", details: "Delicioso sandwich de pollo a la parrilla, servido en pan ciabatta con lechuga fresca, tomate maduro y nuestra salsa especial de la casa. Acompañado de papas fritas crujientes." }
    ],
    "Pizzas": [
        { name: "Pizza Margarita", description: "Salsa de tomate, mozzarella y albahaca", price: "Q65.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Pizza+Margarita", details: "Nuestra pizza Margarita clásica está hecha con masa artesanal, salsa de tomate San Marzano, mozzarella fresca y hojas de albahaca. Horneada en horno de leña para lograr una corteza perfecta." },
        { name: "Pizza Pepperoni", description: "Salsa de tomate, mozzarella y pepperoni", price: "Q75.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Pizza+Pepperoni", details: "Pizza con generosas rodajas de pepperoni picante, queso mozzarella derretido y nuestra salsa de tomate casera. La corteza se hornea hasta quedar crujiente y dorada." }
    ],
    "Postres": [
        { name: "Tiramisú", description: "Postre italiano con café y mascarpone", price: "Q40.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Tiramisú", details: "Delicado postre italiano hecho con capas de bizcochos empapados en café, crema de mascarpone y cacao en polvo. Una combinación perfecta de sabores y texturas." },
        { name: "Cheesecake", description: "Tarta de queso con salsa de frutos rojos", price: "Q45.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Cheesecake", details: "Cremoso cheesecake horneado sobre una base de galleta graham, coronado con una salsa casera de frutos rojos. Servido frío para resaltar su textura suave." }
    ],
    "Bebidas Frías": [
        { name: "Limonada", description: "Limonada fresca con hierbabuena", price: "Q20.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Limonada", details: "Refrescante limonada hecha con limones recién exprimidos, endulzada con un toque de miel y aromatizada con hojas frescas de hierbabuena. Servida con hielo." },
        { name: "Frappé de Moka", description: "Café helado con chocolate y crema batida", price: "Q30.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Frappé", details: "Deliciosa bebida helada que combina nuestro café espresso con chocolate, leche y hielo. Mezclado hasta obtener una textura suave y coronado con crema batida y virutas de chocolate." }
    ],
    "Bebidas Calientes": [
        { name: "Café Americano", description: "Café negro recién hecho", price: "Q15.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Café+Americano", details: "Nuestro café americano se prepara con granos de alta calidad, tostados y molidos en el momento. Resulta en una taza de café suave y aromática." },
        { name: "Cappuccino", description: "Espresso con leche vaporizada y espuma", price: "Q25.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Cappuccino", details: "Clásico cappuccino italiano preparado con un shot de espresso, leche vaporizada y una generosa capa de espuma de leche. Opcionalmente espolvoreado con cacao." }
    ],
    "Pasteles": [
        { name: "Torta de Zanahoria", description: "Pastel húmedo con frosting de queso crema", price: "Q35.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Torta+Zanahoria", details: "Delicioso pastel de zanahoria hecho con ingredientes frescos, nueces y especias. Cubierto con un suave frosting de queso crema y decorado con nueces picadas." },
        { name: "Selva Negra", description: "Pastel de chocolate con cerezas y crema", price: "Q40.00", image: "https://dummyimage.com/400x400/4CAF50/ffffff.png&text=Selva+Negra", details: "Clásico pastel alemán de chocolate con capas de bizcocho de cacao, relleno de cerezas y crema chantilly. Decorado con virutas de chocolate negro." }
    ]
};

function createCategoryButtons() {
    const menuNav = document.getElementById('menu-nav');
    menuNav.innerHTML = ''; // Limpiar botones existentes
    Object.keys(menuData).forEach((category, index) => {
        const button = document.createElement('button');
        button.textContent = category;
        button.classList.add('category-btn');
        if (index === 0) button.classList.add('active');
        button.addEventListener('click', () => showCategory(category));
        menuNav.appendChild(button);
    });
}

function showCategory(category) {
    const menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = ''; // Limpiar elementos existentes
    
    const menuItemsContainer = document.createElement('div');
    menuItemsContainer.classList.add('menu-items-container');
    
    menuData[category].forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('menu-item', 'fade-in');
        itemElement.innerHTML = `
            <div class="menu-item-image-container">
                <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            </div>
            <div class="menu-item-info">
                <h3 class="menu-item-name">${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <p class="menu-item-price">${item.price}</p>
                <button class="view-more-btn">Ver más</button>
            </div>
        `;
        menuItemsContainer.appendChild(itemElement);
        
        const viewMoreBtn = itemElement.querySelector('.view-more-btn');
        viewMoreBtn.addEventListener('click', () => showItemDetails(item));
    });
    
    menuItems.appendChild(menuItemsContainer);

    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) btn.classList.add('active');
    });
}

function showItemDetails(item) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <h2>${item.name}</h2>
        <div style="width: 100%; max-width: 400px; aspect-ratio: 1 / 1; margin: 0 auto 1rem; overflow: hidden;">
            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <p>${item.details}</p>
        <p><strong>Precio:</strong> ${item.price}</p>
    `;
    modal.style.display = 'block';
}

// Close modal when clicking on the close button or outside the modal
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal || event.target.classList.contains('close')) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryButtons();
    showCategory(Object.keys(menuData)[0]);
});
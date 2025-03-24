document.addEventListener('DOMContentLoaded', function() {
    // Datos de productos (simulados)
    const products = [
        {
            id: 1,
            name: "Nike Dunk Low 'Vintage Red'",
            description: "Edición limitada 1985, en excelente estado.",
            price: 450,
            image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            name: "Adidas Superstar 'Classic White'",
            description: "Año 1991, colección original.",
            price: 320,
            image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            name: "Converse Chuck Taylor All Star '86",
            description: "Edición especial con parche original.",
            price: 280,
            image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            name: "Air Jordan 1 'Chicago'",
            description: "Reedición 1994, casi nuevo.",
            price: 1200,
            image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            name: "Reebok Classic Leather",
            description: "Año 1983, colorway original.",
            price: 350,
            image: "https://images.unsplash.com/photo-1524532787116-e70228437bbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            name: "Nike Air Force 1 'White'",
            description: "Primera edición 1982, restauradas.",
            price: 600,
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    // Variables del carrito
    let cart = [];
    const cartModal = document.querySelector('.cart-modal');
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.getElementById('total-amount');
    const productGrid = document.querySelector('.product-grid');

    // Cargar productos
    function loadProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="price">$${product.price}</span>
                        <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        // Añadir event listeners a los botones
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Añadir al carrito
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        // Verificar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        showCartNotification();
    }

    // Mostrar notificación de carrito
    function showCartNotification() {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = 'Producto añadido al carrito';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // Actualizar carrito
    function updateCart() {
        // Actualizar contador
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Actualizar items del carrito
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                    <div class="cart-item-remove" data-id="${item.id}">Eliminar</div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            
            total += item.price * item.quantity;
        });
        
        // Actualizar total
        totalAmount.textContent = total.toFixed(2);
        
        // Añadir event listeners a los botones de eliminar
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    // Eliminar del carrito
    function removeFromCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Event listeners
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Cerrar carrito al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });

    // Smooth scrolling para enlaces del menú
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Inicializar
    loadProducts();
});

// Estilos dinámicos para la notificación del carrito
const style = document.createElement('style');
style.textContent = `
    .cart-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #000;
        color: #fff;
        padding: 15px 30px;
        border-radius: 5px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1002;
    }
    
    .cart-notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(style);
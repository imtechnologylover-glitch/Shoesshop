// Product Data
const products = [
    {
        id: 1,
        name: "Air Max 90",
        price: 129.99,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        sizes: ["7", "8", "9", "10", "11"]
    },
    {
        id: 2,
        name: "Classic Leather Boots",
        price: 189.99,
        category: "boots",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
        sizes: ["8", "9", "10", "11", "12"]
    },
    {
        id: 3,
        name: "Oxford Formal Shoes",
        price: 99.99,
        category: "formal",
        image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&h=300&fit=crop",
        sizes: ["7", "8", "9", "10"]
    },
    {
        id: 4,
        name: "Running Pro",
        price: 149.99,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        sizes: ["7.5", "8.5", "9.5", "10.5"]
    },
    {
        id: 5,
        name: "Chelsea Boots",
        price: 219.99,
        category: "boots",
        image: "https://images.unsplash.com/photo-1471466897683-fd5f3571f600?w=400&h=300&fit=crop",
        sizes: ["8", "9", "10", "11"]
    },
    {
        id: 6,
        name: "Derby Shoes",
        price: 119.99,
        category: "formal",
        image: "https://images.unsplash.com/photo-1593776152736-47a051b11a7f?w=400&h=300&fit=crop",
        sizes: ["7", "8", "9", "10", "11"]
    }
];

// Cart Management
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartItems = document.getElementById('cartItems');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const closeSearch = document.getElementById('closeSearch');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize
document
// Add this to complete script.js
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupEventListeners();
});

function renderProducts(productsToShow = products) {
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-category="${product.category}" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const filtered = filter === 'all' 
                ? products 
                : products.filter(p => p.category === filter);
            renderProducts(filtered);
        });
    });

    // Cart modal
    cartIcon.addEventListener('click', () => cartModal.style.display = 'flex');
    document.getElementById('closeCart').addEventListener('click', () => cartModal.style.display = 'none');
    
    // Search
    searchBtn.addEventListener('click', () => searchOverlay.style.display = 'flex');
    closeSearch.addEventListener('click', () => searchOverlay.style.display = 'none');
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });

    // Close modals on outside click
    [cartModal, searchOverlay].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartDisplay();
    showNotification('Added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; background: #27ae60; 
        color: white; padding: 1rem 2rem; border-radius: 10px; 
        z-index: 5000; font-weight: bold; transform: translateX(400px);
        transition: transform 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) return;
    alert('Redirecting to checkout... (Payment integration needed)');
    cart = [];
    updateCartDisplay();
    cartModal.style.display = 'none';
});
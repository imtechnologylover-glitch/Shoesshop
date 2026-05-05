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

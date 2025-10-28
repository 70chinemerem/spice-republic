// ☀️ Theme Toggle
const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const mode = document.documentElement.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", mode);
    themeBtn.textContent = mode === "dark" ? "☪︎" : "☀️";
  });

  // Load saved theme preference on page load
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    themeBtn.textContent = "☪︎";
  }
}

// 📱 Mobile Menu Toggle 
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// 🔍 Search Functionality
const searchBtn = document.getElementById('search-btn');
const searchModal = document.getElementById('search-modal');
const searchClose = document.getElementById('search-close');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Menu items data for search
const menuItems = [
  { name: "Jollof Rice", category: "rice", price: 12.99, description: "A flavorful one-pot dish made with rice, tomatoes, and a blend of spices." },
  { name: "Egusi Soup", category: "soup", price: 15.20, description: "A rich and hearty soup made with melon seeds, vegetables, and meat or fish." },
  { name: "Pepper Soup", category: "soup", price: 9.99, description: "A spicy and aromatic soup made with meat or fish, perfect for warming up." },
  { name: "Banga Soup", category: "soup", price: 12.49, description: "A rich palm nut soup, often served with starch or fufu." },
  { name: "Suya", category: "meat", price: 8.99, description: "Spicy grilled meat skewers, seasoned with a special blend of spices." },
  { name: "Grilled Chicken", category: "meat", price: 10.99, description: "Tender chicken marinated in African spices and grilled to perfection." },
  { name: "Grilled Fish", category: "meat", price: 13.99, description: "Fresh fish seasoned with herbs and spices, grilled to flaky perfection." },
  { name: "Akara", category: "sides", price: 6.99, description: "Deep-fried bean cakes, crispy on the outside and soft on the inside." },
  { name: "Fried Plantain", category: "sides", price: 4.99, description: "Sweet and savory fried plantain slices, perfect as a side dish." },
  { name: "Naan Bread", category: "sides", price: 3.99, description: "Soft and fluffy flatbread, perfect for dipping into soups and stews." }
];

if (searchBtn && searchModal) {
  searchBtn.addEventListener('click', () => {
    searchModal.classList.remove('hidden');
    searchInput.focus();
  });
}

if (searchClose && searchModal) {
  searchClose.addEventListener('click', () => {
    searchModal.classList.add('hidden');
    searchInput.value = '';
    searchResults.innerHTML = '';
  });
}

// Search functionality
if (searchInput && searchResults) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    const filteredItems = menuItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );

    searchResults.innerHTML = filteredItems.map(item => `
      <div class="p-3 border-b hover:bg-gray-50 cursor-pointer" onclick="addToCartFromSearch('${item.name}', ${item.price})">
        <h4 class="font-semibold">${item.name}</h4>
        <p class="text-sm text-gray-600">${item.description}</p>
        <span class="text-yellow-500 font-bold">₦${(item.price * 1000).toLocaleString()}</span>
      </div>
    `).join('');
  });
}

// 🛒 Shopping Cart Functionality
// Cart data is stored in localStorage to persist between sessions
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Open cart sidebar
if (cartBtn && cartSidebar) {
  cartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-full');
    updateCartDisplay();
  });
}

// Close cart sidebar
if (cartClose && cartSidebar) {
  cartClose.addEventListener('click', () => {
    cartSidebar.classList.add('translate-x-full');
  });
}

// Add to cart functionality
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const name = e.target.dataset.name;
    const price = parseFloat(e.target.dataset.price);
    const image = e.target.dataset.image;

    addToCart(name, price, image);

    // Show success animation
    e.target.textContent = 'Added!';
    e.target.classList.add('bg-green-500');
    setTimeout(() => {
      e.target.textContent = 'Add to Cart';
      e.target.classList.remove('bg-green-500');
    }, 1000);
  }
});

function addToCart(name, price, image) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCartFromSearch(name, price) {
  const item = menuItems.find(item => item.name === name);
  if (item) {
    addToCart(name, price, `src/images/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`);
    searchModal.classList.add('hidden');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.classList.toggle('hidden', totalItems === 0);
}

/**
 * Updates the cart display with current items and total
 * Renders each cart item with image, name, price, quantity controls, and remove button
 * Calculates and displays the total price (price * 1000 for Nigerian Naira formatting)
 */
function updateCartDisplay() {
  // Render each cart item with quantity controls
  cartItems.innerHTML = cart.map(item => `
    <div class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
      <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
      <div class="flex-1">
        <h4 class="font-semibold">${item.name}</h4>
        <p class="text-sm text-gray-600">₦${(item.price * 1000).toLocaleString()}</p>
      </div>
      <div class="flex items-center space-x-2">
        <button onclick="updateQuantity('${item.name}', -1)" class="bg-gray-200 px-2 py-1 rounded">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity('${item.name}', 1)" class="bg-gray-200 px-2 py-1 rounded">+</button>
        <button onclick="removeFromCart('${item.name}')" class="text-red-500 ml-2">✕</button>
      </div>
    </div>
  `).join('');

  // Calculate total: sum of (price * quantity) for all items, then multiply by 1000 for Naira formatting
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `₦${(total * 1000).toLocaleString()}`;
}

function updateQuantity(name, change) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();
    }
  }
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
}

// Checkout functionality
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order! Total: ₦${(total * 1000).toLocaleString()}\n\nThis is a demo - no actual payment will be processed.`);

    // Clear cart after checkout
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    cartSidebar.classList.add('translate-x-full');
  });
}

// 🏷️ Category Filter Functionality
const categoryFilters = document.querySelectorAll('.category-filter');
const menuItemsElements = document.querySelectorAll('.menu-item');

categoryFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    // Update active filter
    categoryFilters.forEach(f => {
      f.classList.remove('active', 'bg-yellow-500', 'text-white');
      f.classList.add('bg-gray-200', 'text-gray-700');
    });
    filter.classList.add('active', 'bg-yellow-500', 'text-white');
    filter.classList.remove('bg-gray-200', 'text-gray-700');

    // Filter menu items
    const category = filter.dataset.category;
    menuItemsElements.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.3s ease-in';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// 📧 Newsletter Signup
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterMessage = document.getElementById('newsletter-message');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterEmail.value;

    // Simple email validation
    if (email && email.includes('@')) {
      newsletterMessage.textContent = 'Thank you for subscribing!';
      newsletterMessage.className = 'mt-4 text-sm text-green-600';
      newsletterEmail.value = '';

      // Store subscription (in a real app, this would be sent to a server)
      localStorage.setItem('newsletterSubscribed', 'true');
    } else {
      newsletterMessage.textContent = 'Please enter a valid email address.';
      newsletterMessage.className = 'mt-4 text-sm text-red-600';
    }
  });
}

// Initialize cart count on page load
updateCartCount();

// 👤 User Session Management
function checkUserSession() {
  const currentUser = localStorage.getItem('currentUser');
  const signinLink = document.getElementById('signin-link');
  const signupLink = document.getElementById('signup-link');
  const userMenu = document.getElementById('user-menu');
  const userName = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logout-btn');

  if (currentUser && signinLink && signupLink && userMenu && userName && logoutBtn) {
    const user = JSON.parse(currentUser);

    // Hide sign in/up links
    signinLink.style.display = 'none';
    signupLink.style.display = 'none';

    // Show user menu
    userMenu.classList.remove('hidden');
    userMenu.classList.add('flex');
    userName.textContent = `Hi, ${user.name}`;

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('rememberUser');
      alert('You have been logged out.');
      location.reload();
    });
  }
}

// Check user session on page load
checkUserSession();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .menu-item {
    animation: fadeIn 0.3s ease-in;
  }
`;
document.head.appendChild(style);
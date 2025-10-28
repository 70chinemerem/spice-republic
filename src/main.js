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
const searchClear = document.getElementById('search-clear');

// Menu items data for search
const menuItems = [
  // Rice Dishes
  { name: "Jollof Rice", category: "rice", price: 12.99, description: "A flavorful one-pot dish made with rice, tomatoes, and a blend of spices." },
  { name: "Coconut Rice", category: "rice", price: 11.99, description: "Fragrant basmati rice cooked in coconut milk with aromatic spices." },
  { name: "Fried Rice", category: "rice", price: 10.99, description: "Colorful rice stir-fried with vegetables, eggs, and choice of protein." },
  { name: "Rice and Stew", category: "rice", price: 9.99, description: "White rice served with rich tomato-based stew and choice of meat." },
  { name: "Ofada Rice", category: "rice", price: 13.99, description: "Local Nigerian rice served with spicy palm oil sauce and assorted meat." },
  { name: "Bisi Bele Bath", category: "rice", price: 12.49, description: "Spicy rice dish with lentils, vegetables, and aromatic spices." },
  { name: "Rice and Beans", category: "rice", price: 8.99, description: "Nutritious combination of rice and beans cooked together." },

  // Soups & Stews
  { name: "Egusi Soup", category: "soup", price: 15.20, description: "A rich and hearty soup made with melon seeds, vegetables, and meat or fish." },
  { name: "Pepper Soup", category: "soup", price: 9.99, description: "A spicy and aromatic soup made with meat or fish, perfect for warming up." },
  { name: "Banga Soup", category: "soup", price: 12.49, description: "A rich palm nut soup, often served with starch or fufu." },
  { name: "Okra Soup", category: "soup", price: 11.99, description: "Traditional soup made with fresh okra, meat, and fish." },
  { name: "Bitterleaf Soup", category: "soup", price: 13.99, description: "Nutritious soup made with bitterleaf vegetables and assorted meat." },
  { name: "Ogbono Soup", category: "soup", price: 14.99, description: "Thick soup made with ogbono seeds, vegetables, and meat." },
  { name: "Vegetable Soup", category: "soup", price: 10.99, description: "Fresh vegetables cooked in flavorful broth with choice of protein." },
  { name: "Fish Stew", category: "soup", price: 13.49, description: "Rich tomato-based stew with fresh fish and vegetables." },
  { name: "Goat Meat Soup", category: "soup", price: 14.99, description: "Hearty soup made with tender goat meat and traditional spices." },
  { name: "Chicken Stew", category: "soup", price: 12.99, description: "Flavorful stew made with chicken, tomatoes, and aromatic spices." },

  // Meat & Grilled
  { name: "Suya", category: "meat", price: 8.99, description: "Spicy grilled meat skewers, seasoned with a special blend of spices." },
  { name: "Grilled Chicken", category: "meat", price: 10.99, description: "Tender chicken marinated in African spices and grilled to perfection." },
  { name: "Grilled Fish", category: "meat", price: 13.99, description: "Fresh fish seasoned with herbs and spices, grilled to flaky perfection." },
  { name: "Asun", category: "meat", price: 12.99, description: "Spicy roasted goat meat with peppers and onions." },
  { name: "Grilled Lamb", category: "meat", price: 15.99, description: "Tender lamb chops marinated in African spices and grilled." },
  { name: "Peppered Snail", category: "meat", price: 9.99, description: "Tender snails cooked in spicy pepper sauce." },
  { name: "Grilled Prawns", category: "meat", price: 16.99, description: "Fresh prawns marinated in spices and grilled to perfection." },
  { name: "Fried Fish", category: "meat", price: 12.99, description: "Crispy fried fish seasoned with African spices." },
  { name: "Grilled Turkey", category: "meat", price: 14.99, description: "Tender turkey breast marinated and grilled with herbs." },
  { name: "Peppered Beef", category: "meat", price: 11.99, description: "Tender beef cooked in spicy pepper sauce." },
  { name: "Grilled Tilapia", category: "meat", price: 13.49, description: "Fresh tilapia fish grilled with lemon and herbs." },

  // Sides & Snacks
  { name: "Akara", category: "sides", price: 6.99, description: "Deep-fried bean cakes, crispy on the outside and soft on the inside." },
  { name: "Fried Plantain", category: "sides", price: 4.99, description: "Sweet and savory fried plantain slices, perfect as a side dish." },
  { name: "Naan Bread", category: "sides", price: 3.99, description: "Soft and fluffy flatbread, perfect for dipping into soups and stews." },
  { name: "Puff Puff", category: "sides", price: 5.99, description: "Sweet deep-fried dough balls, perfect as a snack or dessert." },
  { name: "Buns", category: "sides", price: 4.99, description: "Soft, sweet bread rolls perfect for breakfast or snacks." },
  { name: "Chin Chin", category: "sides", price: 6.99, description: "Crispy fried pastry snacks, sweet and crunchy." },
  { name: "Boli", category: "sides", price: 7.99, description: "Roasted plantain served with spicy pepper sauce." },

  // Beverages
  { name: "Fresh Coconut Water", category: "beverages", price: 4.99, description: "Refreshing natural coconut water straight from the shell." },
  { name: "Tiger Nut Drink", category: "beverages", price: 5.99, description: "Creamy and nutritious drink made from tiger nuts." },
  { name: "Zobo", category: "beverages", price: 4.99, description: "Refreshing hibiscus drink with ginger and spices." },
  { name: "Fresh Orange Juice", category: "beverages", price: 3.99, description: "Freshly squeezed orange juice, pure and natural." }
];

if (searchBtn && searchModal) {
  searchBtn.addEventListener('click', () => {
    searchModal.classList.remove('hidden');
    searchInput.focus();
  });
}

if (searchClose && searchModal) {
  searchClose.addEventListener('click', () => {
    closeSearchModal();
  });
}

// Clear search functionality
if (searchClear && searchInput) {
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    showSearchSuggestions();
  });
}

/**
 * Closes the search modal and clears all data
 */
function closeSearchModal() {
  searchModal.classList.add('hidden');
  searchInput.value = '';
  searchResults.innerHTML = '';
  selectedSearchIndex = -1;
}

// 🔍 Enhanced Search Functionality
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
let selectedSearchIndex = -1;

if (searchInput && searchResults) {
  // Show search suggestions on focus
  searchInput.addEventListener('focus', () => {
    showSearchSuggestions();
  });

  // Enhanced search with real-time filtering
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();

    if (query.length === 0) {
      showSearchSuggestions();
      return;
    }

    if (query.length < 2) {
      searchResults.innerHTML = '<div class="p-3 text-gray-500 text-center">Type at least 2 characters to search...</div>';
      return;
    }

    performSearch(query);
  });

  // Keyboard navigation for search results
  searchInput.addEventListener('keydown', (e) => {
    const searchItems = searchResults.querySelectorAll('.search-result-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedSearchIndex = Math.min(selectedSearchIndex + 1, searchItems.length - 1);
      updateSearchSelection(searchItems);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedSearchIndex = Math.max(selectedSearchIndex - 1, -1);
      updateSearchSelection(searchItems);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSearchIndex >= 0 && searchItems[selectedSearchIndex]) {
        searchItems[selectedSearchIndex].click();
      }
    } else if (e.key === 'Escape') {
      closeSearchModal();
    }
  });
}

/**
 * Performs advanced search with highlighting and categories
 */
function performSearch(query) {
  const filteredItems = menuItems.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(query.toLowerCase());
    const descMatch = item.description.toLowerCase().includes(query.toLowerCase());
    const categoryMatch = item.category.toLowerCase().includes(query.toLowerCase());
    return nameMatch || descMatch || categoryMatch;
  });

  if (filteredItems.length === 0) {
    searchResults.innerHTML = `
      <div class="p-3 text-center text-gray-500">
        <div class="text-4xl mb-2">🔍</div>
        <p>No items found for "${query}"</p>
        <p class="text-sm mt-2">Try searching for different keywords</p>
      </div>
    `;
    return;
  }

  // Group results by category
  const groupedResults = filteredItems.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {});

  // Render grouped results with highlighting
  searchResults.innerHTML = Object.entries(groupedResults).map(([category, items]) => `
    <div class="mb-4">
      <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 px-3">${category}</h3>
      ${items.map(item => `
        <div class="search-result-item p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors" 
             onclick="addToCartFromSearch('${item.name}', ${item.price})">
          <h4 class="font-semibold">${highlightText(item.name, query)}</h4>
          <p class="text-sm text-gray-600">${highlightText(item.description, query)}</p>
          <div class="flex justify-between items-center mt-2">
            <span class="text-yellow-500 font-bold">₦${(item.price * 1000).toLocaleString()}</span>
            <span class="text-xs bg-gray-200 px-2 py-1 rounded-full">${item.category}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');

  // Add to search history
  addToSearchHistory(query);
  selectedSearchIndex = -1;
}

/**
 * Shows search suggestions based on history and popular items
 */
function showSearchSuggestions() {
  if (searchHistory.length === 0) {
    searchResults.innerHTML = `
      <div class="p-3 text-center text-gray-500">
        <div class="text-4xl mb-2">🍽️</div>
        <p>Search for your favorite dishes</p>
        <p class="text-sm mt-2">Try: "jollof", "soup", "grilled", "spicy"</p>
      </div>
    `;
    return;
  }

  const recentSearches = searchHistory.slice(-5).reverse();
  const popularItems = menuItems.slice(0, 3);

  searchResults.innerHTML = `
    <div class="mb-4">
      <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 px-3">Recent Searches</h3>
      ${recentSearches.map(term => `
        <div class="search-suggestion p-3 border-b hover:bg-gray-50 cursor-pointer" 
             onclick="searchForTerm('${term}')">
          <div class="flex items-center">
            <span class="text-gray-400 mr-2">🕒</span>
            <span>${term}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div>
      <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 px-3">Popular Items</h3>
      ${popularItems.map(item => `
        <div class="search-suggestion p-3 border-b hover:bg-gray-50 cursor-pointer" 
             onclick="addToCartFromSearch('${item.name}', ${item.price})">
          <div class="flex items-center justify-between">
            <span>${item.name}</span>
            <span class="text-yellow-500 font-bold text-sm">₦${(item.price * 1000).toLocaleString()}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Highlights matching text in search results
 */
function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

/**
 * Adds search term to history
 */
function addToSearchHistory(term) {
  if (term && !searchHistory.includes(term)) {
    searchHistory.unshift(term);
    searchHistory = searchHistory.slice(0, 10); // Keep only last 10 searches
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
}

/**
 * Searches for a specific term
 */
function searchForTerm(term) {
  searchInput.value = term;
  performSearch(term);
}

/**
 * Updates visual selection for keyboard navigation
 */
function updateSearchSelection(searchItems) {
  searchItems.forEach((item, index) => {
    if (index === selectedSearchIndex) {
      item.classList.add('bg-yellow-100', 'border-l-4', 'border-yellow-500');
    } else {
      item.classList.remove('bg-yellow-100', 'border-l-4', 'border-yellow-500');
    }
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

/**
 * Adds item to cart from search results with correct image path
 * Maps item names to their corresponding asset file paths
 */
function addToCartFromSearch(name, price) {
  const item = menuItems.find(item => item.name === name);
  if (item) {
    // Map item names to their correct asset file paths
    const imageMap = {
      // Rice Dishes
      'Jollof Rice': 'src/assets/jellof.webp',
      'Coconut Rice': 'src/assets/jellof.webp', // Using jollof as placeholder
      'Fried Rice': 'src/assets/jellof.webp', // Using jollof as placeholder
      'Rice and Stew': 'src/assets/jellof.webp', // Using jellof as placeholder

      // Soups & Stews
      'Egusi Soup': 'src/assets/egusi.webp',
      'Pepper Soup': 'src/assets/pepper-soup.jpeg',
      'Banga Soup': 'src/assets/banga.webp',
      'Okra Soup': 'src/assets/egusi.webp', // Using egusi as placeholder
      'Bitterleaf Soup': 'src/assets/egusi.webp', // Using egusi as placeholder
      'Ogbono Soup': 'src/assets/egusi.webp', // Using egusi as placeholder

      // Meat & Grilled
      'Suya': 'src/assets/suya.jpeg',
      'Grilled Chicken': 'src/assets/chiken.jpeg',
      'Grilled Fish': 'src/assets/grilled fish.jpeg',
      'Asun': 'src/assets/suya.jpeg', // Using suya as placeholder
      'Grilled Lamb': 'src/assets/chiken.jpeg', // Using chicken as placeholder
      'Peppered Snail': 'src/assets/suya.jpeg', // Using suya as placeholder

      // Sides & Snacks
      'Akara': 'src/assets/akara.jpeg',
      'Fried Plantain': 'src/assets/plantain.jpeg',
      'Naan Bread': 'src/assets/naan bread.jpeg',
      'Puff Puff': 'src/assets/akara.jpeg', // Using akara as placeholder
      'Buns': 'src/assets/naan bread.jpeg', // Using naan as placeholder
      'Chin Chin': 'src/assets/akara.jpeg', // Using akara as placeholder
      'Boli': 'src/assets/plantain.jpeg', // Using plantain as placeholder

      // Beverages
      'Fresh Coconut Water': 'src/assets/jellof.webp', // Using jollof as placeholder
      'Tiger Nut Drink': 'src/assets/jellof.webp', // Using jollof as placeholder
      'Zobo': 'src/assets/jellof.webp', // Using jollof as placeholder
      'Fresh Orange Juice': 'src/assets/jellof.webp' // Using jollof as placeholder
    };

    const imagePath = imageMap[name] || 'src/assets/jellof.webp'; // fallback image
    addToCart(name, price, imagePath);
    closeSearchModal();
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
 * Shows empty cart state when no items are present
 * Calculates and displays the total price (price * 1000 for Nigerian Naira formatting)
 */
function updateCartDisplay() {
  // Show empty cart state if no items
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="text-center py-12">
        <div class="text-6xl mb-4">🛒</div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
        <p class="text-gray-500 mb-6">Add some delicious African dishes to get started!</p>
        <button onclick="document.getElementById('cart-sidebar').classList.add('translate-x-full')" 
                class="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
          Browse Menu
        </button>
      </div>
    `;
    cartTotal.textContent = '₦0';
    return;
  }

  // Render each cart item with quantity controls and animations
  cartItems.innerHTML = cart.map(item => `
    <div class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg cart-item-animation">
      <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded" 
           onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNCAyOEMyNi4yMDkxIDI4IDI4IDI2LjIwOTEgMjggMjRDMjggMjEuNzkwOSAyNi4yMDkxIDIwIDI0IDIwQzIxLjc5MDkgMjAgMjAgMjEuNzkwOSAyMCAyNEMyMCAyNi4yMDkxIDIxLjc5MDkgMjggMjQgMjhaIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo='">
      <div class="flex-1">
        <h4 class="font-semibold">${item.name}</h4>
        <p class="text-sm text-gray-600">₦${(item.price * 1000).toLocaleString()}</p>
      </div>
      <div class="flex items-center space-x-2">
        <button onclick="updateQuantity('${item.name}', -1)" 
                class="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition">-</button>
        <span class="min-w-[20px] text-center">${item.quantity}</span>
        <button onclick="updateQuantity('${item.name}', 1)" 
                class="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition">+</button>
        <button onclick="removeFromCart('${item.name}')" 
                class="text-red-500 ml-2 hover:text-red-700 transition">✕</button>
      </div>
    </div>
  `).join('');

  // Calculate total: sum of (price * quantity) for all items, then multiply by 1000 for Naira formatting
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `₦${(total * 1000).toLocaleString()}`;
}

/**
 * Updates item quantity in cart with validation
 * Prevents negative quantities and removes item if quantity reaches zero
 * Provides visual feedback for quantity changes
 */
function updateQuantity(name, change) {
  const item = cart.find(item => item.name === name);
  if (item) {
    const newQuantity = item.quantity + change;

    // Prevent negative quantities
    if (newQuantity <= 0) {
      removeFromCart(name);
      return;
    }

    // Limit maximum quantity to prevent abuse (optional)
    if (newQuantity > 99) {
      alert('Maximum quantity per item is 99');
      return;
    }

    item.quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();

    // Show success feedback for quantity changes
    showQuantityFeedback(name, newQuantity);
  }
}

/**
 * Shows visual feedback when quantity is updated
 * Creates a temporary notification for better user experience
 */
function showQuantityFeedback(itemName, quantity) {
  // Create temporary feedback element
  const feedback = document.createElement('div');
  feedback.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
  feedback.textContent = `${itemName}: ${quantity}`;

  document.body.appendChild(feedback);

  // Remove feedback after 1.5 seconds
  setTimeout(() => {
    feedback.style.opacity = '0';
    feedback.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      document.body.removeChild(feedback);
    }, 300);
  }, 1500);
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
}

// Checkout functionality with order confirmation modal
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    showOrderConfirmation();
  });
}

/**
 * Shows order confirmation modal with detailed order summary
 * Provides better user experience than simple alert
 */
function showOrderConfirmation() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div class="text-center mb-6">
        <div class="text-6xl mb-4">✅</div>
        <h2 class="text-2xl font-bold text-green-600 mb-2">Order Confirmed!</h2>
        <p class="text-gray-600">Order #${orderNumber}</p>
      </div>
      
      <div class="border-t pt-4 mb-6">
        <h3 class="font-semibold mb-3">Order Summary:</h3>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          ${cart.map(item => `
            <div class="flex justify-between text-sm">
              <span>${item.name} x${item.quantity}</span>
              <span>₦${(item.price * item.quantity * 1000).toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
        <div class="border-t mt-3 pt-3 flex justify-between font-semibold">
          <span>Total:</span>
          <span class="text-yellow-500">₦${(total * 1000).toLocaleString()}</span>
        </div>
      </div>
      
      <div class="text-center text-sm text-gray-500 mb-4">
        This is a demo - no actual payment will be processed.
      </div>
      
      <button onclick="completeOrder()" 
              class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
        Continue Shopping
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      completeOrder();
    }
  });
}

/**
 * Completes the order process and clears the cart
 */
function completeOrder() {
  // Remove modal
  const modal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
  if (modal) {
    document.body.removeChild(modal);
  }

  // Clear cart after checkout
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
  cartSidebar.classList.add('translate-x-full');
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
  const signupLink = document.getElementById('signup-link');
  const userMenu = document.getElementById('user-menu');
  const userName = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logout-btn');

  if (currentUser && signupLink && userMenu && userName && logoutBtn) {
    const user = JSON.parse(currentUser);

    // Hide sign in link
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

// ⌨️ Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  // ESC key closes cart sidebar
  if (e.key === 'Escape') {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && !cartSidebar.classList.contains('translate-x-full')) {
      cartSidebar.classList.add('translate-x-full');
    }

    // ESC key also closes search modal
    const searchModal = document.getElementById('search-modal');
    if (searchModal && !searchModal.classList.contains('hidden')) {
      closeSearchModal();
    }

    // ESC key closes order confirmation modal
    const modal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
    if (modal) {
      completeOrder();
    }
  }

  // Ctrl/Cmd + K opens search modal
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchModal = document.getElementById('search-modal');
    if (searchModal) {
      searchModal.classList.remove('hidden');
      searchInput.focus();
    }
  }
});

// Add enhanced CSS animations and styles
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0, -8px, 0); }
    70% { transform: translate3d(0, -4px, 0); }
    90% { transform: translate3d(0, -2px, 0); }
  }
  
  .menu-item {
    animation: fadeIn 0.3s ease-in;
  }
  
  .cart-item-animation {
    animation: slideInRight 0.3s ease-out;
  }
  
  .cart-item-animation:hover {
    transform: translateX(4px);
    transition: transform 0.2s ease;
  }
  
  /* Smooth scrollbar styling for cart */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  /* Loading animation for buttons */
  .loading {
    position: relative;
    color: transparent;
  }
  
  .loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
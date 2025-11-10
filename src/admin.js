// Admin Dashboard Functionality
(function () {
    // Check authentication
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'sign-in.html';
        return;
    }

    const user = JSON.parse(currentUser);

    // Redirect non-admin users
    if (user.role !== 'admin') {
        window.location.href = 'customer-dashboard.html';
        return;
    }

    // Admin session verified - user name displayed in welcome section

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update button states
            tabButtons.forEach(b => {
                b.classList.remove('active', 'text-yellow-600', 'border-yellow-600');
                b.classList.add('text-gray-500', 'border-transparent');
            });
            btn.classList.add('active', 'text-yellow-600', 'border-yellow-600');
            btn.classList.remove('text-gray-500', 'border-transparent');

            // Update content visibility
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(`${targetTab}-tab`).classList.remove('hidden');
        });
    });

    // Load dashboard stats
    function loadDashboardStats() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');

        document.getElementById('total-users').textContent = users.length;
        document.getElementById('total-orders').textContent = orders.length;

        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
        document.getElementById('total-revenue').textContent = `₦${(totalRevenue * 1000).toLocaleString()}`;

        document.getElementById('total-menu-items').textContent = menuItems.length || 0;
    }

    // Load orders
    function loadOrders() {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const ordersList = document.getElementById('orders-list');

        if (orders.length === 0) {
            ordersList.innerHTML = '<p class="text-center text-gray-500 py-8">No orders yet</p>';
            return;
        }

        ordersList.innerHTML = orders.map(order => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="font-semibold text-lg">Order #${order.id}</h3>
                        <p class="text-sm text-gray-600">Customer: ${order.customerName || order.userEmail}</p>
                        <p class="text-sm text-gray-600">Date: ${new Date(order.date).toLocaleString()}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-yellow-600">₦${(parseFloat(order.total) * 1000).toLocaleString()}</p>
                        <select class="order-status mt-2 text-xs px-2 py-1 rounded border" data-order-id="${order.id}">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </div>
                </div>
                <div class="mt-2">
                    <p class="text-sm text-gray-600">${order.items.length} item(s)</p>
                    <ul class="text-xs text-gray-500 mt-1">
                        ${order.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        // Add event listeners for status changes
        document.querySelectorAll('.order-status').forEach(select => {
            select.addEventListener('change', (e) => {
                const orderId = e.target.dataset.orderId;
                const newStatus = e.target.value;
                updateOrderStatus(orderId, newStatus);
            });
        });
    }

    // Update order status
    function updateOrderStatus(orderId, newStatus) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderIndex = orders.findIndex(o => o.id === orderId);

        if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus;
            localStorage.setItem('orders', JSON.stringify(orders));
            loadOrders();
            loadDashboardStats();
        }
    }

    // Load users
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const usersList = document.getElementById('users-list');

        if (users.length === 0) {
            usersList.innerHTML = '<p class="text-center text-gray-500 py-8">No users yet</p>';
            return;
        }

        usersList.innerHTML = users.map(user => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="font-semibold">${user.name}</h3>
                        <p class="text-sm text-gray-600">${user.email}</p>
                        <span class="text-xs px-2 py-1 rounded mt-1 inline-block ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">${user.role || 'customer'}</span>
                    </div>
                    <div class="flex space-x-2">
                        <button class="edit-user-btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm" data-user-id="${user.email}">
                            Edit
                        </button>
                        ${user.email !== JSON.parse(localStorage.getItem('currentUser')).email ? `
                            <button class="delete-user-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm" data-user-id="${user.email}">
                                Delete
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners
        document.querySelectorAll('.edit-user-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.dataset.userId;
                editUser(userId);
            });
        });

        document.querySelectorAll('.delete-user-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.dataset.userId;
                if (confirm('Are you sure you want to delete this user?')) {
                    deleteUser(userId);
                }
            });
        });
    }

    // Load menu items
    function loadMenuItems() {
        // Get menu items from localStorage, or use empty array if not found
        // Note: In a real app, menu items would be synced from main.js or a database
        let menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');

        // If no menu items in localStorage, initialize with empty array
        // Menu items can be added through the admin panel
        const menuList = document.getElementById('menu-items-list');

        if (menuItems.length === 0) {
            menuList.innerHTML = '<p class="text-center text-gray-500 py-8 col-span-full">No menu items yet</p>';
            return;
        }

        menuList.innerHTML = menuItems.map(item => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <h3 class="font-semibold">${item.name}</h3>
                <p class="text-sm text-gray-600 mt-1">${item.description}</p>
                <div class="flex justify-between items-center mt-2">
                    <span class="font-bold text-yellow-600">₦${(item.price * 1000).toLocaleString()}</span>
                    <div class="flex space-x-2">
                        <button class="edit-menu-btn bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition text-xs" data-item-id="${item.name}">
                            Edit
                        </button>
                        <button class="delete-menu-btn bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition text-xs" data-item-id="${item.name}">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners
        document.querySelectorAll('.edit-menu-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.dataset.itemId;
                editMenuItem(itemId);
            });
        });

        document.querySelectorAll('.delete-menu-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.dataset.itemId;
                if (confirm('Are you sure you want to delete this menu item?')) {
                    deleteMenuItem(itemId);
                }
            });
        });
    }

    // User modal functions
    const userModal = document.getElementById('user-modal');
    const userForm = document.getElementById('user-form');
    const addUserBtn = document.getElementById('add-user-btn');
    const cancelUserBtn = document.getElementById('cancel-user-btn');

    addUserBtn.addEventListener('click', () => {
        document.getElementById('user-modal-title').textContent = 'Add User';
        userForm.reset();
        document.getElementById('user-id').value = '';
        document.getElementById('user-email-input').readOnly = false;
        userModal.classList.remove('hidden');
    });

    cancelUserBtn.addEventListener('click', () => {
        userModal.classList.add('hidden');
    });

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userId = document.getElementById('user-id').value;

        const userData = {
            name: document.getElementById('user-name-input').value,
            email: document.getElementById('user-email-input').value.toLowerCase(),
            password: document.getElementById('user-password-input').value || null,
            role: document.getElementById('user-role-input').value,
            createdAt: new Date().toISOString()
        };

        if (userId) {
            // Edit existing user
            const userIndex = users.findIndex(u => u.email === userId);
            if (userIndex !== -1) {
                if (userData.password) {
                    users[userIndex].password = userData.password;
                }
                users[userIndex].name = userData.name;
                users[userIndex].role = userData.role;
            }
        } else {
            // Add new user
            if (!userData.password) {
                alert('Password is required for new users');
                return;
            }
            users.push(userData);
        }

        localStorage.setItem('users', JSON.stringify(users));
        userModal.classList.add('hidden');
        loadUsers();
        loadDashboardStats();
    });

    function editUser(userEmail) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === userEmail);

        if (user) {
            document.getElementById('user-modal-title').textContent = 'Edit User';
            document.getElementById('user-id').value = userEmail;
            document.getElementById('user-name-input').value = user.name;
            document.getElementById('user-email-input').value = user.email;
            document.getElementById('user-email-input').readOnly = true;
            document.getElementById('user-password-input').value = '';
            document.getElementById('user-role-input').value = user.role || 'customer';
            userModal.classList.remove('hidden');
        }
    }

    function deleteUser(userEmail) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const filteredUsers = users.filter(u => u.email !== userEmail);
        localStorage.setItem('users', JSON.stringify(filteredUsers));
        loadUsers();
        loadDashboardStats();
    }

    // Menu modal functions
    const menuModal = document.getElementById('menu-modal');
    const menuForm = document.getElementById('menu-form');
    const addMenuItemBtn = document.getElementById('add-menu-item-btn');
    const cancelMenuBtn = document.getElementById('cancel-menu-btn');

    addMenuItemBtn.addEventListener('click', () => {
        document.getElementById('menu-modal-title').textContent = 'Add Menu Item';
        menuForm.reset();
        document.getElementById('menu-item-id').value = '';
        menuModal.classList.remove('hidden');
    });

    cancelMenuBtn.addEventListener('click', () => {
        menuModal.classList.add('hidden');
    });

    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
        const itemId = document.getElementById('menu-item-id').value;

        const itemData = {
            name: document.getElementById('menu-name-input').value,
            category: document.getElementById('menu-category-input').value,
            price: parseFloat(document.getElementById('menu-price-input').value),
            description: document.getElementById('menu-description-input').value,
            image: document.getElementById('menu-image-input').value || 'src/assets/jellof.webp'
        };

        if (itemId) {
            // Edit existing item
            const itemIndex = menuItems.findIndex(m => m.name === itemId);
            if (itemIndex !== -1) {
                menuItems[itemIndex] = { ...menuItems[itemIndex], ...itemData };
            }
        } else {
            // Add new item
            menuItems.push(itemData);
        }

        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        menuModal.classList.add('hidden');
        loadMenuItems();
        loadDashboardStats();
    });

    function editMenuItem(itemName) {
        const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
        const item = menuItems.find(m => m.name === itemName);

        if (item) {
            document.getElementById('menu-modal-title').textContent = 'Edit Menu Item';
            document.getElementById('menu-item-id').value = itemName;
            document.getElementById('menu-name-input').value = item.name;
            document.getElementById('menu-category-input').value = item.category;
            document.getElementById('menu-price-input').value = item.price;
            document.getElementById('menu-description-input').value = item.description;
            document.getElementById('menu-image-input').value = item.image || '';
            menuModal.classList.remove('hidden');
        }
    }

    function deleteMenuItem(itemName) {
        const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
        const filteredItems = menuItems.filter(m => m.name !== itemName);
        localStorage.setItem('menuItems', JSON.stringify(filteredItems));
        loadMenuItems();
        loadDashboardStats();
    }

    // Refresh orders
    document.getElementById('refresh-orders').addEventListener('click', () => {
        loadOrders();
        loadDashboardStats();
    });

    // Clear all data
    document.getElementById('clear-all-data').addEventListener('click', () => {
        if (confirm('Are you absolutely sure? This will delete ALL data including users, orders, and menu items. This cannot be undone!')) {
            localStorage.removeItem('users');
            localStorage.removeItem('orders');
            localStorage.removeItem('menuItems');
            localStorage.removeItem('cart');

            // Reinitialize default admin
            const defaultUsers = [{
                name: 'Admin User',
                email: 'admin@spicerepublic.com',
                password: 'admin123',
                role: 'admin',
                createdAt: new Date().toISOString()
            }];
            localStorage.setItem('users', JSON.stringify(defaultUsers));

            alert('All data cleared. Default admin account restored.');
            loadUsers();
            loadOrders();
            loadMenuItems();
            loadDashboardStats();
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'sign-in.html';
    });

    // Close modals on outside click
    userModal.addEventListener('click', (e) => {
        if (e.target === userModal) {
            userModal.classList.add('hidden');
        }
    });

    menuModal.addEventListener('click', (e) => {
        if (e.target === menuModal) {
            menuModal.classList.add('hidden');
        }
    });

    // Initialize
    loadDashboardStats();
    loadOrders();
    loadUsers();
    loadMenuItems();
})();


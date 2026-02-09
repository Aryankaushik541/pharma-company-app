const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data file path
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const MEDICINES_FILE = path.join(DATA_DIR, 'medicines.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const REPORTS_FILE = path.join(DATA_DIR, 'reports.json');

// Create data directory if not exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files
const initializeDataFiles = () => {
  // Users data
  if (!fs.existsSync(USERS_FILE)) {
    const users = [
      {
        id: '1',
        email: 'admin@pharma.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        phone: '+91-9876543210',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'ceo@pharma.com',
        password: 'ceo123',
        role: 'ceo',
        name: 'CEO',
        phone: '+91-9876543211',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        email: 'manager@pharma.com',
        password: 'manager123',
        role: 'manager',
        name: 'Manager',
        phone: '+91-9876543212',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        email: 'abm@pharma.com',
        password: 'abm123',
        role: 'abm',
        name: 'ABM User',
        phone: '+91-9876543213',
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        email: 'zbm@pharma.com',
        password: 'zbm123',
        role: 'zbm',
        name: 'ZBM User',
        phone: '+91-9876543214',
        createdAt: new Date().toISOString()
      },
      {
        id: '6',
        email: 'dm@pharma.com',
        password: 'dm123',
        role: 'district_manager',
        name: 'District Manager',
        phone: '+91-9876543215',
        createdAt: new Date().toISOString()
      },
      {
        id: '7',
        email: 'mr@pharma.com',
        password: 'mr123',
        role: 'mr',
        name: 'MR User',
        phone: '+91-9876543216',
        createdAt: new Date().toISOString()
      },
      {
        id: '8',
        email: 'dev@pharma.com',
        password: 'dev123',
        role: 'developer',
        name: 'Developer',
        phone: '+91-9876543217',
        createdAt: new Date().toISOString()
      },
      {
        id: '9',
        email: 'customer@pharma.com',
        password: 'customer123',
        role: 'customer',
        name: 'Customer User',
        phone: '+91-9876543218',
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  }

  // Medicines data
  if (!fs.existsSync(MEDICINES_FILE)) {
    const medicines = [
      {
        id: '1',
        name: 'Paracetamol',
        category: 'Pain Relief',
        price: '50',
        stock: '500',
        manufacturer: 'ABC Pharma',
        expiryDate: '2025-12-31',
        description: 'Used for pain relief and fever reduction',
        batchNumber: 'BATCH001',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Amoxicillin',
        category: 'Antibiotic',
        price: '120',
        stock: '300',
        manufacturer: 'XYZ Pharma',
        expiryDate: '2025-06-30',
        description: 'Antibiotic for bacterial infections',
        batchNumber: 'BATCH002',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Cetirizine',
        category: 'Antihistamine',
        price: '80',
        stock: '400',
        manufacturer: 'ABC Pharma',
        expiryDate: '2025-09-30',
        description: 'For allergy relief',
        batchNumber: 'BATCH003',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Omeprazole',
        category: 'Antacid',
        price: '150',
        stock: '250',
        manufacturer: 'PQR Pharma',
        expiryDate: '2025-11-30',
        description: 'For acid reflux and heartburn',
        batchNumber: 'BATCH004',
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Metformin',
        category: 'Diabetes',
        price: '200',
        stock: '350',
        manufacturer: 'XYZ Pharma',
        expiryDate: '2026-03-31',
        description: 'For type 2 diabetes management',
        batchNumber: 'BATCH005',
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(MEDICINES_FILE, JSON.stringify(medicines, null, 2));
  }

  // Orders data
  if (!fs.existsSync(ORDERS_FILE)) {
    const orders = [];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  }

  // Reports data
  if (!fs.existsSync(REPORTS_FILE)) {
    const reports = [];
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
  }
};

// Helper functions
const readData = (file) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  
  const users = readData(USERS_FILE);
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token: 'demo-token-' + user.id
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Register
app.post('/api/auth/register', (req, res) => {
  const { email, password, role, name, phone } = req.body;
  
  const users = readData(USERS_FILE);
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }
  
  const newUser = {
    id: Date.now().toString(),
    email,
    password,
    role,
    name,
    phone,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  writeData(USERS_FILE, users);
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.json({
    success: true,
    message: 'Registration successful',
    user: userWithoutPassword
  });
});

// ==================== USER ROUTES ====================

// Get all users (Admin only)
app.get('/api/users', (req, res) => {
  const users = readData(USERS_FILE);
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json({
    success: true,
    users: usersWithoutPasswords
  });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const users = readData(USERS_FILE);
  const user = users.find(u => u.id === req.params.id);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const users = readData(USERS_FILE);
  const index = users.findIndex(u => u.id === req.params.id);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body, updatedAt: new Date().toISOString() };
    writeData(USERS_FILE, users);
    
    const { password, ...userWithoutPassword } = users[index];
    res.json({
      success: true,
      message: 'User updated successfully',
      user: userWithoutPassword
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const users = readData(USERS_FILE);
  const filteredUsers = users.filter(u => u.id !== req.params.id);
  
  if (users.length !== filteredUsers.length) {
    writeData(USERS_FILE, filteredUsers);
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

// ==================== MEDICINE ROUTES ====================

// Get all medicines
app.get('/api/medicines', (req, res) => {
  const medicines = readData(MEDICINES_FILE);
  res.json({
    success: true,
    medicines
  });
});

// Get medicine by ID
app.get('/api/medicines/:id', (req, res) => {
  const medicines = readData(MEDICINES_FILE);
  const medicine = medicines.find(m => m.id === req.params.id);
  
  if (medicine) {
    res.json({
      success: true,
      medicine
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Medicine not found'
    });
  }
});

// Add medicine
app.post('/api/medicines', (req, res) => {
  const medicines = readData(MEDICINES_FILE);
  
  const newMedicine = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  medicines.push(newMedicine);
  writeData(MEDICINES_FILE, medicines);
  
  res.json({
    success: true,
    message: 'Medicine added successfully',
    medicine: newMedicine
  });
});

// Update medicine
app.put('/api/medicines/:id', (req, res) => {
  const medicines = readData(MEDICINES_FILE);
  const index = medicines.findIndex(m => m.id === req.params.id);
  
  if (index !== -1) {
    medicines[index] = { ...medicines[index], ...req.body, updatedAt: new Date().toISOString() };
    writeData(MEDICINES_FILE, medicines);
    
    res.json({
      success: true,
      message: 'Medicine updated successfully',
      medicine: medicines[index]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Medicine not found'
    });
  }
});

// Delete medicine
app.delete('/api/medicines/:id', (req, res) => {
  const medicines = readData(MEDICINES_FILE);
  const filteredMedicines = medicines.filter(m => m.id !== req.params.id);
  
  if (medicines.length !== filteredMedicines.length) {
    writeData(MEDICINES_FILE, filteredMedicines);
    res.json({
      success: true,
      message: 'Medicine deleted successfully'
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Medicine not found'
    });
  }
});

// ==================== ORDER ROUTES ====================

// Get all orders
app.get('/api/orders', (req, res) => {
  const orders = readData(ORDERS_FILE);
  res.json({
    success: true,
    orders
  });
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const orders = readData(ORDERS_FILE);
  const order = orders.find(o => o.id === req.params.id);
  
  if (order) {
    res.json({
      success: true,
      order
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
});

// Create order
app.post('/api/orders', (req, res) => {
  const orders = readData(ORDERS_FILE);
  
  const newOrder = {
    id: Date.now().toString(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  writeData(ORDERS_FILE, orders);
  
  res.json({
    success: true,
    message: 'Order created successfully',
    order: newOrder
  });
});

// Update order
app.put('/api/orders/:id', (req, res) => {
  const orders = readData(ORDERS_FILE);
  const index = orders.findIndex(o => o.id === req.params.id);
  
  if (index !== -1) {
    orders[index] = { ...orders[index], ...req.body, updatedAt: new Date().toISOString() };
    writeData(ORDERS_FILE, orders);
    
    res.json({
      success: true,
      message: 'Order updated successfully',
      order: orders[index]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
});

// ==================== REPORT ROUTES ====================

// Get all reports
app.get('/api/reports', (req, res) => {
  const reports = readData(REPORTS_FILE);
  res.json({
    success: true,
    reports
  });
});

// Create report
app.post('/api/reports', (req, res) => {
  const reports = readData(REPORTS_FILE);
  
  const newReport = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  reports.push(newReport);
  writeData(REPORTS_FILE, reports);
  
  res.json({
    success: true,
    message: 'Report created successfully',
    report: newReport
  });
});

// ==================== DASHBOARD STATS ====================

app.get('/api/stats/dashboard', (req, res) => {
  const users = readData(USERS_FILE);
  const medicines = readData(MEDICINES_FILE);
  const orders = readData(ORDERS_FILE);
  
  const stats = {
    totalUsers: users.length,
    totalMedicines: medicines.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0),
    lowStockMedicines: medicines.filter(m => parseInt(m.stock) < 100).length
  };
  
  res.json({
    success: true,
    stats
  });
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Pharma Company Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/login, /api/auth/register',
      users: '/api/users',
      medicines: '/api/medicines',
      orders: '/api/orders',
      reports: '/api/reports',
      stats: '/api/stats/dashboard',
      health: '/api/health'
    }
  });
});

// Initialize data and start server
initializeDataFiles();

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🏥 PHARMA COMPANY BACKEND SERVER');
  console.log('='.repeat(50));
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(50));
  console.log('📁 Data files initialized:');
  console.log(`   - Users: ${USERS_FILE}`);
  console.log(`   - Medicines: ${MEDICINES_FILE}`);
  console.log(`   - Orders: ${ORDERS_FILE}`);
  console.log(`   - Reports: ${REPORTS_FILE}`);
  console.log('='.repeat(50));
});

module.exports = app;
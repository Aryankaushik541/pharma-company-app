import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend API URL - Change this to your backend URL
const API_URL = 'http://localhost:3000/api';

// Helper function to get auth token
const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', body = null) => {
  try {
    const token = await getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
      method,
      headers,
    };
    
    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ==================== AUTH API ====================

export const authAPI = {
  login: async (email, password, role) => {
    try {
      const data = await apiCall('/auth/login', 'POST', { email, password, role });
      if (data.success && data.token) {
        await AsyncStorage.setItem('authToken', data.token);
        await AsyncStorage.setItem('userRole', role);
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userId', data.user.id);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  register: async (userData) => {
    return await apiCall('/auth/register', 'POST', userData);
  },
  
  logout: async () => {
    await AsyncStorage.multiRemove(['authToken', 'userRole', 'userEmail', 'userId']);
  }
};

// ==================== USER API ====================

export const userAPI = {
  getAll: async () => {
    return await apiCall('/users');
  },
  
  getById: async (id) => {
    return await apiCall(`/users/${id}`);
  },
  
  update: async (id, userData) => {
    return await apiCall(`/users/${id}`, 'PUT', userData);
  },
  
  delete: async (id) => {
    return await apiCall(`/users/${id}`, 'DELETE');
  }
};

// ==================== MEDICINE API ====================

export const medicineAPI = {
  getAll: async () => {
    return await apiCall('/medicines');
  },
  
  getById: async (id) => {
    return await apiCall(`/medicines/${id}`);
  },
  
  create: async (medicineData) => {
    return await apiCall('/medicines', 'POST', medicineData);
  },
  
  update: async (id, medicineData) => {
    return await apiCall(`/medicines/${id}`, 'PUT', medicineData);
  },
  
  delete: async (id) => {
    return await apiCall(`/medicines/${id}`, 'DELETE');
  }
};

// ==================== ORDER API ====================

export const orderAPI = {
  getAll: async () => {
    return await apiCall('/orders');
  },
  
  getById: async (id) => {
    return await apiCall(`/orders/${id}`);
  },
  
  create: async (orderData) => {
    return await apiCall('/orders', 'POST', orderData);
  },
  
  update: async (id, orderData) => {
    return await apiCall(`/orders/${id}`, 'PUT', orderData);
  }
};

// ==================== REPORT API ====================

export const reportAPI = {
  getAll: async () => {
    return await apiCall('/reports');
  },
  
  create: async (reportData) => {
    return await apiCall('/reports', 'POST', reportData);
  }
};

// ==================== STATS API ====================

export const statsAPI = {
  getDashboard: async () => {
    return await apiCall('/stats/dashboard');
  }
};

// ==================== HEALTH CHECK ====================

export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    return { success: false, message: 'Backend not reachable' };
  }
};

export default {
  authAPI,
  userAPI,
  medicineAPI,
  orderAPI,
  reportAPI,
  statsAPI,
  healthCheck
};
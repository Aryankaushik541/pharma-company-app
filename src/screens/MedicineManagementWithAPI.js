import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { medicineAPI } from '../services/api';

const MedicineManagementWithAPI = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    manufacturer: '',
    expiryDate: '',
    description: '',
    batchNumber: '',
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await medicineAPI.getAll();
      if (response.success) {
        setMedicines(response.medicines);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch medicines');
      console.error('Fetch medicines error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAddMedicine = async () => {
    if (!formData.name || !formData.category || !formData.price) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const response = await medicineAPI.create(formData);
      
      if (response.success) {
        Alert.alert('Success', 'Medicine added successfully');
        setFormData({
          name: '',
          category: '',
          price: '',
          stock: '',
          manufacturer: '',
          expiryDate: '',
          description: '',
          batchNumber: '',
        });
        setShowForm(false);
        fetchMedicines();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add medicine');
      console.error('Add medicine error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedicine = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this medicine?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              const response = await medicineAPI.delete(id);
              
              if (response.success) {
                Alert.alert('Success', 'Medicine deleted successfully');
                fetchMedicines();
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete medicine');
              console.error('Delete medicine error:', error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMedicines();
  };

  const renderMedicineItem = ({ item }) => (
    <View style={styles.medicineCard}>
      <View style={styles.medicineHeader}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicinePrice}>₹{item.price}</Text>
      </View>
      <Text style={styles.medicineDetail}>Category: {item.category}</Text>
      <Text style={styles.medicineDetail}>Stock: {item.stock} units</Text>
      <Text style={styles.medicineDetail}>Manufacturer: {item.manufacturer}</Text>
      <Text style={styles.medicineDetail}>Batch: {item.batchNumber}</Text>
      <Text style={styles.medicineDetail}>Expiry: {item.expiryDate}</Text>
      {item.description && (
        <Text style={styles.medicineDescription}>{item.description}</Text>
      )}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteMedicine(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading medicines...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medicine Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={styles.addButtonText}>
            {showForm ? 'Cancel' : '+ Add Medicine'}
          </Text>
        </TouchableOpacity>
      </View>

      {showForm && (
        <ScrollView style={styles.formContainer}>
          <Text style={styles.formTitle}>Add New Medicine</Text>
          
          <Text style={styles.label}>Medicine Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter medicine name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <Text style={styles.label}>Category *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Antibiotic, Pain Relief"
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
          />

          <Text style={styles.label}>Price (₹) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Stock Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter stock quantity"
            value={formData.stock}
            onChangeText={(text) => setFormData({ ...formData, stock: text })}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Manufacturer</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter manufacturer name"
            value={formData.manufacturer}
            onChangeText={(text) => setFormData({ ...formData, manufacturer: text })}
          />

          <Text style={styles.label}>Batch Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter batch number"
            value={formData.batchNumber}
            onChangeText={(text) => setFormData({ ...formData, batchNumber: text })}
          />

          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={formData.expiryDate}
            onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter medicine description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleAddMedicine}>
            <Text style={styles.submitButtonText}>Add Medicine</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <FlatList
        data={medicines}
        renderItem={renderMedicineItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No medicines found</Text>
            <Text style={styles.emptySubtext}>Add your first medicine to get started</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
  medicineCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  medicineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  medicinePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  medicineDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  medicineDescription: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default MedicineManagementWithAPI;
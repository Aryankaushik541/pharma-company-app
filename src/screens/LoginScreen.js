import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    { id: 'admin', name: 'Admin', screen: 'AdminDashboard' },
    { id: 'ceo', name: 'CEO', screen: 'CEODashboard' },
    { id: 'manager', name: 'Manager', screen: 'ManagerDashboard' },
    { id: 'abm', name: 'ABM (Area Business Manager)', screen: 'ABMDashboard' },
    { id: 'zbm', name: 'ZBM (Zonal Business Manager)', screen: 'ZBMDashboard' },
    { id: 'district_manager', name: 'District Manager', screen: 'DistrictManagerDashboard' },
    { id: 'mr', name: 'MR (Medical Representative)', screen: 'MRDashboard' },
    { id: 'developer', name: 'Developer', screen: 'DeveloperDashboard' },
    { id: 'customer', name: 'Customer', screen: 'CustomerDashboard' },
  ];

  // Demo credentials for each role
  const demoCredentials = {
    admin: { email: 'admin@pharma.com', password: 'admin123' },
    ceo: { email: 'ceo@pharma.com', password: 'ceo123' },
    manager: { email: 'manager@pharma.com', password: 'manager123' },
    abm: { email: 'abm@pharma.com', password: 'abm123' },
    zbm: { email: 'zbm@pharma.com', password: 'zbm123' },
    district_manager: { email: 'dm@pharma.com', password: 'dm123' },
    mr: { email: 'mr@pharma.com', password: 'mr123' },
    developer: { email: 'dev@pharma.com', password: 'dev123' },
    customer: { email: 'customer@pharma.com', password: 'customer123' },
  };

  const handleLogin = async () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role');
      return;
    }

    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    const credentials = demoCredentials[selectedRole];
    
    if (email === credentials.email && password === credentials.password) {
      await AsyncStorage.setItem('userRole', selectedRole);
      await AsyncStorage.setItem('userEmail', email);
      
      const roleScreen = roles.find(r => r.id === selectedRole).screen;
      navigation.replace(roleScreen);
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏥 Pharma Company</Text>
        <Text style={styles.subtitle}>Management System</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Select Role</Text>
        <View style={styles.roleContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleButton,
                selectedRole === role.id && styles.roleButtonSelected,
              ]}
              onPress={() => setSelectedRole(role.id)}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  selectedRole === role.id && styles.roleButtonTextSelected,
                ]}
              >
                {role.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.demoCredentials}>
          <Text style={styles.demoTitle}>Demo Credentials:</Text>
          {selectedRole && (
            <View style={styles.demoBox}>
              <Text style={styles.demoText}>Email: {demoCredentials[selectedRole].email}</Text>
              <Text style={styles.demoText}>Password: {demoCredentials[selectedRole].password}</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  roleButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    margin: 4,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  roleButtonSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  roleButtonText: {
    color: '#333',
    fontSize: 14,
  },
  roleButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoCredentials: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#856404',
  },
  demoBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  demoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default LoginScreen;
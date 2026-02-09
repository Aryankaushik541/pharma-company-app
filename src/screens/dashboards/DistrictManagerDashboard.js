import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DistrictManagerDashboard = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  const menuItems = [
    { id: 1, title: 'District Sales', icon: '💰', color: '#2196F3' },
    { id: 2, title: 'Team Coordination', icon: '👥', color: '#4CAF50' },
    { id: 3, title: 'Local Market', icon: '🏪', color: '#FF9800' },
    { id: 4, title: 'Distribution', icon: '🚚', color: '#9C27B0' },
    { id: 5, title: 'Field Reports', icon: '📋', color: '#00BCD4' },
    { id: 6, title: 'Target Review', icon: '🎯', color: '#795548' },
  ];

  const stats = [
    { label: 'District Sales', value: '₹15L', color: '#4CAF50' },
    { label: 'Team Size', value: '18', color: '#2196F3' },
    { label: 'Achievement', value: '88%', color: '#FF9800' },
    { label: 'Outlets', value: '234', color: '#9C27B0' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>District Manager</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>District Manager Menu</Text>
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuCard, { backgroundColor: item.color }]}
              onPress={() => Alert.alert(item.title, 'Feature coming soon!')}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '48%',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  menuIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  menuTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DistrictManagerDashboard;
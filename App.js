import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import AdminDashboard from './src/screens/dashboards/AdminDashboard';
import CEODashboard from './src/screens/dashboards/CEODashboard';
import ManagerDashboard from './src/screens/dashboards/ManagerDashboard';
import ABMDashboard from './src/screens/dashboards/ABMDashboard';
import ZBMDashboard from './src/screens/dashboards/ZBMDashboard';
import DistrictManagerDashboard from './src/screens/dashboards/DistrictManagerDashboard';
import MRDashboard from './src/screens/dashboards/MRDashboard';
import DeveloperDashboard from './src/screens/dashboards/DeveloperDashboard';
import CustomerDashboard from './src/screens/dashboards/CustomerDashboard';
import MedicineManagement from './src/screens/MedicineManagement';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AdminDashboard" 
          component={AdminDashboard}
          options={{ title: 'Admin Dashboard' }}
        />
        <Stack.Screen 
          name="CEODashboard" 
          component={CEODashboard}
          options={{ title: 'CEO Dashboard' }}
        />
        <Stack.Screen 
          name="ManagerDashboard" 
          component={ManagerDashboard}
          options={{ title: 'Manager Dashboard' }}
        />
        <Stack.Screen 
          name="ABMDashboard" 
          component={ABMDashboard}
          options={{ title: 'ABM Dashboard' }}
        />
        <Stack.Screen 
          name="ZBMDashboard" 
          component={ZBMDashboard}
          options={{ title: 'ZBM Dashboard' }}
        />
        <Stack.Screen 
          name="DistrictManagerDashboard" 
          component={DistrictManagerDashboard}
          options={{ title: 'District Manager Dashboard' }}
        />
        <Stack.Screen 
          name="MRDashboard" 
          component={MRDashboard}
          options={{ title: 'MR Dashboard' }}
        />
        <Stack.Screen 
          name="DeveloperDashboard" 
          component={DeveloperDashboard}
          options={{ title: 'Developer Dashboard' }}
        />
        <Stack.Screen 
          name="CustomerDashboard" 
          component={CustomerDashboard}
          options={{ title: 'Customer Dashboard' }}
        />
        <Stack.Screen 
          name="MedicineManagement" 
          component={MedicineManagement}
          options={{ title: 'Medicine Management' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
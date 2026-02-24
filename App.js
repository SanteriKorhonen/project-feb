import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from './screens/WelcomeScreen';
import Profile from './screens/profile';
import LocationsStack from './screens/Loca';
import LoginScreen from './screens/loginscreen';

const Tab = createBottomTabNavigator();

export default function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  };

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  if (loading) return null;

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#3B82F6',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
              height: 60,
              paddingBottom: 8,
              paddingTop: 5,
            },
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Welcome') iconName = 'home';
              if (route.name === 'Locations') iconName = 'location';
              if (route.name === 'Profile') iconName = 'person';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Welcome">
            {() => <WelcomeScreen username={user} />}
          </Tab.Screen>

          <Tab.Screen name="Locations">
            {() => <LocationsStack user={user} />}
          </Tab.Screen>

          <Tab.Screen name="Profile">
            {() => <Profile username={user} onLogout={handleLogout} />}
          </Tab.Screen>

        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
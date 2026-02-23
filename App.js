import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import WelcomeScreen from './screens/WelcomeScreen';
import Profile from './screens/profile';
import LocationsStack from './screens/Loca';

const Tab = createBottomTabNavigator();

export default function App() {
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

            if (route.name === 'Welcome') {
              iconName = 'home';
            } else if (route.name === 'Locations') {
              iconName = 'location';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Welcome" component={WelcomeScreen} />
        <Tab.Screen name="Locations" component={LocationsStack} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
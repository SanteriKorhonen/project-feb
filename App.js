import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MenuScreen from './screens/MenuScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import Profile from './screens/profile';
import LocationsStack from './screens/Loca.js';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Welcome" component={WelcomeScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
        <Tab.Screen name="Locations" component={LocationsStack} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

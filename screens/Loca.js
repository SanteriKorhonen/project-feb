import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddLocation from './Addlocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const STORAGE_KEY = '@myapp_locations';


function Stars({ count = 0 }) {
  const star = '★';
  const empty = '☆';
  return (
    <Text style={styles.stars}>
      {star.repeat(count) + empty.repeat(5 - count)}
    </Text>
  );
}



function LocationsList({ navigation, user }) {

  const [locations, setLocations] = useState([]);


  const loadLocations = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      const arr = json ? JSON.parse(json) : [];
      setLocations(arr);
    } catch (e) {
      console.log("Error loading locations", e);
    }
  };


  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadLocations();
      }
    }, [user])
  );


  const openMapFor = async (name) => {

    const query = encodeURIComponent(name);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Error", "Cannot open map");
    }

  };


  // BLOCK ACCESS IF NOT LOGGED IN
  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.heading}>Login Required</Text>
        <Text style={styles.text}>
          Please login from Profile to use Locations
        </Text>
      </View>
    );
  }


  const renderItem = ({ item }) => (

    <View style={styles.card}>

      <View style={styles.row}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Stars count={item.rating} />
      </View>

      <Text style={styles.cardDesc}>
        {item.description}
      </Text>

      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => openMapFor(item.name)}
      >
        <Text style={styles.mapButtonText}>
          Show on Map
        </Text>
      </TouchableOpacity>

    </View>

  );


  return (

    <View style={styles.listContainer}>

      <Text style={styles.heading}>
        Welcome {user}
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddLocation')}
      >
        <Text style={styles.addButtonText}>
          Add Location
        </Text>
      </TouchableOpacity>


      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

    </View>

  );

}



const Stack = createNativeStackNavigator();



export default function LocationsStack({ user }) {

  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="LocationsList">
        {(props) => (
          <LocationsList
            {...props}
            user={user}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="AddLocation"
        component={AddLocation}
      />

    </Stack.Navigator>

  );

}



const styles = StyleSheet.create({

  listContainer: {
    flex: 1,
    padding: 18,
    paddingTop: 28,
    backgroundColor: '#F1F5F9'
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 12
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    elevation: 2
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A'
  },

  cardDesc: {
    marginTop: 8,
    color: '#475569'
  },

  stars: {
    fontSize: 16,
    color: '#FBBF24'
  },

  addButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center'
  },

  addButtonText: {
    color: '#fff',
    fontWeight: '700'
  },

  mapButton: {
    backgroundColor: '#0EA5E9',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  },

  mapButtonText: {
    color: '#fff',
    fontWeight: '700'
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: 16,
    marginTop: 10
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

});
// screens/locations.js
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddLocation from './addlocation';
import { useFocusEffect } from '@react-navigation/native';

const STORAGE_KEY = '@myapp_locations';

function Stars({ count = 0 }) {
  // simple star rendering
  const star = '★';
  const empty = '☆';
  return (
    <Text style={styles.stars}>
      {star.repeat(Math.max(0, Math.min(5, count)))}
      {empty.repeat(Math.max(0, 5 - Math.max(0, Math.min(5, count))))}
    </Text>
  );
}

function LocationsList({ navigation }) {
  const [locations, setLocations] = useState([]);

  const load = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      const arr = json ? JSON.parse(json) : [];
      setLocations(arr);
    } catch (e) {
      console.error('Failed to load locations', e);
      Alert.alert('Error', 'Could not load locations.');
    }
  };

  // reload when this screen is focused
  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const clearAll = async () => {
    Alert.alert('Confirm', 'Clear all saved locations?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setLocations([]);
          } catch (e) {
            console.error('Error clearing storage', e);
          }
        },
      },
    ]);
  };

  const openMapFor = async (name) => {
    // fallback to google maps search query
    const query = encodeURIComponent(name);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Cannot open maps on this device.');
      } else {
        Linking.openURL(url);
      }
    } catch (e) {
      console.error('Linking error', e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Stars count={item.rating} />
      </View>
      <Text style={styles.cardDesc}>{item.description || '—'}</Text>

      <View style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => openMapFor(item.name)}
          style={styles.actionButton}
        >
          <Text style={styles.actionText}>Show on map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Info', `Added: ${new Date(item.createdAt).toLocaleString()}`)
          }
          style={styles.infoButton}
        >
          <Text style={styles.infoText}>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>My locations</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('AddLocation')}
          >
            <Text style={styles.headerBtnText}>+ Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={clearAll}>
            <Text style={styles.headerBtnText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {locations.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No saved locations yet — add one!</Text>
        </View>
      ) : (
        <FlatList
          data={locations}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

/**
 * Top-level export: a stack navigator inside the "Locations" tab.
 * This keeps tab structure intact while allowing navigation between list and add views.
 */
const Stack = createNativeStackNavigator();

export default function LocationsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LocationsList" component={LocationsList} />
      <Stack.Screen name="AddLocation" component={AddLocation} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 18,
    paddingTop: 28,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerButton: {
    backgroundColor: '#e53935',
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  headerBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
  empty: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  stars: {
    fontSize: 16,
    color: '#ffb400',
  },
  cardDesc: {
    marginTop: 8,
    color: '#444',
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  actionText: {
    fontWeight: '700',
  },
  infoButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  infoText: {
    fontWeight: '700',
  },
});
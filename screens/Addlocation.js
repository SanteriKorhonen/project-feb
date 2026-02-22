// screens/addlocation.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@myapp_locations';

export default function AddLocation({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(3);

  const saveLocation = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter a location name.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      rating: Number(rating),
      createdAt: new Date().toISOString(),
    };

    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      const existing = json ? JSON.parse(json) : [];
      const updated = [newItem, ...existing];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      // go back to the list — list screen listens to focus and reloads
      navigation.goBack();
    } catch (e) {
      console.error('Error saving location', e);
      Alert.alert('Error', 'Could not save location.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Add Location</Text>

        <Text style={styles.label}>Location name</Text>
        <TextInput
          placeholder="e.g. New York"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Short description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          multiline
        />

        <Text style={styles.label}>Rating</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRating(r)}
              style={[
                styles.ratingButton,
                rating === r ? styles.ratingButtonActive : null,
              ]}
            >
              <Text style={rating === r ? styles.ratingTextActive : styles.ratingText}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveLocation}>
          <Text style={styles.saveText}>Save location</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: 20,
    paddingTop: 36,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  ratingRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  ratingButton: {
    padding: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingButtonActive: {
    backgroundColor: '#222',
    borderColor: '#222',
  },
  ratingText: {
    color: '#222',
    fontWeight: '600',
  },
  ratingTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#e53935',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
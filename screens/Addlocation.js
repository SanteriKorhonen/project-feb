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
const COLORS = {
  primary: '#1E3A8A',
  secondary: '#3B82F6',
  background: '#F1F5F9',
  card: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  border: '#CBD5E1',
};

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
              <Text
                style={rating === r ? styles.ratingTextActive : styles.ratingText}
              >
                {r}
              </Text>
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
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 20, paddingTop: 36 },
  heading: { fontSize: 26, fontWeight: '800', marginBottom: 20, color: COLORS.primary },
  label: { marginTop: 14, marginBottom: 6, fontWeight: '600', color: COLORS.textSecondary },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 14, backgroundColor: COLORS.card },
  textArea: { minHeight: 90, textAlignVertical: 'top' },
  ratingRow: { flexDirection: 'row', marginTop: 8 },
  ratingButton: { padding: 10, marginRight: 10, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, minWidth: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.card },
  ratingButtonActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  ratingText: { color: COLORS.textPrimary, fontWeight: '600' },
  ratingTextActive: { color: '#fff', fontWeight: '700' },
  saveButton: { marginTop: 28, backgroundColor: COLORS.secondary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', elevation: 3 },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
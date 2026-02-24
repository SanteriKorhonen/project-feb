import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile({ username, onLogout }) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Profile</Text>

      <Text style={styles.info}>Logged in as:</Text>
      <Text style={styles.username}>{username}</Text>

      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#CBD5E1', elevation: 3 },
  title: { fontSize: 26, fontWeight: '800', color: '#1E3A8A', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 14, marginBottom: 12, backgroundColor: '#fff' },
  loginButton: { backgroundColor: '#3B82F6', padding: 14, borderRadius: 12, alignItems: 'center' },
  loginText: { color: '#fff', fontWeight: '700' },
  label: { fontSize: 16, color: '#475569' },
  username: { fontSize: 20, fontWeight: '700', marginBottom: 20, color: '#0F172A' },
  logoutButton: { backgroundColor: '#DC2626', padding: 14, borderRadius: 12, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: '700' },
});
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGIN_KEY = '@myapp_user';

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem(LOGIN_KEY);
      if (user) {
        setLoggedIn(true);
        setCurrentUser(user);
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    if (username === 'Admin' && password === '1234') {
      await AsyncStorage.setItem(LOGIN_KEY, username);
      setLoggedIn(true);
      setCurrentUser(username);
      Alert.alert('Success', 'Logged in successfully');
    } else {
      Alert.alert('Error', 'Wrong username or password');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(LOGIN_KEY);
    setLoggedIn(false);
    setCurrentUser(null);
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>

        {!loggedIn ? (
          <>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              style={styles.input}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Logged in as:</Text>
            <Text style={styles.username}>{currentUser}</Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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
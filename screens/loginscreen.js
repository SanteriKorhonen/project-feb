import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const USERNAME = "student";
const PASSWORD = "1234";


export default function LoginScreen({ onLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {

    if (username === "Admin" && password === "1234") {

      await AsyncStorage.setItem('user', username);

      onLogin(username);

    } else {

      Alert.alert(
        "Login Failed",
        "Wrong username or password"
      );

    }

  };


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Login
      </Text>


      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />


      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />


      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >

        <Text style={styles.buttonText}>
          Login
        </Text>

      </TouchableOpacity>

    </View>

  );

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  button: {
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
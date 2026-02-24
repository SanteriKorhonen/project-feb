import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile({ username, onLogout }) {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Profile
      </Text>

      <Text style={styles.info}>
        Logged in as:
      </Text>

      <Text style={styles.username}>
        {username}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onLogout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>

    </View>

  );

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20
  },

  info: {
    fontSize: 16,
    color: '#475569'
  },

  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 30
  },

  button: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }

});
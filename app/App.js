import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


  var firebaseConfig = {
    apiKey: "AIzaSyC7m3ww22OXsKOiV11C4AG5wWCZyYHgsoo",
    authDomain: "woo-firebase.firebaseapp.com",
    databaseURL: "https://woo-firebase.firebaseio.com",
    projectId: "woo-firebase",
    storageBucket: "woo-firebase.appspot.com",
    messagingSenderId: "579750847600",
    appId: "1:579750847600:web:ee340682ff4f9c9e2d80b5",
    measurementId: "G-ZKGHZERYG4"
  };
  



export default function App() {
  return (
    <View style={styles.container}>
      <Text>test</Text>
      <Button title = "test" />
    </View>
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

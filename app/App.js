import React from 'react';
import * as firebase from "firebase";
import { StyleSheet, Text, View, Button } from 'react-native';


var config = {
    apiKey: "AIzaSyC7m3ww22OXsKOiV11C4AG5wWCZyYHgsoo",
    authDomain: "woo-firebase.firebaseapp.com",
    databaseURL: "https://woo-firebase.firebaseio.com",
    projectId: "woo-firebase",
    storageBucket: "woo-firebase.appspot.com",
    messagingSenderId: "579750847600",
    appId: "1:579750847600:web:ee340682ff4f9c9e2d80b5",
    measurementId: "G-ZKGHZERYG4"
  };

firebase.initializeApp(config);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

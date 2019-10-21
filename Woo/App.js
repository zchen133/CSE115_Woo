import React, { Component } from 'react';
import * as firebase from "firebase";
import { StyleSheet, Text, View, Button } from 'react-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import Loading from './src/Loading';
import Login from './src/Login';
import Signup from './src/Signup';
import Home from './src/Home';
import Recovery from './src/PasswordRecovery';
import AdminHomepage from './src/AdminHomepage';
import MedicalHomepage from './src/MedicalHomepage';
import PatientHomepage from './src/PatientHomepage';


import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'


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

const AppNavigator = createSwitchNavigator({
    Loading,
    Login,
    Signup,
    Home,
    Recovery,
    AdminHomepage,
    MedicalHomepage,
    PatientHomepage
}, {
    initialRouteName: 'Loading',
    backgroundColor: '#111111'
})

export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

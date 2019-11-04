import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight,YellowBox } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import Login from './Login.js'
import Block from './components.js'
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
//var appointment
import{createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

export default class ProfileScreen extends Component {
    render() {
        return (
         <View style={styles.container}>
             <Text> ProfileScreen Homepage</Text>
         </View>
        );
    }
}
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";

//import { SafeAreaView } from 'react-navigation';
//import { ScrollView } from 'react-native-gesture-handler';
////var appointment
//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

export default class Patient_ProfileScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
             <Text> ProfileScreen Homepage</Text>
         </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#72C3C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
import React, { Component } from 'react';
import * as firebase from "firebase";
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { test } from './Login.js'

export default class Loading extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log("test after import:" + test);
           this.props.navigation.navigate(user ? 'Home' : 'Login')
           if(test === '5'){
               this.props.navigation.navigate('AdminHomepage')
 
           }
           else if(test === '1'){
               this.props.navigation.navigate('PatientHomepage')

           }
           else if(test === '4'||test === '3'||test ==="2"){
            this.props.navigation.navigate('MedicalHomepage')

           }
           //this.props.navigation.navigate('Login')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size='large'/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#73BFF1',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

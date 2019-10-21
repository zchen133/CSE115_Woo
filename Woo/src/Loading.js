import React, { Component } from 'react';
import * as firebase from "firebase";
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class Loading extends Component {

    user = firebase.auth().currentUser;

    componentDidMount() {
        if (this.user) {
            // User is signed in.
            console.log(this.user.getEmail());
        } else {
            // No this.user is signed in.
            console.log('No user');
            this.props.navigation.navigate('Login')
        }
        /*
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log(user.getEmail());
            }
            this.props.navigation.navigate(user ? 'Home' : 'Login')
        })
        */
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

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import { test } from './Login.js'

export default class PatientHomepage extends Component {
    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(
                //test = 0,
                this.props.navigation.navigate('Login'));
    }
    render() {
        return (
            <View style={styles.container}>
                <Text> Patient Homepage</Text>
                <Button
                    title='Sign Out'
                    onPress={this.handleSignOut} />
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
    }
});
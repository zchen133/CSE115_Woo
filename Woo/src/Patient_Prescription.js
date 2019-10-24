import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";

export default class PrescriptionScreen extends Component {
    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(
                this.props.navigation.navigate('Login'));
    }
    render() {
        return (
            <View style={styles.container}>
             <Text> Prescription Screen Homepage</Text>
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
        backgroundColor: '#72C3C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
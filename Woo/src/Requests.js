import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";

export default class Requests extends Component {

    onPressRequests = () => {

        this.props.navigation.navigate('PatientHomepage')

    }

    render() {
        return (
            <View style={styles.container}>
             <Text>Requests Screen Homepage</Text>
             <Button 
                title = 'Go back'
                onPress={this.onPressRequests} />
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
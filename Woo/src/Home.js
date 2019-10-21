import React, { Component } from 'react';
import * as firebase from "firebase";
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends Component {
    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(this.props.navigation.navigate('Login'));
    }
    render() {
        console.log("in home")
        return (
            <View style={styles.container}>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

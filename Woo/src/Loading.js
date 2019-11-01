import React, { Component } from 'react';
import * as firebase from "firebase";
import { StyleSheet, Text, View, ActivityIndicator, YellowBox } from 'react-native';
import { test, loginEmail } from './Login.js'
import { AppLoading } from 'expo';
var newtest;
var initialEmail = 'initialEmail';
export { initialEmail };
export default class Loading extends Component {

    constructor() {
        super();
        this.state = { isReady: false };
        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    readUserData = () => {
        var docRef = firebase.firestore().collection("users").doc(initialEmail);
        return docRef.get().then(function(doc) {
            if (doc.exists) {
                return doc.get('accountType');
            } else {
                console.log("No such document");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log("newtest after import:" + newtest);

            if (user) {

                initialEmail = user.email
                this.readUserData()
                    .then((result) => {
                        if (result == 1) {
                            this.props.navigation.navigate('PatientHomepage')
                        } else if (result == 5) {
                            this.props.navigation.navigate('AdminHomepage')
                        } else if (result == 2 || result == 3 || result == 4) {
                            this.props.navigation.navigate('MedicalHomepage')
                        }
                    })
                // console.log("test after import:" + test + 'newtest' + newtest + 'email' + user.email);


            } else {
                console.log('loginemail' + loginEmail)
                if (test > 0) {
                    console.log('user.email = null and user exists')
                } else {
                    console.log('inside user false' + user + 'user.email' + initialEmail)
                    this.props.navigation.navigate('Login')
                }
            }

        })
    }

    render() {
        return (
            <View style={styles.container}>
            <Text>Loading...</Text>
            <ActivityIndicator size='large' />
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

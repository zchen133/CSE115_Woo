import React, { Component } from 'react';
import * as firebase from "firebase";
import { StyleSheet, Text, View, ActivityIndicator, YellowBox, ImageBackground, sleep } from 'react-native';
import { test, loginEmail } from './Login.js';
import { AppLoading } from 'expo';
import Toast from 'react-native-tiny-toast';
var newtest;
var initialEmail = 'Null';
var hospital = "Null";
var first = "Null";
var last = "Null"
var department = "Null"
var accountTypeString = "Null"
export { initialEmail, hospital, first, last, department, accountTypeString };

export default class Loading extends Component {

    constructor() {
        super();
        this.state = { isReady: false };
        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(
                //test = 0,
                this.props.navigation.navigate('Login'));
    }

    readUserData = () => {
        var docRef = firebase.firestore().collection("users").doc(initialEmail);
        return docRef.get().then(function (doc) {
            if (doc.exists) {
                hospital = doc.get("hospital")
                first = doc.get("first")
                last = doc.get("last")
                department = doc.get("department")
                accountTypeString = doc.get("accountTypeString")
                return doc.get('accountType')
            } else {
                Toast.show("This account no longer exists")
                firebase
                    .auth()
                    .signOut()
                    .then(
                        //test = 0,
                        this.props.navigation.navigate('Login'));

                
            }
        }).catch(function (error) {
        });

    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {

            if (user) {

                initialEmail = user.email
                this.readUserData()
                    .then((result) => {

                        if (result == 1) {
                            let that = this;
                            setTimeout(function () { that.props.navigation.navigate('PatientHomepage') }, 3000);

                        } else if (result == 5) {
                            let that = this;
                            setTimeout(function () { that.props.navigation.navigate('AdminHomepage') }, 3000);
                        } else if (result == 2 || result == 3 || result == 4) {
                            let that = this;
                            setTimeout(function () { that.props.navigation.navigate('MedicalHomepage') }, 3000);
                        }
                    })


            } else {
                if (test > 0) {
                } else {
                    this.props.navigation.navigate('Login')
                }
            }

        })
    }

    render() {

        return (
            <ImageBackground
                source={require('../assets/loadingPage.gif')}
                style={styles.container}
            >

            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#f5f5f5',
        //alignItems: 'center',
        //justifyContent: 'center',
        width: null,
        height: null,
    },
});
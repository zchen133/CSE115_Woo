import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as firebase from "firebase";
import Toast from 'react-native-tiny-toast'
import "firebase/firestore";

const { width, height } = Dimensions.get('window')
export default class Signup extends Component {
    state = { firstName: '', lastName: '', email: '', password: '', accountType: '1', confirmPass: '', err: null }

    handleSignUp = () => {

        // TODO: Show errors on screen
        if (this.state.firstName == '') {
            console.log('No firstname selected');
            Toast.show('Please enter your first name');
            return;
        }
        if (this.state.lastName == '') {
            console.log('No lastname selected');
            Toast.show('Please enter your last name');
            return;
        }

        if (this.state.email == '') {
            console.log('No email selected');
            Toast.show('Please enter your email');
            return;
        }

        if (this.state.password == '') {
            console.log('No email selected');
            Toast.show('Please enter your password');
            return;
        }

        if (this.state.password.length < 6) {
            console.log('Password must be longer than 6 characters.');
            Toast.show('Password must be longer than 6 characters.');
            return;
        }

        if (this.state.password != this.state.confirmPass) {
            console.log('Passwords don\'t match');
            Toast.show('Passwords don\'t match')
            return;
        }



        console.log("Attempt to Signup");
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                userRef = firebase.firestore().collection('users')
                userRef.doc(this.state.email).set({
                    first: this.state.firstName,
                    last: this.state.lastName,
                    email: this.state.email,
                    accountType: this.state.accountType,
                    accountTypeString: "Patients"
                })

            })
            .then(() => this.props.navigation.navigate('Loading'))
            .catch(error => { this.setState({ err: error.message }), Toast.show(error.message) });


    }

    BackLoginPage = () => {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'flex-end' }}>
                <View style={{ ...StyleSheet.absoluteFill }}>
                    <Image
                        source={require('../assets/nb.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                        blurRadius={5}
                    />
                </View>
                <TextInput
                    placeholder='First Name'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={firstName => this.setState({ firstName })}
                    value={this.state.firstName}
                />
                <TextInput
                    placeholder='Last Name'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={lastName => this.setState({ lastName })}
                    value={this.state.lastName}
                />
                <TextInput
                    placeholder='Email'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder='Password'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TextInput
                    secureTextEntry
                    placeholder='Confirm Password'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={confirmPass => this.setState({ confirmPass })}
                    value={this.state.confirmPass}
                />
                <TouchableOpacity onPress={this.handleSignUp}>
                    <Animated.View style={styles.button}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN UP</Text>
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.BackLoginPage}>
                    <Animated.View style={styles.closeButton}>
                        <Text style={{ fontSize: 15 }}>X</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'white',
        height: 50,
        width: 250,
        marginHorizontal: 20,
        borderRadius: 35,
        marginLeft: 50,
        marginRight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginBottom: 40,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    closeButton: {
        marginBottom: 150,
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // position:'absolute',
        // top:-20,
        left: width / 2 - 20,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    input: {
        // height: 40,
        // alignItems: 'stretch',
        backgroundColor: 'white',
        // width: '95%',
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
        height: 35,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        height: 35,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'white',
        color: 'black',
    },
    inputAndroid: {
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        height: 35,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'white',
        color: 'black',
    },
});
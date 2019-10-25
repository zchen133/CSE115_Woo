import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions } from 'react-native';
import * as firebase from "firebase";
import Toast from "react-native-tiny-toast"

const { width, height } = Dimensions.get('window')

export default class Recovery extends Component {
    state = { email: '', err: null }

    sendEmail = () => {
        if (this.state.email == '') {
            console.log('No email selected');  
             Toast.show('Please enter your email');
            return;
        }

        console.log('Sending email...'+this.state.email);

        firebase
            .auth()
            .sendPasswordResetEmail(this.state.email)
            .catch(error => {this.setState({ err: error.message }),Toast.show(error.message)});
        console.log(this.state.err);
        
        
    }
    
    BackLoginPage = () => {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ ...StyleSheet.absoluteFill }}>
                    <Image
                        source={require('../assets/nb.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                        blurRadius={5}
                    />
                </View>
                <TextInput
                    placeholder='Email'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TouchableOpacity onPress={this.sendEmail}>
                    <Animated.View style={styles.button}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reset Password</Text>
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
        backgroundColor: '#73BFF1',
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
        marginBottom: 10,
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    input: {
        backgroundColor: 'white',
        width: '75%',
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
    },
});
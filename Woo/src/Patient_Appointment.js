import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')

export default class Patient_AppointmentScreen extends Component {
    
    sendToHome = () => {
        this.props.navigation.navigate('PatientHomepage')
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
                   // onChangeText={firstName => this.setState({ firstName })}
                    //value={this.state.firstName}
                />
                <TextInput
                    placeholder='Last Name'
                    autoCapitalize="none"
                    style={styles.input}
                   // onChangeText={lastName => this.setState({ lastName })}
                   // value={this.state.lastName}
                />
                <TextInput
                    placeholder='Email'
                    autoCapitalize="none"
                    style={styles.input}
                   // onChangeText={email => this.setState({ email })}
                   // value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder='Password'
                    autoCapitalize="none"
                    style={styles.input}
                  //  onChangeText={password => this.setState({ password })}
                   // value={this.state.password}
                />
                <TextInput
                    secureTextEntry
                    placeholder='Confirm Password'
                    autoCapitalize="none"
                    style={styles.input}
                  //  onChangeText={confirmPass => this.setState({ confirmPass })}
                  //  value={this.state.confirmPass}
                />
                <TouchableOpacity onPress={this.handleSignUp}>
                    <Animated.View style={styles.button}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN UP</Text>
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.sendToHome}>
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
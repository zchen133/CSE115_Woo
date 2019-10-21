import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Dimensions,
    TextInput,
    KeyboardAvoidingView
} from "react-native";
import { YellowBox } from 'react-native';
//import Svg,{Image,Circle,ClipPath} from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from "firebase";

const { width, height } = Dimensions.get('window')
const { Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate, concat } = Animated
var initialEmail = 'initialEmail';
var test, loginEmail;
export { test, loginEmail };
function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}


class WooApp extends Component {

    state = { email: '', password: '', err: null }

    signUpState = { email: '', password: '', confirmPass: '', err: null }



    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.buttonOpacity = new Value(1);
        this.textInputEditable = true;
        this.onStateChange = event([{
            nativeEvent: ({ state }) => block([
                cond(eq(state, State.END),
                    set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))
            ])
        }]);
        this.onCloseState = event([{
            nativeEvent: ({ state }) => block([
                cond(eq(state, State.END),
                    set(this.buttonOpacity, runTiming(new Clock(), 0, 1)))
            ])
        }])
        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        })
        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3, 0],
            extrapolate: Extrapolate.CLAMP
        })
        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        })
        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 100],
            extrapolate: Extrapolate.CLAMP
        })
        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        })
        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        })
    }

    readUserData = () => {
        console.log('current email' + initialEmail)
        var docRef = firebase.firestore().collection("users").doc(initialEmail);

        return docRef.get().then(function (doc) {
            if (doc.exists) {
                return doc.get('accountType');
            } else {
                console.log("No such document");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }


    onPressSignIn = () => {
        if (this.state.email !== "") {
            initialEmail = this.state.email;
        }

        this.readUserData()
            .then((result) => {
                console.log('Sign In Attempt', result);
                test = result;
                console.log("test:" + test);

                if (test === '5') {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(this.state.email, this.state.password)
                        .then(
                            console.log('this.state.email' + this.state.email + 'this.state.password' + this.state.password))
                        .catch(error => this.setState({ err: error.message }))
                    console.log(this.state.err)
                }
                else if (test === '1') {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(this.state.email, this.state.password)
                        .then(
                            console.log('this.state.email' + this.state.email + 'this.state.password' + this.state.password))
                        .catch(error => this.setState({ err: error.message }))
                    console.log(this.state.err)
                }
                else if (test === '4' || test === '3' || test === "2") {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(this.state.email, this.state.password)
                        .then(
                            console.log('this.state.email' + this.state.email + 'this.state.password' + this.state.password)
                        )
                        .catch(error => this.setState({ err: error.message }))
                    console.log(this.state.err)
                }
            })
    }

    onPressSignUp = () => {

        this.props.navigation.navigate('Signup')

    }
    onPressPR = () => {

        this.props.navigation.navigate('Recovery')
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'flex-end' }}>
                <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'flex-end', }} behavior='padding' enabled>
                    <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                        <Image
                            source={require('../assets/test.gif')}
                            style={{ flex: 1, height: null, width: null }}
                        />
                    </Animated.View>

                    <View style={{ height: height / 3, justifyContent: 'center' }}
                    >
                        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                            <Animated.View style={{
                                ...styles.button, opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                            </Animated.View>

                        </TapGestureHandler>
                        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                            <TouchableOpacity onPress={this.onPressSignUp}>
                                <Animated.View style={{
                                    ...styles.button, opacity: this.buttonOpacity,
                                    transform: [{ translateY: this.buttonY }]
                                }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN UP</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </TapGestureHandler>
                        <Animated.View style={{
                            zIndex: this.textInputZindex,
                            opacity: this.textInputOpacity,
                            transform: [{ translateY: this.textInputY }],
                            height: height / 3,
                            ...StyleSheet.absoluteFill,
                            top: null,
                            justifyContent: 'center',
                            editble: this.textInputEditable
                        }}>
                            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                                <Animated.View style={styles.closeButton}>
                                    <Animated.Text style={{ fontSize: 15, transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>X</
                                    Animated.Text>
                                </Animated.View>
                            </TapGestureHandler>
                            <TextInput
                                placeholder="EMAIL"
                                editable={this.textInputEditable}
                                style={styles.textInput}
                                placeholderTextColor="black"
                                onChangeText={email => this.setState({ email })}
                            />
                            <TextInput
                                placeholder="PASSWORD"
                                secureTextEntry
                                editable={this.textInputEditable}
                                style={styles.textInput}
                                placeholderTextColor="black"
                                onChangeText={password => this.setState({ password })}
                            />
                            <TouchableOpacity onPress={this.onPressSignIn}>
                                <Animated.View style={styles.button}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                                </Animated.View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.onPressPR}>
                                <Animated.View style={styles.textButton}>
                                    <Text style={{ fontSize: 10 }}>FORGOT PASSWORD?</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </KeyboardAvoidingView>
            </View>

        );
    }


}
export default WooApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    textButton: {
        height: 10,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    textInput: {
        backgroundColor: "#ffffff",
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    }
});

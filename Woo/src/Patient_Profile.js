import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";

// import { SafeAreaView } from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';
// var appointment
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

export default class ProfileScreen extends Component {

    user = firebase.auth().currentUser
    docRef = firebase.firestore().collection("users").doc(this.user.email);
    getUserData = () => {
        return this.docRef.get().then((doc) => {
            if (doc.exists) {
                return doc.data().first
            }
        })
    }

    fname

    render() {
        console.log('Logging here')
        this.getUserData().then(res => {
            this.fname = res
            console.log(this.fname)
        })
        return (
            <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <View style={styles.body}>
                    <Text style={styles.name}>John Doe</Text>
                    <View style={styles.bodyContent}>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#72C3C9',
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    // name: {
    //     fontSize: 22,
    //     color: "#FFFFFF",
    //     fontWeight: '600',
    // },
    body: {
        marginTop: 40,
        backgroundColor: 'blue',
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        padding: 30,
        backgroundColor: 'red',
        alignItems: 'center',
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});
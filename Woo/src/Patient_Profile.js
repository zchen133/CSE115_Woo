import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";

// import { SafeAreaView } from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';
// var appointment
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        this.state = {
            data: null,
        };

        this.updateName = this.updateName.bind(this)
        this.updateAge = this.updateAge.bind(this)
        this.updateGender = this.updateGender.bind(this)
    }

    componentDidMount() {
        this.getUserData()
    }

    updateAddress() {
        this.docRef.set({ address: 'male' }, { merge: true });
        this.getUserData()
    }

    updateGender() {
        this.docRef.set({ gender: 'male' }, { merge: true });
        this.getUserData()
    }

    updateAge() {
        this.docRef.set({ age: 29 }, { merge: true });
        this.getUserData()
    }

    updateName() {
        this.docRef.set({ first: 'Bob' }, { merge: true });
        this.getUserData()
    }

    getUserData() {
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                this.setState({ data: data })
            } else {
                this.setState({ data: null })
                console.log('No such document')
            }
        }).catch((err) => {
            this.setState({ data: null })
            console.log('Error: ', err)
        })
    }

    render() {
        if (this.state.data) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}></View>
                    <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                    <View style={styles.body}>
                        <Text style={styles.name}>{this.state.data.first + ' ' + this.state.data.last}</Text>
                    </View>
                    <ScrollView style={styles.scroll}>
                        <Button onPress={this.updateName} title='Edit Name'/>
                        <Text style={styles.name}>{'Age: ' + this.state.data.age}</Text>
                        <Button onPress={this.updateAge} title='Edit Age'/>
                        <Text style={styles.name}>{'Gender: ' + this.state.data.gender}</Text>
                        <Button onPress={this.updateGender} title='Edit Gender'/>
                        <Text style={styles.name}>{'Email: ' + this.user.email}</Text>
                        <Text style={styles.name}>{'Address: ' + this.state.data.address}</Text>
                        <Button onPress={this.updateAddress} title='Edit Address'/>
                        <View style={styles.bodyContent}>
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#72C3C9',
        height: 200,
    },
    scroll: {
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
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        textAlign: 'center',
        padding: 30,
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

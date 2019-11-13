import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";

export default class MedicalRecords extends Component {
    constructor(props) {
        super(props);
        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        this.state = {
            data: null,

        };
    }

    componentDidMount() {
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
                <SafeAreaView style={styles.container}>
                    <View style={styles.records}>
                        <Text style={styles.title}>Personal Information</Text>
                        <Text style={styles.subText}>{this.state.data.first + ' ' + this.state.data.last}</Text>
                        <Text style={styles.subText}>{this.state.data.address}</Text>
                        <Text style={styles.title}>Medical History</Text>
                        <Text style={styles.title}>Family Medical History</Text>
                        <Text style={styles.title}>Medication History</Text>
                        <Text style={styles.title}>Treatment History</Text>
                        <Button onPress={() => { this.props.navigation.navigate('PatientHomepage') } } title='Go back' />
                    </View>
                </SafeAreaView>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#72C3C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    records: {
        width: '95%',
        height: '95%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    title: {
        paddingLeft: 15,
        paddingTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    subText: {
        paddingLeft: 15,
        paddingTop: 10,
        fontSize: 15,
        color: 'grey'
    },
});
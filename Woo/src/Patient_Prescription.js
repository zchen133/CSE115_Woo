import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
import Block from './components.js'
import { initialEmail } from './Loading.js';
export default class Patient_PrescriptionScreen extends Component {
    constructor() {
        super()
        this.state = {
            prescription: []
        }
    }

    componentDidMount() {
        this.getPrescription()

        //firebase.firestore().collection("hospital").doc("Slug Hospital").collection("Departments").doc(this.state.selectedDepartment).collection("Doctors").doc(this.state.selectedDoctor).collection("Appointments").doc(selected).get()
    }

    getPrescription() {

        new_array = [];
        firebase.firestore().collection("users").doc(initialEmail).collection("prescriptions").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var id = doc.id
                var medicine_des = doc.get("medicine_des")
                var medicine_instrution = doc.get("medicine_instrution")
                var medicine_name = doc.get("medicine_name")
                var medicine_quantity = doc.get("medicine_quantity")
                var medicine_time = doc.get("medicine_time")
                var selectedQuantity = doc.get("selectedQuantity")
                var selectedTimeQuantity = doc.get("selectedTimeQuantity")

                var app = { id: id, medicine_des: medicine_des, medicine_instrution: medicine_instrution, medicine_name: medicine_name, medicine_quantity: medicine_quantity, medicine_time: medicine_time, selectedQuantity: selectedQuantity, selectedTimeQuantity: selectedTimeQuantity }




                new_array.push(app);
            });
            this.setState({ prescription: new_array })
        })


    }


    renderList(prescription) {

        return (
            <Block card style={{ height: 250, width: 300, marginTop: 50, backgroundColor: '#c9d6df' }}>
                <Block flex={0.35} row style={{ alignSelf: 'center', borderRadius: 10, justifyContent: 'center', marginTop: 10, borderColor: '#52616b', borderWidth: 1, width: '85%', backgroundColor: '#f0f5f9' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, color: '#52616b' }}>{prescription.medicine_name}</Text>
                </Block>
                <Text style={{ marginTop: 10, fontSize: 15, color: '#000000', marginLeft: 20 }}>{'Dosage:\n' + prescription.medicine_quantity + ' ' + prescription.selectedQuantity + ' every ' + prescription.medicine_time + ' ' + prescription.selectedTimeQuantity}</Text>
                <Text style={{ marginTop: 10, fontSize: 15, color: '#000000', marginLeft: 20 }}>{'Description:\n'+ prescription.medicine_des}</Text>
                <Text style={{ marginTop: 10, fontSize: 15, color: '#000000', marginLeft: 20 }}>{'Other instructions:\n'+ prescription.medicine_instrution}</Text>
            </Block>
        );

    }

    render() {
        return (
            <Block style={styles.container}>
                <Image
                    source={require('../assets/medicine.png')}
                    style={{ height: 200, width: 200, alignSelf: 'center', marginTop: 50, alignItems: 'center', alignContent: 'center', marginBottom: 20 }}>
                </Image>
                
                <Text style={{ fontSize: 35, fontWeight: "bold" }}>Prescription</Text>

                <ScrollView showsVerticalScrollIndicator={true}>
                    {this.state.prescription.map(prescription => (
                        <TouchableOpacity activeOpacity={0.8} key={`${prescription.medicine_name}`}
                            onPress={event => { }}>
                            {this.renderList(prescription)}
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',

        alignItems: 'center',

    },
    items: {
        alignSelf: 'center',
        width: '90%',

        padding: 20,
        marginBottom: 15
    }
});
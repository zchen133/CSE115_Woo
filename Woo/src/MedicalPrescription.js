import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox, KeyboardAvoidingView, Picker } from 'react-native';
import * as firebase from "firebase";
import Block from './components';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown'
import Toast from 'react-native-tiny-toast';


export default class PrescriptionScreen extends Component {

    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.user = firebase.auth().currentUser


        this.state = {
            isModalVisible: false,
            patientExist: false,
            patientEmail: 'null',
            quantityList: [{ value: "mg" }, { value: "mL" }, { value: "capsule" }, { value: "tablets" }, { value: "puffs" }],
            timeQuantityList: [{ value: "hours" }, { value: "days" }, { value: "weeks" }],
            selectedQuantity: "null",
            selectedTimeQuantity: 'null',
            medicine_name: '',
            medicine_des: '',
            medicine_quantity: '',
            medicine_time: '',
            medicine_instrution: ''
        };
    }
    openModal = () => {
        this.patientRef = firebase.firestore().collection("users").doc(this.state.patientEmail).get().then((doc) => {
            if (doc.exists) {
                if(doc.get("accountType")==1){

                
                this.setState({ patientExist: true })
                this.setState({ isModalVisible: true })
            }
            else{
                Toast.show("It's not a patient account")
            }
            }
            else {
                Toast.show("patient doesn't exist")
            }
        })


    };
    submitModal = () => {
        if (this.state.medicine_name != '') {


            firebase.firestore().collection("users").doc(this.state.patientEmail).collection("prescriptions").doc(this.state.medicine_name).set({

                medicine_name: this.state.medicine_name,
                medicine_des: this.state.medicine_des,
                medicine_quantity: this.state.medicine_quantity,
                selectedQuantity: this.state.selectedQuantity,
                medicine_time: this.state.medicine_time,
                selectedTimeQuantity: this.state.selectedTimeQuantity,
                medicine_instrution: this.state.medicine_instrution

            }).then(() => {
                this.setState({ medicine_name: '', medicine_des: '', medicine_instrution: '', medicine_quantity: '', medicine_time: '', selectedQuantity: '', selectedTimeQuantity: '' })
                this.setState({ isModalVisible: false });
                Toast.show("Added successfully")
            })
        }
        else {
            Toast.show("Please enter the medicine name")
        }

    }
    render() {
        return (
            <Block>

                <Block style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'flex-end' }} >

                    <View style={styles.reqAll}>

                        <Image
                            source={require('../assets/medicine.png')}
                            style={{ height: 200, width: 200, alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginBottom: 20 }}>
                        </Image>

                        <Text style={{ fontSize: 35, fontWeight: "bold" }}>Prescription</Text>
                        <Text style={{ fontSize: 20 }}>Please enter the email for the patient</Text>
                        <Text style={{ fontSize: 20, marginTop: 30 }}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Patient Email'
                            autoCapitalize="none"
                            onChangeText={patientEmail => this.setState({ patientEmail })}

                        />

                    </View>

                    <TouchableOpacity onPress={this.openModal}>
                        <View style={styles.button}>
                            <Text style={{ fontSize: 20 }}>Prescription</Text>
                        </View>
                    </TouchableOpacity>

                </Block>
                <Modal style={{ marginHorizontal: 20, marginVertical: 90 }}
                    scrollHorizontal={true}
                    avoidKeyboard={false}
                    backdropOpacity={0.3}
                    onSwipeComplete={() => this.setState({ isModalVisible: false })}
                    swipeDirection='right'
                    isVisible={this.state.isModalVisible}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                >
                    <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 10 }}>
                        <View style={styles.reqAll}>
                            <Text style={{ fontSize: 20, marginTop: 0 }}>Medicine Name</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='medicine name'
                                autoCapitalize="none"
                                onChangeText={medicine_name => this.setState({ medicine_name })} />
                            <Text style={{ fontSize: 20, marginTop: 30 }}>Medicine Description</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='description'
                                autoCapitalize="none"
                                onChangeText={medicine_des => this.setState({ medicine_des })} />
                            <Text style={{ fontSize: 20, marginTop: 30 }}>Dosage</Text>
                            <Block flex={false} row style={{}}>
                                <TextInput
                                    style={{
                                        width: '10%',
                                        fontSize: 20,
                                        borderBottomWidth: 1,
                                        marginRight: 10
                                    }}
                                    placeholder='amount'
                                    autoCapitalize="none"
                                    onChangeText={medicine_quantity => this.setState({ medicine_quantity })} />

                                <Dropdown
                                    containerStyle={styles.pickerContainer}
                                    pickerStyle={styles.pickerContent}
                                    label="quantity"
                                    data={this.state.quantityList}
                                    onChangeText={(selected) => (this.setState({ selectedQuantity: selected }))}
                                />
                                <Text style={{ alignSelf: "center", marginRight: 10 }}>every</Text>
                                <TextInput
                                    style={{
                                        width: '10%',
                                        //height:15,
                                        fontSize: 20,
                                        borderBottomWidth: 1,
                                        marginRight: 10
                                    }}
                                    placeholder='amount'
                                    autoCapitalize="none"
                                    onChangeText={medicine_time => this.setState({ medicine_time })} />
                                <Dropdown
                                    containerStyle={styles.pickerContainer}
                                    pickerStyle={styles.pickerContent}
                                    label="quantity"
                                    data={this.state.timeQuantityList}
                                    onChangeText={(selected) => (this.setState({ selectedTimeQuantity: selected }))}
                                />
                            </Block>
                            <Text style={{ fontSize: 20, marginTop: 30 }}>Other Instruction</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='instruction'
                                autoCapitalize="none"
                                onChangeText={medicine_instrution => this.setState({ medicine_instrution })} />


                        </View>
                        <TouchableOpacity onPress={this.submitModal}>

                            <View style={styles.button}>
                                <Text style={{ fontSize: 20 }}>Submit</Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                </Modal>

            </Block>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#72C3C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reqAll: {
        borderRadius: 20,
        height: '90%',
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'flex-start',
        //justifyContent: 'center',
        //marginLeft: 45,
        paddingTop: 30

    },
    button: {
        backgroundColor: 'white',
        height: 50,
        width: "90%",
        marginHorizontal: 20,
        borderRadius: 10,
        //marginLeft: 50,
        //marginRight: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginBottom: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
    },
    textInput: {
        width: '90%',
        fontSize: 20,
        borderBottomWidth: 1

        // marginTop:30
    },
    pickerContainer: {
        // height: 40,
        // alignItems: 'stretch',
        //alignSelf:'flex-end',
        backgroundColor: 'white',
        width: "30%",
        marginRight: 10
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        //marginBottom: 30,
        //marginLeft: 50,
        //marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
    },
    pickerContent: {
        // height: 40,

        // alignItems: 'stretch',
        //alignSelf:'flex-end',
        backgroundColor: 'white',
        width: "25%",
        marginRight: 10
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        //marginBottom: 20,
        //marginLeft: 50,
        //marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
    }
})

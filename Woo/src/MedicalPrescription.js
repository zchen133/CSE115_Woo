import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox, KeyboardAvoidingView, Picker } from 'react-native';
import * as firebase from "firebase";
import Block from './components';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown'

export default class PrescriptionScreen extends Component {

    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.user = firebase.auth().currentUser

        
        this.state = {
            isModalVisible: false,
            quantityList: [{ value: "mg" }, { value: "mL" }, { value: "capsule" }, { value: "tablets" }, { value: "puffs" }],
            timeQuantityList: [{ value: "hours" }, { value: "days" }, { value: "weeks" }],
            selectedQuantity: "null"
        };
    }
    toggleModal = () => {
        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    render() {
        return (
            <Block>

                <Block style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'flex-end' }} >

                    <View style={styles.reqAll}>
                        <Image
                        source={require('../assets/prescription.png')}
                        style={{ height: 200, width: 200 ,alignSelf: 'center', alignItems:'center',alignContent:'center',marginBottom:20}}>
                        </Image>
                        <Text style={{ fontSize: 35, fontWeight: "bold" }}>Prescription</Text>
                        <Text style={{ fontSize: 20 }}>Please enter the email for the patient</Text>
                        <Text style={{ fontSize: 20, marginTop: 30 }}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Patient Email'
                            autoCapitalize="none"

                        //multiline={true} SOURCE OF RETURN BUG
                        //onChangeText={description => this.setState({ description })}
                        //value={this.state.description}
                        />

                    </View>

                    <TouchableOpacity onPress={this.toggleModal}>
                        <View style={styles.button}>
                            <Text style={{ fontSize: 20 }}>Prescription</Text>
                        </View>
                    </TouchableOpacity>

                </Block>
                <Modal style={{ marginHorizontal: 20, marginVertical: 90 }} backdropOpacity={0.3} isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 10 }}>
                        <View style={styles.reqAll}>
                            <Text style={{ fontSize: 20, marginTop: 0 }}>Medicine Name</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='medicine name'
                                autoCapitalize="none" />
                            <Text style={{ fontSize: 20, marginTop: 30 }}>Medicine Description</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='description'
                                autoCapitalize="none" />
                            <Text style={{ fontSize: 20, marginTop: 30 }}>Dosage</Text>    
                            <Block flex={false} row style={{}}>
                                <TextInput
                                    style={{
                                        width: '10%',
                                        fontSize: 20,
                                        borderBottomWidth: 1,
                                        marginRight:10
                                    }}
                                    placeholder='amount'
                                    autoCapitalize="none" />
                              
                                <Dropdown
                                    containerStyle={styles.pickerContainer}
                                    pickerStyle={styles.pickerContent}
                                    label="quantity"
                                    data={this.state.quantityList}
                                    onChangeText={(selected) => (this.setState({ selectedQuantity: selected }))}
                                />
                                <Text style = {{alignSelf:"center",marginRight:10}}>every</Text>
                                <TextInput
                                    style={{
                                        width: '10%',
                                        //height:15,
                                        fontSize: 20,
                                        borderBottomWidth: 1,
                                        marginRight:10
                                    }}
                                    placeholder='amount'
                                    autoCapitalize="none" />
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
                                autoCapitalize="none" />
                        </View>
                        <Button title="Submit" onPress={this.toggleModal} />
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
    }, textInput: {
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
        marginRight:10
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
        marginRight:10
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        //marginBottom: 20,
        //marginLeft: 50,
        //marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
    }
})
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, ScrollView, YellowBox } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import { initialEmail } from './Loading.js';
import Block from './components';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown'
import Toast from 'react-native-tiny-toast';



export default class RecordScreen extends Component {

    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email)

        this.state = {
            isModalVisible: false,
            isMedicalHistoryModalVisible: false,
            isMedicationHistoryModalVisible: false,
            isTreatmentHistoryModalVisible: false,
            patientExist: false,
            patientEmail: 'null',
            quantityList: [{ value: "mg" }, { value: "mL" }, { value: "capsule" }, { value: "tablets" }, { value: "puffs" }],
            timeQuantityList: [{ value: "hours" }, { value: "days" }, { value: "weeks" }],
            selectedQuantity: "null",
            Patient: 'Patient', MedicalDirectives: 'MedicalDirectives', TreatmentHistory: 'Treatment History', MedicationHistory: 'Medication History', FamilyMedicalHistory: 'Family Medical History', MedicalHistory: 'Medical History', PersonalInformation: 'Personal Information', email: '', name: '', social: '123-456-7890', address: '', allergies: '', previousDiagnoses: '', heartDisease: '', cancers: '', other: '', herbal: '', alternative: '', otc: '', prescriptions: '', therapyWork: '', therapyFail: '', wishes: '', err: null
        };
    }
    openModal = () => {
        this.patientRef = firebase.firestore().collection("users").doc(this.state.patientEmail).get().then((doc) => {
            if (doc.exists) {
                this.setState({ name: doc.get("first") + " " + doc.get("last") })
                this.setState({ address: doc.get("address") })
                this.setState({ patientExist: true })
                this.setState({ isModalVisible: true })
            }
            else {
                Toast.show("patient doesn't exist")
            }
        })
    };

    submitModal = () => {
        this.prescriptionRef = firebase.firestore().collection("users").doc(this.state.patientEmail).collection("prescriptions").get().then((doc) => {

        })
        //console.log('reffff'+this.prescriptionRef)
        this.setState({ isModalVisible: false });
    };
    openMedicalHistoryModal = () => {
        this.patientRef = firebase.firestore().collection("users").doc(this.state.patientEmail).get().then((doc) => {
            if (doc.exists) {
                this.setState({ email: this.state.patientEmail })
                this.setState({ name: doc.get("first") + " " + doc.get("last") })
                this.setState({ address: doc.get("address") })
                this.setState({ patientExist: true })
                this.setState({ isMedicalHistoryModalVisible: true })
            }
            else {
                Toast.show("patient doesn't exist")
            }
        })
    };
    submitMedicalHistoryModal = () => {
        // this.prescriptionRef = firebase.firestore().collection("users").doc(this.state.patientEmail).collection("prescriptions").get().then((doc) => {
        this.setState({ isMedicalHistoryModalVisible: false });
    };
    openMedicationHistoryModal = () => {
        this.patientRef = firebase.firestore().collection("users").doc(this.state.patientEmail).get().then((doc) => {
            if (doc.exists) {
                this.setState({ email: this.state.patientEmail })
                this.setState({ name: doc.get("first") + " " + doc.get("last") })
                this.setState({ address: doc.get("address") })
                this.setState({ patientExist: true })
                this.setState({ isMedicationHistoryModalVisible: true })
            }
            else {
                Toast.show("patient doesn't exist")
            }
        })
    };
    submitMedicationHistoryModal = () => {
        // this.prescriptionRef = firebase.firestore().collection("users").doc(this.state.patientEmail).collection("prescriptions").get().then((doc) => {
        this.setState({ isMedicationHistoryModalVisible: false });
    };
    openTreatmentHistoryModal = () => {
        this.patientRef = firebase.firestore().collection("users").doc(this.state.patientEmail).get().then((doc) => {
            if (doc.exists) {
                this.setState({ email: this.state.patientEmail })
                this.setState({ name: doc.get("first") + " " + doc.get("last") })
                this.setState({ address: doc.get("address") })
                this.setState({ patientExist: true })
                this.setState({ isTreatmentHistoryModalVisible: true })
            }
            else {
                Toast.show("patient doesn't exist")
            }
        })
    };
    submitTreatmentHistoryModal = () => {
        // this.prescriptionRef = firebase.firestore().collection("users").doc(this.state.patientEmail).collection("prescriptions").get().then((doc) => {
        this.setState({ isTreatmentHistoryModalVisible: false });
    };
    clearfields = () => {
        this.setState({ email: '' })
        this.setState({ name: '' })
        this.setState({ social: '123-456-7890' })
        this.setState({ address: '' })
        this.setState({ allergies: '' })
        this.setState({ previousDiagnoses: '' })
        this.setState({ heartDisease: '' })
        this.setState({ cancers: '' })
        this.setState({ other: '' })
        this.setState({ herbal: '' })
        this.setState({ alternative: '' })
        this.setState({ otc: '' })
        this.setState({ prescriptions: '' })
        this.setState({ therapyWork: '' })
        this.setState({ therapyFail: '' })
        this.setState({ wishes: '' })
    }
    handleRecordInput = () => {
        var dataEmail = this.state.email;
        var dataName = this.state.name;
        var dataSocial = this.state.social;
        var dataAddress = this.state.address;
        var dataPersonal = this.state.PersonalInformation;
        var dataAllergies = this.state.allergies;
        var datapreviousDiagnoses = this.state.previousDiagnoses;
        var dataMedicalHistory = this.state.MedicalHistory;
        var dataHeartDisease = this.state.heartDisease;
        var dataCancers = this.state.cancers;
        var dataOther = this.state.other;
        var dataFamilyMedicalHistory = this.state.FamilyMedicalHistory;
        var dataHerbal = this.state.herbal;
        var dataAlternative = this.state.alternative;
        var dataOTC = this.state.otc;
        var dataPrescription = this.state.prescriptions;
        var dataMedicationHistory = this.state.MedicationHistory;
        var dataTherapyWork = this.state.therapyWork;
        var dataTherapyFail = this.state.therapyFail;
        var dataTreatmentHistory = this.state.TreatmentHistory;
        var dataWishes = this.state.wishes;
        var dataMedicalDirectives = this.state.MedicalDirectives;
        //var permissionRef = firebase.firestore().collection("users").doc(initialEmail);

        this.docRef.get().then((doc) => {
            if (doc.exists) {
                if (doc.get('accountType') !== '4') {
                    console.log('Incorrect permissions')
                    Toast.show('You are not permitted to edit medical records')
                } else {

                    if (dataEmail == '') {
                        console.log('No email given');
                        Toast.show('Please enter email');
                        return;
                    }
                    if (dataName == '') {
                        console.log('No name given');
                        Toast.show('Please enter name');
                        return;
                    }

                    if (dataSocial == '') {
                        console.log('No Social SSN given');
                        Toast.show('Please enter Social Security Number');
                        return;
                    }

                    if (dataAddress == '') {
                        console.log('No address given');
                        Toast.show('Please enter address');
                        return;
                    }
                    if (dataAllergies == '') {
                        console.log('No allergies given');
                        Toast.show('Please enter allergy info');
                        return;
                    }

                    if (datapreviousDiagnoses == '') {
                        console.log('No previous Diagnoses given');
                        Toast.show('Please enter previous diagnoses');
                        return;
                    }
                    if (dataHeartDisease == '') {
                        console.log('No heart disease given');
                        Toast.show('Please enter heart disease information');
                        return;
                    }
                    if (dataCancers == '') {
                        console.log('No cancer info given');
                        Toast.show('Please enter cancer information');
                        return;
                    }
                    if (dataOther == '') {
                        console.log('No other given');
                        Toast.show('Please fill empty fields');
                        return;
                    }
                    if (dataHerbal == '') {
                        console.log('No herbal given');
                        Toast.show('Please enter herbal information');
                        return;
                    }
                    if (dataAlternative == '') {
                        console.log('No alternative given');
                        Toast.show('Please enter alternative medicine information');
                        return;
                    }
                    if (dataOTC == '') {
                        console.log('No otc given');
                        Toast.show('Please enter over-the-counter information');
                        return;
                    }
                    if (dataPrescription == '') {
                        console.log('No prescriptions given');
                        Toast.show('Please enter prescription information');
                        return;
                    }
                    if (dataTherapyWork == '') {
                        console.log('No working therapy given');
                        Toast.show('Please enter working therapy');
                        return;
                    }
                    if (dataTherapyFail == '') {
                        console.log('No failing therapy given');
                        Toast.show('Please enter failing therapy');
                        return;
                    }
                    if (dataWishes == '') {
                        console.log('No wishes given');
                        Toast.show('Please fill blank fields');
                        return;
                    }

                    /* Grab user email and add medical record to user in database */
                    const recordRef = firebase.firestore().collection("users").doc(dataEmail).collection("records")
                    recordRef.doc(dataPersonal).set({
                        name: dataName,
                        social: dataSocial,
                        address: dataAddress,
                    })

                    recordRef.doc(dataMedicalHistory).set({
                        allergies: dataAllergies,
                        previousDiagnoses: datapreviousDiagnoses,
                    })
                    recordRef.doc(dataFamilyMedicalHistory).set({
                        heartDisease: dataHeartDisease,
                        cancers: dataCancers,
                        other: dataOther,
                    })
                    recordRef.doc(dataMedicationHistory).set({
                        herbal: dataHerbal,
                        alternative: dataAlternative,
                        otc: dataOTC,
                        prescriptions: dataPrescription,
                    })
                    recordRef.doc(dataTreatmentHistory).set({
                        therapyWork: dataTherapyWork,
                        therapyFail: dataTherapyFail,

                    })

                    recordRef.doc(dataMedicalDirectives).set({
                        wishes: dataWishes,
                    })





                    /* Grab doctor's hospital and store medical record under user's name */

                    var docRef = firebase.firestore().collection("users").doc(initialEmail);


                    docRef.get().then(function (doc) {
                        if (doc.exists) {

                            const patientRef = firebase.firestore().collection("hospital").doc(doc.get('hospital')).collection("Patients")
                            patientRef.doc(dataEmail).set({
                                email: dataEmail,
                            })

                            const hospRef = firebase.firestore().collection("hospital").doc(doc.get('hospital')).collection("Patients").doc(dataEmail).collection("records")
                            hospRef.doc(dataPersonal).set({
                                name: dataName,
                                social: dataSocial,
                                address: dataAddress,
                            })

                            hospRef.doc(dataMedicalHistory).set({
                                allergies: dataAllergies,
                                previousDiagnoses: datapreviousDiagnoses,
                            })
                            hospRef.doc(dataFamilyMedicalHistory).set({
                                heartDisease: dataHeartDisease,
                                cancers: dataCancers,
                                other: dataOther,
                            })
                            hospRef.doc(dataMedicationHistory).set({
                                herbal: dataHerbal,
                                alternative: dataAlternative,
                                otc: dataOTC,
                                prescriptions: dataPrescription,
                            })
                            hospRef.doc(dataTreatmentHistory).set({
                                therapyWork: dataTherapyWork,
                                therapyFail: dataTherapyFail,

                            })
                            hospRef.doc(dataMedicalDirectives).set({
                                wishes: dataWishes,
                            })
                        }
                    })
                    this.clearfields();
                    Toast.show('Record Stored');
                }
            }
        })
    }

    render() {
        return (
            <Block>

                <Block style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'flex-end' }} >

                    <View style={styles.mainScreen}>
                        <Image
                            source={require('../assets/prescription.png')}
                            style={{ height: 200, width: 200, alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginBottom: 20 }}>
                        </Image>
                        <Text style={{ fontSize: 35, fontWeight: "bold" }}>Medical Record</Text>
                        <Text style={{ fontSize: 20 }}>Please enter the email for the patient</Text>
                        <Text style={{ fontSize: 20, marginTop: 30 }}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Patient Email'
                            autoCapitalize="none"
                            onChangeText={patientEmail => this.setState({ patientEmail })}


                        //multiline={true} SOURCE OF RETURN BUG
                        //onChangeText={description => this.setState({ description })}
                        //value={this.state.description}
                        />

                    </View>

                    <TouchableOpacity onPress={this.openMedicalHistoryModal}>
                        <View style={styles.button}>
                            <Text style={{ fontSize: 20 }}>Medical History</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={this.submitModal}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 20 }}>Family Medical History</Text>
                            </View>
                        </TouchableOpacity> */}
                    <TouchableOpacity onPress={this.openMedicationHistoryModal}>
                        <View style={styles.button}>
                            <Text style={{ fontSize: 20 }}>Medication History</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openTreatmentHistoryModal}>
                        <View style={styles.button}>
                            <Text style={{ fontSize: 20 }}>Treatment History</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={this.submitModal}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 20 }}>Medical Directives</Text>
                            </View>
                        </TouchableOpacity> */}
                    <TouchableOpacity onPress={this.handleRecordInput}>
                        <View style={styles.button}>
                            <Text style={{ fontSize: 20 }}>Submit</Text>
                        </View>
                    </TouchableOpacity>

                </Block>

                <Modal style={{ marginHorizontal: 20, marginVertical: 90 }}
                    scrollHorizontal={true}
                    avoidKeyboard={false}
                    backdropOpacity={0.3}
                    onSwipeComplete={() => this.setState({ isMedicalHistoryModalVisible: false })}
                    swipeDirection='right'
                    isVisible={this.state.isMedicalHistoryModalVisible}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}>
                    <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 10 }}>
                        <View style={styles.model}>
                            <Text style={{ fontSize: 20, marginTop: 0 }}>Allergies</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Allergies'
                                autoCapitalize="none"
                                value={this.state.allergies}
                                onChangeText={allergies => this.setState({ allergies })} />
                            <Text style={{ fontSize: 20, marginTop: 20 }}>Previous Diagnoses</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Previous Diagnoses'
                                autoCapitalize="none"
                                value={this.state.previousDiagnoses}
                                onChangeText={previousDiagnoses => this.setState({ previousDiagnoses })} />
                            <Text style={{ fontSize: 20, marginTop: 20 }}>Family History - Heart Disease</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Heart Disease'
                                autoCapitalize="none"
                                value={this.state.heartDisease}
                                onChangeText={heartDisease => this.setState({ heartDisease })} />
                            <Text style={{ fontSize: 20, marginTop: 20 }}>Family History - Cancers</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Cancers'
                                autoCapitalize="none"
                                value={this.state.cancers}
                                onChangeText={cancers => this.setState({ cancers })} />
                            <Text style={{ fontSize: 20, marginTop: 20 }}>Family History - Other Disease</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Previous Diagnoses'
                                autoCapitalize="none"
                                value={this.state.other}
                                onChangeText={other => this.setState({ other })} />
                        </View>
                        <TouchableOpacity onPress={this.submitMedicalHistoryModal}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 20 }}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal style={{ marginHorizontal: 20, marginVertical: 90 }}
                    scrollHorizontal={true}
                    avoidKeyboard={false}
                    backdropOpacity={0.3}
                    onSwipeComplete={() => this.setState({ isMedicationHistoryModalVisible: false })}
                    swipeDirection='right'
                    isVisible={this.state.isMedicationHistoryModalVisible}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}>
                    <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 10 }}>
                        <View style={styles.model}>
                            <Text style={{ fontSize: 20, marginTop: 0 }}>Herbal</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Herbal'
                                autoCapitalize="none"
                                value={this.state.herbal}
                                onChangeText={herbal => this.setState({ herbal })} />
                            <Text style={{ fontSize: 20, marginTop: 30 }}>Alternative</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Alternative'
                                autoCapitalize="none"
                                value={this.state.alternative}
                                onChangeText={alternative => this.setState({ alternative })} />
                            <Text style={{ fontSize: 20, marginTop: 30 }}>OTC</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='OTC'
                                autoCapitalize="none"
                                value={this.state.otc}
                                onChangeText={otc => this.setState({ otc })} />
                            <Text style={{ fontSize: 20, marginTop: 30 }}>Prescriptions</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Prescriptions'
                                autoCapitalize="none"
                                value={this.state.prescriptions}
                                onChangeText={prescriptions => this.setState({ prescriptions })} />
                        </View>
                        <TouchableOpacity onPress={this.submitMedicationHistoryModal}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 20 }}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal style={{ marginHorizontal: 20, marginVertical: 90 }}
                    scrollHorizontal={true}
                    avoidKeyboard={false}
                    backdropOpacity={0.3}
                    onSwipeComplete={() => this.setState({ isTreatmentHistoryModalVisible: false })}
                    swipeDirection='right'
                    isVisible={this.state.isTreatmentHistoryModalVisible}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}>
                    <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 10 }}>
                        <View style={styles.model}>
                            <Text style={{ fontSize: 20, marginTop: 0 }}>Working Therapy</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Working Therapy'
                                autoCapitalize="none"
                                value={this.state.therapyWork}
                                onChangeText={therapyWork => this.setState({ therapyWork })} />
                            <Text style={{ fontSize: 20, marginTop: 30 }}>Failing Therapy</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Failing Therapy'
                                autoCapitalize="none"
                                value={this.state.therapyFail}
                                onChangeText={therapyFail => this.setState({ therapyFail })} />
                            <Text style={{ fontSize: 20, marginTop: 30 }}>Medical Directives</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Wishes'
                                autoCapitalize="none"
                                value={this.state.wishes}
                                onChangeText={wishes => this.setState({ wishes })} />
                        </View>
                        <TouchableOpacity onPress={this.submitTreatmentHistoryModal}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 20 }}>Save</Text>
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
    mainScreen: {
        borderRadius: 20,
        height: '63%',
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'flex-start',
        //justifyContent: 'center',
        //marginLeft: 45,
        paddingTop: 30
    },
    model: {
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

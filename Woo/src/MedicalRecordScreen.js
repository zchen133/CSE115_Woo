import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Modal, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import { initialEmail } from './Loading.js';
import Toast from 'react-native-tiny-toast';



export default class RecordScreen extends Component {

    state = { MedicalDirectives: 'MedicalDirectives', TreatmentHistory: 'Treatment History', MedicationHistory: 'Medication History', FamilyMedicalHistory: 'Family Medical History', MedicalHistory: 'Medical History', PersonalInformation: 'Personal Information', email: '', name: '', social: '', address: '', allergies: '', previousDiagnoses: '', heartDisease: '', cancers: '', other: '', herbal: '', alternative: '', otc: '', prescriptions: '', therapyWork: '', therapyFail: '', wishes: '', err: null }

    constructor(props) {
        super(props);
        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email)
    };


    clearfields = () => {
        this.setState({ email: '' })
        this.setState({ name: '' })
        this.setState({ social: '' })
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
        
                if (this.state.email == '') {
                    console.log('No email given');
                    Toast.show('Please enter email');
                    return;
                }
                if (this.state.name == '') {
                    console.log('No name given');
                    Toast.show('Please enter name');
                    return;
                }
        
                if (this.state.social == '') {
                    console.log('No Social SSN give');
                    Toast.show('Please enter Social Security Number');
                    return;
                }
        
                if (this.state.address == '') {
                    console.log('No address given');
                    Toast.show('Please enter address');
                    return;
                }
                if (this.state.allergies == '') {
                    console.log('No allergies given');
                    Toast.show('Please enter allergy info');
                    return;
                }
                
                if (this.state.previousDiagnoses == '') {
                    console.log('No previous Diagnoses given');
                    Toast.show('Please enter previous diagnoses');
                    return;
                }
                if (this.state.heartDisease == '') {
                    console.log('No heart disease given');
                    Toast.show('Please enter heart disease information');
                    return;
                }
                if (this.state.cancers == '') {
                    console.log('No cancer info given');
                    Toast.show('Please enter cancer information');
                    return;
                }
                if (this.state.other == '') {
                    console.log('No other given');
                    Toast.show('Please fill empty fields');
                    return;
                }
                if (this.state.herbal == '') {
                    console.log('No herbal given');
                    Toast.show('Please enter herbal information');
                    return;
                }
                if (this.state.alternative == '') {
                    console.log('No alternative given');
                    Toast.show('Please enter alternative medicine information');
                    return;
                }
                if (this.state.otc == '') {
                    console.log('No otc given');
                    Toast.show('Please enter over-the-counter information');
                    return;
                }
                if (this.state.prescriptions == '') {
                    console.log('No prescriptions given');
                    Toast.show('Please enter prescription information');
                    return;
                }
                if (this.state.therapyWork == '') {
                    console.log('No working therapy given');
                    Toast.show('Please enter working therapy');
                    return;
                }
                if (this.state.therapyFail == '') {
                    console.log('No failing therapy given');
                    Toast.show('Please enter failing therapy');
                    return;
                }
                if (this.state.wishes == '') {
                    console.log('No wishes given');
                    Toast.show('Please fill blank fields');
                    return;
                }
                

        /* Grab user email and add medical record to user in database */
        const recordRef = firebase.firestore().collection("users").doc(this.state.email).collection("records")
        recordRef.doc(this.state.PersonalInformation).set({
            name: this.state.name,
            social: this.state.social,
            address: this.state.address,
        })

        recordRef.doc(this.state.MedicalHistory).set({
            allergies: this.state.allergies,
            previousDiagnoses: this.state.previousDiagnoses,
        })
        recordRef.doc(this.state.FamilyMedicalHistory).set({
            heartDisease: this.state.heartDisease,
            cancers: this.state.cancers,
            other: this.state.other,
        })
        recordRef.doc(this.state.MedicationHistory).set({
            herbal: this.state.herbal,
            alternative: this.state.alternative,
            otc: this.state.otc,
            prescriptions: this.state.prescriptions,
        })
        recordRef.doc(this.state.TreatmentHistory).set({
            therapyWork: this.state.therapyWork,
            therapyFail: this.state.therapyFail,

        })

        recordRef.doc(this.state.MedicalDirectives).set({
            wishes: this.state.wishes,
        })
        

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
            } else {
                console.log("No such document");

            }
        })
            Toast.show('Record Stored');

        }

    render() {

            return(
            <View style = {{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'flex-end' }} >
        <View style={{ ...StyleSheet.absoluteFill }}>
            <Image
                source={require('../assets/nb.jpg')}
                style={{ flex: 1, height: null, width: null }}
                blurRadius={5}
            />
        </View>
        <SafeAreaView>
            <ScrollView>
                <TextInput
                    placeholder='Patient Email'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />

                <Text numberOfLines={1} style={styles.recordFields}>
                    {this.state.PersonalInformation}
                </Text>

                <TextInput
                    placeholder='Name'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                />
                <TextInput
                    placeholder='Social Security Number'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={social => this.setState({ social })}
                    value={this.state.social}
                />
                <TextInput
                    placeholder='Address'
                    autoCapitalize="none"
                    style={styles.input}
                    multiline={false}
                    onChangeText={address => this.setState({ address })}
                    value={this.state.address}
                />

                <Text numberOfLines={1} style={styles.recordFields}>
                    {this.state.MedicalHistory}
                </Text>

                <TextInput
                    placeholder='Allergies'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={allergies => this.setState({ allergies })}
                    value={this.state.allergies}
                />

                <TextInput
                    placeholder='Previous Diagnoses'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={previousDiagnoses => this.setState({ previousDiagnoses })}
                    value={this.state.previousDiagnoses}
                />


                <Text numberOfLines={1} style={styles.recordFields}>
                    {this.state.FamilyMedicalHistory}
                </Text>

                <TextInput
                    placeholder='Heart Disease'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={heartDisease => this.setState({ heartDisease })}
                    value={this.state.heartDisease}
                />

                <TextInput
                    placeholder='Cancers'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={cancers => this.setState({ cancers })}
                    value={this.state.cancers}
                />

                <TextInput
                    placeholder='Other'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={other => this.setState({ other })}
                    value={this.state.other}
                />

                <Text numberOfLines={1} style={styles.recordFields}>
                    {this.state.MedicationHistory}
                </Text>

                <TextInput
                    placeholder='Herbal'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={herbal => this.setState({ herbal })}
                    value={this.state.herbal}
                />

                <TextInput
                    placeholder='Alternative'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={alternative => this.setState({ alternative })}
                    value={this.state.alternative}
                />

                <TextInput
                    placeholder='OTC'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={otc => this.setState({ otc })}
                    value={this.state.otc}
                />

                <TextInput
                    placeholder='Prescriptions'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={prescriptions => this.setState({ prescriptions })}
                    value={this.state.prescriptions}
                />

                <Text numberOfLines={1} style={styles.recordFields}>
                    {this.state.TreatmentHistory}
                </Text>

                <TextInput
                    placeholder='Working Therapy'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={therapyWork => this.setState({ therapyWork })}
                    value={this.state.therapyWork}
                />

                <TextInput
                    placeholder='Failing Therapy'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={therapyFail => this.setState({ therapyFail })}
                    value={this.state.therapyFail}
                />

                <Text numberOfLines={1} style={styles.recordFields}>
                    {this.state.MedicalDirectives}
                </Text>

                <TextInput
                    placeholder='Wishes'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={wishes => this.setState({ wishes })}
                    value={this.state.wishes}
                />








                <TouchableOpacity onPress={this.handleRecordInput}>
                    <Animated.View style={styles.button}>
                        <Text style={{ fontSize: 20 }}>Input Record</Text>
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.clearfields}>
                    <Animated.View style={styles.closeButton}>
                        <Text style={{ fontSize: 15 }}>Clear</Text>
                    </Animated.View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#72C3C9',
    },
    modal: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    req: {
        borderRadius: 10,
        width: '75%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 45,
        marginBottom: 20

    },
    input: {
        // height: 40,
        // alignItems: 'stretch',
        backgroundColor: 'white',
        width: '90%',
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
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
        marginBottom: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
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
        left: width / 2 - 20,
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
    bottom: {
        backgroundColor: 'white',
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        height: 100,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    recordFields: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    }
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

import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { ScrollView } from 'react-native-gesture-handler';
import Block from './components.js'

export default class SearchSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            events: [],
            noOp: [],
            email: "null",
        };
        this.onQuery = this.onQuery.bind(this)
        this.startQuery = this.startQuery.bind(this)
        this.loadEvents = this.loadEvents.bind(this)
        this.getDoctors = this.getDoctors.bind(this)
        this.getDeparments = this.getDeparments.bind(this)
        this.getDates = this.getDates.bind(this)
    }

    onPressRequests = () => {
        this.props.navigation.navigate('MedicalHomepage')
    }

    //Part 0
    onQuery = (email) => {
        console.log('Searching for this user ' + email);
        this.startQuery(email).then((res) => {
            this.setState({
                noOp: res,
            })
            console.log("Inquiry appointments: " + res);
        })
    }

    //Part 1
    //Starts query with every hospital
    async startQuery(email) {
        this.setState({ events: [] })
        var noOpArray = []
        //Get every hospital
        querySnapshot = await firebase.firestore().collection("hospital").get();
        querySnapshot.forEach((doc) => {
            //console.log("This hospital " + doc.id)
            this.getDeparments(doc.id, email).then((res) => {
                //no op
                this.setState({ noOp: res })
            })
        })
        return noOpArray;
    }

    //Part 2
    //Gets every department
    async getDeparments(hospital, email) {
        noOpArray = []
        querySnapshot = await firebase.firestore().collection("hospital").doc(hospital).collection("Departments").get() //doc(department).collection(accountTypeString).get();
        querySnapshot.forEach((doc) => {
            //console.log("This department " + doc.id)
            this.getDoctors(doc.id, hospital, email).then((res) => {
                this.setState({ noOp: res })
            })
        })
        return noOpArray;
    }

    //Part 3
    //Gets every doctor
    async getDoctors(department, hospital, email) {
        noOpArray = []
        querySnapshot = await firebase.firestore().collection("hospital").doc(hospital).collection("Departments").doc(department).collection("Doctors").get();
        querySnapshot.forEach((doc) => {
            //console.log("This doctor " + doc.id)
            this.getDates(doc.id, department, hospital, email).then((res) => {
                this.setState({ noOp: res })
            })
        })

        return noOpArray;
    }

    //Iterates through each day on record
    //Part 4
    async getDates(doctorName, department, hospital, email) {
        blockAppointments = []
        var i = 1
        querySnapshot = await firebase.firestore().collection("hospital").doc(hospital).collection("Departments").doc(department).collection("Doctors").doc(doctorName).collection("Appointments").get();
        querySnapshot.forEach((doc) => {
            console.log("This date: " + doc.id)
            this.loadEvents(doc.id, doctorName, department, hospital, email).then((res) => {
                if (typeof res[0] != 'undefined') {
                    blockAppointments.push(res)
                    this.setState({ events: blockAppointments })
                }
            })
        })
        return blockAppointments
    }


    // Gets every event for the day
    // Part 5
    async loadEvents(date, doctorName, department, hospital, email) {
        var blockAppointments = []
        var i = 1
        querySnapshot = await firebase.firestore().collection("hospital").doc(hospital).collection("Departments").doc(department).collection("Doctors").doc(doctorName).collection("Appointments").doc(date).collection("Time").get();
        querySnapshot.forEach((doc) => {
            console.log(doc.data().time)
            if (email === doc.data().email) {
                var appointmentText = "Checked in? " + doc.data().checked + "\nDepartment: " + doc.data().department +
                    "\nDescription: " + doc.data().description +
                    "\nDoctor: " + doc.data().doctor + "\nHospital: " + doc.data().hospital +
                    "\nat time: " + doc.data().time + "\nPatient first name: " + doc.data().first_name +
                    "\nPatient last name: " + doc.data().last_name
                blockAppointments.push(
                    <Block card shadow color="#f6f5f5" style={styles.pageTop} key={i.toString()}>
                        <Block row style={{ paddingHorizontal: 30, paddingTop: 10 }} flex={0.56} key={i.toString()}>
                            <Text>{appointmentText}</Text>
                        </Block>
                    </Block>
                )
                i++
            }
        })

        return blockAppointments
    }

    render() {
        const { events } = this.state;
        var appointmentText = "NO APPOINTMENTS FOUND FOR THIS USER"
        var i = 1
        if (this.state.events.length === 0 || typeof this.state.events[0] === undefined) {
            return (
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <Text
                            style={styles.titleText}>Search for a users appointments</Text>
                        <Fumi
                            label={'Email Address'}
                            iconClass={FontAwesomeIcon}
                            iconName={'envelope-square'}
                            iconColor={'white'}
                            autoCapitalize={'none'}
                            style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: 'rgba(0,0,0,0.2)' }}
                            inputStyle={{ color: '#000000' }}
                            onChangeText={email => { this.setState({ email }) }}
                        />
                        <TouchableOpacity onPress={() => this.onQuery(this.state.email)}>

                            <View style={styles.button}>
                                <Text style={{ fontSize: 20, color: '#404d5b' }}>Get specfic user appointments</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPressRequests}>

                            <View style={styles.button}>
                                <Text style={{ fontSize: 20, color: '#404d5b' }}>Go Back</Text>
                            </View>

                        </TouchableOpacity>
                        {/* <Button
                            style={styles.buttonStyle}
                            onPress={() => this.onQuery(this.state.email)}
                            title="Get specfic user appointments"
                        />
                        <Button
                            onPress={() => this.onPressRequests()}
                            title="Go back"
                        /> */}
                        <Text style={styles.titleText}> Appointments found for user:</Text>
                        <View>
                            <Block card shadow color="#f6f5f5" style={styles.pageTop} key={i.toString()}>
                                <Block row style={{ paddingHorizontal: 30, paddingTop: 10 }} key={i.toString()}>
                                    <Text>{appointmentText}</Text>
                                </Block>
                            </Block>
                        </View>
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <Text
                            style={styles.titleText}>Search for a users appointments</Text>
                        <Fumi
                            label={'Email Address'}
                            iconClass={FontAwesomeIcon}
                            iconName={'envelope-square'}
                            iconColor={'white'}
                            inputStyle={{ color: '#000000' }}
                            onChangeText={email => { this.setState({ email }) }}
                        />
                        <TouchableOpacity onPress={() => this.onQuery(this.state.email)}>

                            <View style={styles.button}>
                                <Text style={{ fontSize: 20, color: '#404d5b' }}>Get specfic user appointments</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPressRequests}>

                            <View style={styles.button}>
                                <Text style={{ fontSize: 20, color: '#404d5b' }}>Go Back</Text>
                            </View>

                        </TouchableOpacity>
                        {/* <Button
                            style={styles.buttonStyle}
                            onPress={() => this.onQuery(this.state.email)}
                            title="Get specfic user appointments"
                        />
                        <Button
                            onPress={() => this.onPressRequests()}
                            title="Go back"
                        /> */}
                        <Text style={styles.titleText}> Appointments found for user:</Text>
                        <View>
                            {events}
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopWidth: 15,
        borderColor: '#ffffff',
    },
    titleText: {
        paddingBottom: 16,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        color: '#404d5b',
        fontSize: 20,
        fontWeight: 'bold',
        opacity: 0.8,
    },
    form: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    pageTop: {
        paddingTop: 30,
        paddingBottom: 45,
        zIndex: 1
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#336633',
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 25,
        paddingLeft: 25,
        marginTop: 10,
        width: 300
    },
    scrollView: {
        marginTop: 25,
        backgroundColor: '#72C3C9'
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
    }
});
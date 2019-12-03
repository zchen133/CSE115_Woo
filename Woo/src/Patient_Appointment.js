import React, { Component } from 'react';
import { StyleSheet,ScrollView, Modal, Text, View, Button, Picker, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import { initialEmail } from './Loading.js';
import Toast from 'react-native-tiny-toast';
import { hospital, first, last } from './Loading.js';
import DatePicker from 'react-native-datepicker';
import { Platform } from '@unimodules/core';
import { Dropdown } from 'react-native-material-dropdown'
var appointments = [];
//var accepted = true;
export default class Patient_AppointmentScreen extends Component {


    state = { departmentList: [], doctorList: [], availableTimeList: [], hospitalList: [{ value: "Null" }], date: '', time: '', hospital: '', doctor: '', department: '', description: '', hospital: '', appointments: '', err: null }
    constructor(props) {
        super(props);
        this.docRef = firebase.firestore().collection("hospital");
        this.selectedDepartment;
        this.selectedDoctor;
        this.selectedDate;
        this.selectedHospital;


        //this.department = this.department.bind(this)
    }

    componentDidMount() {
        //     this.getUserData()
        this.getHospitalList()
        //     //this.docRef.set({ birthday: '1-1-2019' }, { merge: true });
    }


    getHospitalList = () => {
        depart_set = new Set([]);
        new_array = [];
        this.docRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                let data = doc.id
                depart_set.add(doc.id);

            });
            depart_set.forEach(function (val) {
                new_array.push({ value: val })
                //new_array["value"] = val;
            })
        });
        this.setState({ hospitalList: new_array })
        //this.setState({doctorList:new_array})
    }
    getDepartmentList = (selected) => {
        this.setState({ hospital: selected });
        this.setState({ selectedHospital: selected });
        if (this.state.selectedHospital == null) {
            Toast.show("Please select hospital first")
            return
        }
        depart_set = new Set([]);
        new_array = [];
        firebase.firestore().collection("hospital").doc(this.state.selectedHospital).collection("Departments").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                let data = doc.id
                depart_set.add(doc.id);

            });

            depart_set.forEach(function (val) {
                new_array.push({ value: val })
            })
        });
        this.setState({ departmentList: new_array })
    }
    getDoctorList = (selected) => {
        this.setState({ department: selected });
        this.setState({ selectedDepartment: selected });
        if (this.state.selectedHospital == null) {
            Toast.show("Please select hospital first")
            return
        }
        if (this.state.selectedDepartment == null) {
            Toast.show("Please select department first")
            return
        }
        depart_set = new Set([]);
        new_array = [];
        firebase.firestore().collection("hospital").doc(this.state.selectedHospital).collection("Departments").doc(selected).collection("Doctors").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                let data = doc.id
                depart_set.add(doc.id);
            });
            depart_set.forEach(function (val) {
                new_array.push({ value: val })
                //new_array["value"] = val;
            })
        });
        this.setState({ doctorList: new_array })
        //this.setState({doctorList:new_array})
    }

    getAvailableTimeListCal = () => {
        all_time = new Set(["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"]);
        unavailable_time = new Set([])
        new_array = [];
        firebase.firestore().collection("hospital").doc(this.state.selectedHospital).collection("Departments").doc(this.state.selectedDepartment).collection("Doctors").doc(this.state.selectedDoctor).collection("Appointments").doc(this.state.selectedDate).collection("Time").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                unavailable_time.add(doc.id);

            });
            var available_time = new Set([...all_time].filter(x => !unavailable_time.has(x)));
            available_time.forEach(function (val) {
                new_array.push({ value: val });
            });

        });
        this.setState({ availableTimeList: new_array })
    }
    getAvailableTimeList = (selected) => {
        if (this.state.selectedHospital == null) {
            Toast.show("Please select hospital first")
            return
        }
        if (this.state.selectedDepartment == null) {
            Toast.show("Please select department first")
            return
        }
        if (this.state.selectedDoctor == null) {
            Toast.show("Please select doctor first")
            return
        }

        this.setState({ date: selected });
        this.setState({ selectedDate: selected });
        all_time = new Set(["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"]);
        unavailable_time = new Set([])
        new_array = [];
        firebase.firestore().collection("hospital").doc(this.state.selectedHospital).collection("Departments").doc(this.state.selectedDepartment).collection("Doctors").doc(this.state.selectedDoctor).collection("Appointments").doc(selected).get().then((querySnapshot) => {
            if (querySnapshot.exists) {
                this.getAvailableTimeListCal()
                //ParentClass.prototype.this.getAvailableTimeListCal().call();
            } else {
                // doc.data() will be undefined in this case
                all_time.forEach(function (val) {
                    new_array.push({ value: val });
                });
                this.setState({ availableTimeList: new_array })
            }

        });

    }
    setSelectedTime = (selected) => {
        this.setState({ time: selected });
        this.setState({ selectedTime: selected });
    }

    clearfields = () => {

        this.setState({ date: '' })
        this.setState({ time: '' })

        this.setState({ hospital: '' })
        this.setState({ doctor: '' })
        this.setState({ description: '' })
    }
    logSetElements(value1, value2, set) {
    }

    // sleep = (milliseconds) => {
    //     return new Promise(resolve => setTimeout(resolve, milliseconds))
    //   }
    handleAppointmentRequestOld = () => {

        var accepted = true;
        if (this.state.date == '') {
            Toast.show('Please enter appointment date');
            return;
        }

        if (this.state.time == '') {
            Toast.show('Please enter appointment time');
            return;
        }

        if (this.state.hospital == '') {
            Toast.show('Please enter hospital');
            return;
        }

        const eventrefPatient = firebase.firestore().collection("users").doc(initialEmail).collection("requests");
        eventrefPatient.doc(this.state.date + '_' + this.state.time + '_' + initialEmail).set({
            date: this.state.date,
            time: this.state.time,
            hospital: this.state.hospital,
            doctor: this.state.doctor,
            description: this.state.description,
            department: this.state.selectedDepartment,
            first_name: first,
            last_name: last,
            email: initialEmail

        })
        const userRef = firebase.firestore().collection("hospital").doc(this.state.hospital).collection("requests").doc(this.state.date + '_' + this.state.time + '_' + initialEmail);
        userRef.get()
            .then(function (querySnapshot) {
                if (querySnapshot.exists) {
                    accepted = false;
                }
            })




        if (accepted) {
            Toast.show('Request sent');
            const eventrefHospital = firebase.firestore().collection("hospital").doc(this.state.hospital).collection("requests");
            eventrefHospital.doc(this.state.date + '_' + this.state.time + '_' + initialEmail).set({
                date: this.state.date,
                time: this.state.time,
                hospital: this.state.hospital,
                doctor: this.state.doctor,
                description: this.state.description,
                department: this.state.selectedDepartment,
                first_name: first,
                last_name: last,
                email: initialEmail
            })
        }

        if (!(accepted)) {
            accepted = true;
            Toast.show('Request Denied');
            const eventref = firebase.firestore().collection("users").doc(initialEmail).collection("requests");
            eventref.doc(this.state.date + '_' + this.state.time + '_' + initialEmail).delete().then(function () {
            }).catch(function (error) {
            });


        }
        //Update appointments and export to homepage view

    }

    handleAppointmentRequest = () => {

        /* Sending push notification */
        const staffRef = firebase.firestore().collection("users")
        const hospitalQuery = staffRef.where("hospital", "==", this.state.hospital)
            .where("accountType", "==", "2")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let response = fetch('https://exp.host/--/api/v2/push/send', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            to: doc.get('token'),
                            sound: 'default',
                            title: 'Woo App',
                            body: 'Appointment Request'
                        })
                    })


                });
            })
            .catch(function (error) {
            });
                if (this.state.date == '') {
                    Toast.show('Please enter appointment date');
                    return;
                }
        
                if (this.state.time == '') {
                    Toast.show('Please enter appointment time');
                    return;
                }
        
                if (this.state.hospital == '') {
                    Toast.show('Please enter hospital');
                    return;
                }
               
        const userRef = firebase.firestore().collection("hospital").doc(this.state.hospital).collection("requests").doc(this.state.date + '_' + this.state.time + '_' + initialEmail);
        userRef.get()
            .then((querySnapshot) => {
                if (querySnapshot.exists) {
                    Toast.show('Request Denied');
                } else {
                    Toast.show('Request sent');
                    const eventrefHospital = firebase.firestore().collection("hospital").doc(this.state.hospital).collection("requests");
                    eventrefHospital.doc(this.state.date + '_' + this.state.time + '_' + initialEmail).set({
                        date: this.state.date,
                        time: this.state.time,
                        hospital: this.state.hospital,
                        doctor: this.state.doctor,
                        description: this.state.description,
                        department: this.state.selectedDepartment,
                        first_name: first,
                        last_name: last,
                        email: initialEmail
                    })

                    const eventrefPatient = firebase.firestore().collection("users").doc(initialEmail).collection("requests");
                    eventrefPatient.doc(this.state.date + '_' + this.state.time + '_' + initialEmail).set({
                        date: this.state.date,
                        time: this.state.time,
                        hospital: this.state.hospital,
                        doctor: this.state.doctor,
                        description: this.state.description,
                        department: this.state.selectedDepartment,
                        first_name: first,
                        last_name: last,
                        email: initialEmail
                    })
                }
            })
        //Update appointments and export to homepage view

    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'flex-end' }}>
                <View style={{ ...StyleSheet.absoluteFill }}>
                    <Image
                        source={require('../assets/nb.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                        blurRadius={5}
                    />
                </View>
                <View style={styles.reqAll}>
                {/* <ScrollView showsVerticalScrollIndicator={true}> */}
                    <Dropdown
                        containerStyle={styles.pickerContainer}
                        pickerStyle={styles.pickerContent}
                        
                        label="Hospital"
                        data={this.state.hospitalList}
                        onChangeText={(selected) => this.getDepartmentList(selected)}
                    />
                    <Dropdown
                        containerStyle={styles.pickerContainer}
                        pickerStyle={styles.pickerContent}
                        label="Department"
                        data={this.state.departmentList}
                        onChangeText={(selected) => this.getDoctorList(selected)}
                    />
                    <Dropdown
                        containerStyle={styles.pickerContainer}
                        pickerStyle={styles.pickerContent}
                        label="Doctor"
                        //value = {this.state.doctorList[0]}
                        data={this.state.doctorList}
                        onChangeText={(selected) => {
                            if (this.state.selectedHospital == null) {
                                Toast.show("Please select hospital first")
                                return
                            }
                            if (this.state.selectedDepartment == null) {
                                Toast.show("Please select department first")
                                return
                            }
                            this.setState({ selectedDoctor: selected, doctor: selected })
                        }}
                    />
                    <DatePicker
                        style={styles.req}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2019-11-03"
                        maxDate="2020-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,

                            },
                            dateInput: {
                                marginLeft: 0
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => this.getAvailableTimeList(date)}
                    />
                    <Dropdown
                        containerStyle={styles.pickerContainer}
                        pickerStyle={styles.pickerContent}
                        label="Available Time"
                        //value = {this.state.doctorList[0]}
                        data={this.state.availableTimeList}
                        onChangeText={
                            (selected) => {
                                if (this.state.selectedHospital == null) {
                                    Toast.show("Please select hospital first")
                                    return
                                }
                                if (this.state.selectedDepartment == null) {
                                    Toast.show("Please select department first")
                                    return
                                }
                                if (this.state.selectedDoctor == null) {
                                    Toast.show("Please select doctor first")
                                    return
                                }
                                if (this.state.selectedDate == null) {
                                    Toast.show("Please select the date first")
                                    return
                                }
                                this.setSelectedTime(selected)
                            }}
                    />

                    
                    <TextInput
                        placeholder='(Description)'
                        autoCapitalize="none"
                        
                        style={{width:'80%',height:'20%',borderRadius: 10,
                        borderWidth: 0.5,borderColor: 'rgba(0,0,0,0.2)'}}
                        //multiline={true} SOURCE OF RETURN BUG
                        onChangeText={description => this.setState({ description })}
                        value={this.state.description}
                    />
                    <TouchableOpacity onPress={this.handleAppointmentRequest}>
                        <View style={styles.button}>
                            <Text style={{ fontSize: 20 }}>Request Appointment</Text>
                        </View>
                    </TouchableOpacity>
                    {/* </ScrollView> */}
                </View>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginLeft: 10,
        marginBottom: 20

    },
    reqAll: {
        borderRadius: 20,
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        //marginLeft: 45,
        marginBottom: 20,

    },
    pickerContainer: {
        // height: 40,
        // alignItems: 'stretch',
        backgroundColor: 'white',
        width: "75%",
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        marginBottom: 30,
        marginLeft: 50,
        marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
    },
    pickerContent: {
        // height: 40,
        // alignItems: 'stretch',
        backgroundColor: 'white',
        marginTop:50,
        width: "75%",
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        //marginBottom: 20,
        //marginLeft: 50,
        //marginRight: 50,
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
        marginLeft: 10,
        marginRight: 10,
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
        marginLeft: 10,
        marginRight: 10,
        height: 100,
        width: 240,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    },

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
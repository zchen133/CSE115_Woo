import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import { initialEmail } from './Loading.js';
import Toast from 'react-native-tiny-toast';
import { hospitalStaff } from './AdminHomepage.js';
import DatePicker from 'react-native-datepicker';
import { Platform } from '@unimodules/core';
var appointments = [];
var accepted = true;
export default class Patient_AppointmentScreen extends Component {

    state = { title: '', date: '', time: '', hospital: '', doctor: '', description: '', hospitalStaff: '',appointments: '',  err: null }

    clearfields = () => {
        this.setState({title:''})
        this.setState({date:''})
        this.setState({time:''})
        this.setState({hospital:''})
        this.setState({doctor:''})
        this.setState({description:''})
    }
    handleAppointmentRequest = () => {
        
        if (this.state.title == '') {
            console.log('No title given');  
             Toast.show('Please enter title');
            return;
        }
        if (this.state.date == '') {
            console.log('No date given');  
             Toast.show('Please enter appointment date');
            return;
        }

        if (this.state.time == '') {
            console.log('No time selected');  
             Toast.show('Please enter appointment time');
            return;
        }

        if (this.state.hospital == '') {
            console.log('No hospital given');  
             Toast.show('Please enter hospital');
            return;
        }
        console.log(accepted)

        const eventrefPatient = firebase.firestore().collection("users").doc(initialEmail).collection("events");
         eventrefPatient.doc(this.state.title).set({
             date: this.state.date,
             time: this.state.time,
             hospital: this.state.hospital,
             doctor: this.state.doctor,
             description: this.state.description,

         }) 
         

         const userRef = firebase.firestore().collection("hospital").doc(this.state.hospital).collection("events");
         const hospitalQuery = userRef.where("date", "==", this.state.date)
                                      .where("time", "==", this.state.time)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
            
                if(doc.id != ''){
                   accepted = false;
                   console.log(doc.id)
                }
                
            });
        })
        .catch(function(error){
            console.log("Error getting documents: ", error);
        });
         
      if(accepted){
        Toast.show('Request sent');
        const eventrefHospital= firebase.firestore().collection("hospital").doc(this.state.hospital).collection("events");
        eventrefHospital.doc(this.state.title).set({
            date: this.state.date,
            time: this.state.time,
           hospitalStaff: this.state.hospitalStaff,
           doctor: this.state.doctor,
            description: this.state.description,

        })
      }

      if(!(accepted)){
        accepted = true;
        Toast.show('Request Denied');
        const eventref = firebase.firestore().collection("users").doc(initialEmail).collection("events");
         eventref.doc(this.state.title).delete().then(function() {
             console.log("document deleted");
         }).catch(function(error){
             console.log("Error removing document ", error);
         });
         
        
      }
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
                <TextInput
                    placeholder='Event Title'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={title => this.setState({ title })}
                    value={this.state.title}
                />
                <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-11-03"
        maxDate="2030-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      <DatePicker
        style={{width: 200}}
        date={this.state.time}
        mode="time"
        format="HH:mm"
        placeholder="select time"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        minuteInterval={30}
        is24Hour={true}
        onDateChange={(time) => {this.setState({time: time})}}
      />
                
                <TextInput
                    placeholder='Hospital'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={hospital => this.setState({ hospital })}
                    value={this.state.hospital}
                />
                <TextInput
                    placeholder='Requested Doctor (Optional)'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={doctor => this.setState({ doctor })}
                    value={this.state.doctor}
                />
                <TextInput
                    placeholder='(Description)'
                    autoCapitalize="none"
                    style={styles.bottom}
                    multiline={true}
                    onChangeText={description => this.setState({ description })}
                    value={this.state.description}
                />
                <TouchableOpacity onPress={this.handleAppointmentRequest}>
                    <Animated.View style={styles.button}>
                        <Text style={{ fontSize: 20 }}>Request Appointment</Text>
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.clearfields}>
                    <Animated.View style={styles.closeButton}>
                        <Text style={{ fontSize: 15 }}>Clear</Text>
                    </Animated.View>
                </TouchableOpacity>
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
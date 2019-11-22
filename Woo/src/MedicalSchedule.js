import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { hospital, accountTypeString } from './Loading.js';
import CalendarPicker from 'react-native-calendar-picker';
import Block from './components.js'
const Utils = require('./Utils.js')

export default class Schedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedStartDate: null,
            events: [],
            noOp: [],
        };
        this.onDateChange = this.onDateChange.bind(this)
        this.startQuery = this.startQuery.bind(this)
        this.getDoctors = this.getDoctors.bind(this)
        this.loadEvents = this.loadEvents.bind(this)
    }

    dayConverter(date) {
        var convertDate = date.split(" ");
        var isoDate = "";

        isoDate += convertDate[3] + "-";

        switch (convertDate[1]) {
            case ("Jan"):
                isoDate += "01";
                break;
            case ("Feb"):
                isoDate += "02";
                break;
            case ("Mar"):
                isoDate += "03";
                break;
            case ("Apr"):
                isoDate += "04";
                break;
            case ("May"):
                isoDate += "05";
                break;
            case ("Jun"):
                isoDate += "06";
                break;
            case ("Jul"):
                isoDate += "07";
                break;
            case ("Aug"):
                isoDate += "08";
                break;
            case ("Sep"):
                isoDate += "09";
                break;
            case ("Oct"):
                isoDate += "10";
                break;
            case ("Nov"):
                isoDate += "11";
                break;
            case ("Dec"):
                isoDate += "12";
                break;
        }

        isoDate += "-" + convertDate[2];

        return isoDate;
    }

    async loadEvents(department, doctorName, date) {
        var blockAppointments = []
        var i = 1
        querySnapshot = await firebase.firestore().collection("hospital").doc(hospital).collection("Departments").doc(department).collection(accountTypeString).doc(doctorName).collection("Appointments").doc(date).collection("Time").get();
        querySnapshot.forEach((doc) => {
            console.log(doc.data().time)
            var appointmentText = "Checked in? " + doc.data().checked + "\nDepartment: " + doc.data().department +
                    "\nDescription: " + doc.data().description +
                    "\nDoctor: " + doc.data().doctor + "\nHospital: " + doc.data().hospital +
                    "\nat time: " + doc.data().time + "\nPatient first name: " + doc.data().first_name +
                    "\nPatient last name: " + doc.data().last_name

                blockAppointments.push(
                    <Block  card shadow color = "#f6f5f5" style = {styles.pageTop} key ={i.toString()}>
                      <Block row style = {{paddingHorizontal:30, paddingTop: 10}} flex = {0.56} key = {i.toString()}>
                        <Text>{appointmentText}</Text>
                      </Block>
                    </Block>
                    )
                i++
        })

        return blockAppointments
    }
    async getDoctors(department, date) {
        blockAppointments = []
        var i = 1;
        try { 
            querySnapshot = await firebase.firestore().collection("hospital").doc(hospital).collection("Departments").doc(department).collection(accountTypeString).get();
            querySnapshot.forEach((doc) => {
                console.log(doc.id)
                this.loadEvents(department, doc.id, date).then((res) => {
                    blockAppointments.push(res)
                    this.setState({events: blockAppointments})
                })
            })
        } finally {
            if ( this.state.events.length === 0) {
                var appointmentText = "NO APPOINTMENTS FOUND FOR THIS DATE";
                blockAppointments.push(
                    <Block  card shadow color = "#f6f5f5" style = {styles.pageTop} key = {i.toString()}>
                        <Block row style = {{paddingHorizontal:30, paddingTop: 10}} key = {i.toString()}>
                            <Text>{appointmentText}</Text>
                        </Block>
                    </Block>
                )
                this.setState({
                    events: blockAppointments
                })
            }
        }
        return blockAppointments;

    }

    async startQuery(date) {
        var newDate = date.toString().substr(0, date.toString().length - 18)
        this.setState({ selectedStartDate: newDate })
        this.setState({events: []})
        newDate = this.dayConverter(newDate)
        console.log(newDate)
        var returnValue = []
        //Get every department
        querySnapshot = await firebase.firestore().collection("hospital").doc(hospital).collection("Departments").get(); 
        querySnapshot.forEach((doc) => {
            console.log(doc.id)
            this.getDoctors(doc.id, newDate).then((res) => {
                //no op
                this.setState({noOp: res})
            })
        })
        return returnValue;
    }


    onPressRequests = () => {
        this.props.navigation.navigate('MedicalHomepage')
    }


    onDateChange(date) {
        this.startQuery(date).then((res) => {
            //no op
            this.setState({ noOp: res })
        })
    }

    render() {
        const { selectedStartDate } = this.state
        const startDate = selectedStartDate ? selectedStartDate.toString() : ''
        const { events } = this.state
        return (
            <ScrollView style = {styles.scrollView}>
          <View style={styles.container}>
            <CalendarPicker
              onDateChange={this.onDateChange}
            />  
            <View>
            <Button 
                  title = 'Go back'
                  onPress={this.onPressRequests} />
              <Text
                style={styles.titleText}>SELECTED DATE: { startDate }</Text>
              <Text
              style={styles.titleText}>Appointments: </Text>
              <View>
                { events }  
              </View> 
           </View>
          </View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#72C3C9',
        borderTopWidth: 15,
        borderColor: '#72C3C9',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    scrollView: {
        backgroundColor: '#72C3C9'
    }
});
import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { initialEmail, hospital, department, accountTypeString, first, last } from './Loading.js';
import CalendarPicker from 'react-native-calendar-picker';
import Block from './components.js'


export default class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            events: [],
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.loadEvents = this.loadEvents.bind(this);
        this.dayConverter = this.dayConverter.bind(this);
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

    //async loadEvents()

    async loadEvents(date) {
        console.log(hospital)
        console.log(department)
        console.log(first)
        console.log(last)
        console.log(accountTypeString)
        var newDate = date.toString().substr(0, date.toString().length - 18)
        this.setState({ selectedStartDate: newDate })
        newDate = this.dayConverter(newDate)
        console.log(newDate)
        var events = "\n"
        var returnValue = []
        //Get every department
        var i = 1;
        querySnapshot = await firebase.firestore().collection("hospital").doc(hospital).collection("Departments").doc(department).collection(accountTypeString).doc(first+' '+last).collection("Appointments").doc(newDate).collection("Time").get();
        querySnapshot.forEach((doc) => {
            console.log(doc)
            events = "found"
            var appointmentText = "Checked in? " + doc.data().checked + "\nDepartment: " + doc.data().department +
                "\nDescription: " + doc.data().description +
                "\nDoctor: " + doc.data().doctor + "\nHospital: " + doc.data().hospital +
                "\nat time: " + doc.data().time + "\nPatient first name: " + doc.data().first_name +
                "\nPatient last name: " + doc.data().last_name
            returnValue.push(
                <Block  card shadow color = "#f6f5f5" style = {styles.pageTop} key ={i.toString()}>
                  <Block row style = {{paddingHorizontal:30, paddingTop: 10}} key = {i.toString()}>
                    <Text>{appointmentText}</Text>
                  </Block>
                </Block>
                )
            i++
        });
        if (events === "\n") {
            var appointmentText = "NO APPOINTMENTS FOUND OR INVALID EMAIL";
            returnValue.push(
                <Block  card shadow color = "#f6f5f5" style = {styles.pageTop} key = {i.toString()}>
                  <Block row style = {{paddingHorizontal:30, paddingTop: 10}} key = {i.toString()}>
                    <Text>{appointmentText}</Text>
                  </Block>
                </Block>
            )
        }
        return returnValue;
    }


    onPressRequests = () => {
        this.props.navigation.navigate('MedicalHomepage');
    }


    onDateChange(date) {
        this.loadEvents(date).then((res) => {
            this.setState({ events: res })
        })
    }

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
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
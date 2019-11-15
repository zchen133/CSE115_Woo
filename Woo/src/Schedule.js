import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { initialEmail } from './Loading.js';
import CalendarPicker from 'react-native-calendar-picker';


export default class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            events: "",
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.loadEvents = this.loadEvents.bind(this);
        this.findUserAppointments = this.findUserAppointments.bind(this);
    }

    async findUserAppointments(email, date) {
      console.log(date);
      querySnapshot = await firebase.firestore().collection("users").doc(email).collection("events").get();
        querySnapshot.forEach(function(doc) {
          console.log(doc.data())
          /**
           * if doc.data().date === date 
           * {
           *    events += "Email: "+ email + "\nDescription: " + doc.data().description + 
           *    "\nDoctor: " + doc.data().doctor + "\nHospital: " + doc.data().hospital + 
           *    "\nat time: " + doc.data().time;
           * }
           */
        });
        if (events === "\n" ) {
            events += "NO APPOINTMENTS FOUND OR INVALID EMAIL";
        }
      return events
    }
    
    async loadEvents(date) {
        this.setState({ selectedStartDate: date })

        var newDate = date.toString().substr(0, date.toString().length - 18)
        var events = "\n";

        querySnapshot = await firebase.firestore().collection("users").get();
            querySnapshot.forEach(function(doc) {
              this.findUserAppointments(doc.data().email, newDate).then((res) => {
                events += res;
              })       
            });
            return events
    }


    onPressRequests = () => {
      this.props.navigation.navigate('PatientHomepage')
    }


    onDateChange(date) {
        this.loadEvents(date).then((res) => {
            this.setState({ events: res })
            console.log("is it printing here: " + res)
        })
    }

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
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
              style={styles.titleText}>Appointments: { this.state.events }</Text>
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
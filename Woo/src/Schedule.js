import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import Constants from 'expo';
import * as Calendar from 'expo-calendar';
import { initialEmail } from './Loading.js';
import CalendarPicker from 'react-native-calendar-picker';


export default class Schedule extends Component {

  queryState = { email: '', err: null}
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            events: "",
            email: "",
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.loadEvents = this.loadEvents.bind(this);
        this.searchEmail = this.searchEmail.bind(this);
    }

    async loadEvents(date) {
        this.setState({ selectedStartDate: date })

        var newDate = date.toString().substr(0, date.toString().length - 18)
        var events = "\n";

        events = await firebase.firestore().collection("users").doc(initialEmail).collection("events").doc("appointment").collection("date").doc(newDate).collection("time").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                events += 'Patient name: ' + doc.data().name + ' At time ' + doc.data().time + '\n';
            });

            if (events === "\n" ) {
                events += "NO APPOINTMENTS FOUND";
            }

            return events

        }).catch(function(error) {
            console.log(error)
            console.log('No events found!')
        });

        return events
    }

    onQuery(email) {
      this.searchEmail(email).then((res) => {
        this.setState({
          events: res,
        })
        console.log("Inquiry appointments: " + res);
      })
    }

    async searchEmail(email) {
      events = await firebase.firestore().collection("users").doc(email).collection("events").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.data())
            //events += 'Patient name: ' + doc.data().name + ' At time ' + doc.data().time + '\n';
        });

        if (events === "\n" ) {
            events += "NO APPOINTMENTS FOUND";
        }
        return events

    }).catch(function(error) {
        //console.log(error)
        console.log('Empty string maybe?')
    });

    return events
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
        <View style={styles.container}>
          <CalendarPicker
            onDateChange={this.onDateChange}
          />  
          <View>
            <Text
              style = {styles.titleText}>Search for a specfic users appointments</Text>
            <TextInput 
              placeholder = "Enter a users email"
              onChangeText={email => this.setState({ email })}
            /> 
            <Button
              onPress = {this.onQuery(this.state.email)}
              title="Get specfic user appointments"
            />
            <Text
              style={styles.titleText}>SELECTED DATE: { startDate }</Text>
            <Text
            style={styles.titleText}>Appointments: { this.state.events }</Text>
        </View>
      </View>
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
  }
});
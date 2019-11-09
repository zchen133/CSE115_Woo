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
    }

    async loadEvents(date) {
        this.setState({ selectedStartDate: date })

        var newDate = date.toString().substr(0, date.toString().length - 18)
        var events = "\n";

        events = await firebase.firestore().collection("users").doc(initialEmail).collection("events").doc("appointment").collection("date").doc(newDate).collection("time").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                events += '----------------------------------------\nPatient name: ' + doc.data().name + ' At time ' + doc.data().time + '\n';
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
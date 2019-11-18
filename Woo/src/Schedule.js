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
        this.dayConverter = this.dayConverter.bind(this);
    }

    dayConverter(date) {
      var convertDate = date.split(" ");
      var isoDate = "";

      isoDate+=convertDate[3] +"-";

      switch(convertDate[1]) {
        case ("Jan"):
          isoDate+="01";
          break;
        case ("Feb"):
          isoDate+="02";
          break;
        case ("Mar"):
          isoDate+="03";
          break;
        case ("Apr"):
          isoDate+="04";
          break;
        case ("May"):
          isoDate+="05";
          break;
        case ("Jun"):
          isoDate+="06";
          break;
        case ("Jul"):
          isoDate+="07";
          break;
        case ("Aug"):
          isoDate+="08";
          break;
        case ("Sep"):
          isoDate+="09";
          break;
        case ("Oct"):
          isoDate+="10";
          break;
        case ("Nov"):
          isoDate+="11";
          break;
        case ("Dec"):
          isoDate+="12";
          break;
      }

      isoDate += "-" + convertDate[2];

      return isoDate;
    } 

    async findUserAppointments(email, date) {
      //console.log(date);
      events = "\n";
      querySnapshot = await firebase.firestore().collection("users").doc(email).collection("events").get();
        querySnapshot.forEach(function(doc) {
          //console.log(doc.data())
            if (doc.data().date === date) 
            {
               events += "Email: "+ email + "\nDescription: " + doc.data().description + 
               "\nDoctor: " + doc.data().doctor + "\nHospital: " + doc.data().hospital + 
               "\nat time: " + doc.data().time;
               console.log(events);
            }
        });
        return events
    }

    async loadEvents(date) {
        var newDate = date.toString().substr(0, date.toString().length - 18);
        this.setState({ selectedStartDate: newDate })
        newDate = this.dayConverter(newDate);
        var events = "\n";
        querySnapshot = await firebase.firestore().collection("users").doc("zchen133@ucsc.edu").collection("events").get();
            querySnapshot.forEach((doc) => {
              console.log(doc.id)
              var eventInfo = doc.id.split("_");
              if (eventInfo[0] === newDate) {
                events +=  events += "\nDescription: " + doc.data().description + 
                "\nDoctor: " + doc.data().doctor + "\nHospital: " + doc.data().hospital + 
                "\nat time: " + doc.data().time;
              }
              }     
            );
            if (events === "\n" ) {
              events += "NO APPOINTMENTS FOUND OR INVALID EMAIL";
            }
            return events
    }


    onPressRequests = () => {
      this.props.navigation.navigate('PatientHomepage')
    }


    onDateChange(date) {
        this.loadEvents(date).then((res) => {
            this.setState({ events: res })
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
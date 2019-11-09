import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from "firebase";
import { initialEmail } from './Loading.js';

export default class SearchSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: "",
            email: "",
        };
        this.onQuery = this.onQuery.bind(this);
        this.searchEmail = this.searchEmail.bind(this);
    }

    onQuery = (email) => {
        console.log('Searching for this user ' +email );
          this.searchEmail(email).then((res) => {
          this.setState({
            events: res,
          })
          console.log("Inquiry appointments: " + res);
        })
      }
  
      async searchEmail(email) {
         events = "\n";
         querySnapshot = await firebase.firestore().collection("users").doc(email).collection("events").get(); //.then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
            console.log(doc.data())
            events += "----------------------------------------\nAppointment date " + doc.data().date +"\nDescription: " 
            + doc.data().description + "\nDoctor: " + doc.data().doctor + "\nHospital: " + doc.data().hospital + "\nat time: " + doc.data().time;
          });
          if (events === "\n" ) {
              events += "NO APPOINTMENTS FOUND OR INVALID EMAIL";
          }
          return events
  }

  render() {
    const { events } = this.state;
    const newString = events ? events.toString() : ''
      return (
        <View style = {styles.container}>
            <Text
              style = {styles.titleText}>Search for a users appointments</Text>
            <TextInput
              style = {styles.form}
              placeholder = "Enter a users email"
              onChangeText={email => this.setState({ email })}
            /> 
            <Button
              onPress = {() => this.onQuery(this.state.email)}
              title="Get specfic user appointments"
            />
            <Text> Appointments found for user: { newString }</Text>
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
    },
    form : {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    }
  });
import React, { Component, ReactNode}  from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import {Calendar, Agenda} from 'react-native-calendars';
import { initialEmail } from './Loading.js';


export default class Schedule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      time: "",
      items: {}
    };
    //this.getAppointments = this.getAppointments.bind(this);
  }
  
  async getAppointments(date){
    //var docRef = ;
    try {
      const doc = await firebase.firestore().collection("users").doc(initialEmail).collection("events").doc("appointment").collection("date").doc(date).get();
      var name = doc.data().name;
      console.log('name ' + doc.data().name)
      var time = doc.data().time;
      console.log('time ' + doc.data().time)
      this.setState({
        name: doc.data().name,
        time: doc.data().time
      });
    } catch {
      //console.log(error);
    }
}

testfunction(date) {
  console.log('test function: ')
  firebase.firestore().collection("users").doc(initialEmail).collection("events").doc("appointment").collection("date").doc(date).collection("time").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        console.log(' at date ' + strTime)
        console.log(doc.data().name)
        this.state.items[strTime].push({
          //firebase.firestore().collection('users').get('events')
          name: 'Appointment for ' + doc.data().name + '\nTime of appointment: ' + doc.data().time, // + Put the actual time of the event here
          height: 60 //Math.max(50, Math.floor(Math.random() * 150))
        });
        console.log(doc.id, " => ", doc.data());
    });
  })
}


  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.timeCurrentDate}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        getAppointments={this.getAppointments.bind(this)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      console.log('intitial email ' + initialEmail)
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        //console.log(strTime)
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          this.testfunction(strTime);
            firebase.firestore().collection("users").doc(initialEmail).collection("events").doc("appointment").collection("date").doc(strTime).collection("time").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.data());
                  console.log(' at date ' + strTime)
                  console.log(doc.data().name)
                  this.state.items[strTime].push({
                    //firebase.firestore().collection('users').get('events')
                    name: 'Appointment for ' + doc.data().name + '\nTime of appointment: ' + doc.data().time, // + Put the actual time of the event here
                    height: 60 //Math.max(50, Math.floor(Math.random() * 150))
                  });
                  console.log(doc.id, " => ", doc.data());
              });
          }).catch(function(error) {
            var printError = function(error, explicit) {
              console.log(`[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`);
            }
            if (error instanceof TypeError) {
              printError(error);
            }
          });
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});

      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>There are no appointments scheduled for this day!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  timeCurrentDate() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return date;      
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
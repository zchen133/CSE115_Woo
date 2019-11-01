import React, { Component, ReactNode}  from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import {Calendar, Agenda} from 'react-native-calendars';
import { initialEmail } from './Loading.js';
import DocumentSnapshot from "firebase";


export default class Schedule extends Component {


  constructor(props) {
    super(props);
    this.state = {
      data: null,
      items: {}
    };
  }
  
  getAppointments(date){
    var docRef = firebase.firestore().collection("users").doc(initialEmail).collection("events").doc("appointment").collection("date").doc(date);

    return docRef.get().then(function(doc) {
        if (doc.exists) {
            this.setState({data:doc.get('name')})
            //return doc.get('name');
        } else {
            console.log("No such document");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

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
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
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
          const numItems = Math.floor(Math.random() * 5); //Items in collection for that data
          //appointment = this.getAppointments(strTime)
          //const appointment = firebase.firestore().collection("users").doc(initialEmail).collection("events").doc('appointment').collection("date").doc(strTime);
          //console.log(appointment)
          //if (appointment != null || appointment !== undefined ) {
            for (let j = 0; j < numItems; j++) {
              this.state.items[strTime].push({
                //firebase.firestore().collection('users').get('events')
                name: 'Appointment at ' + this.state.data, //+ appointment.getString("time") + ' for ' + appointment.getString("name"), // + Put the actual time of the event here
                height: 50 //Math.max(50, Math.floor(Math.random() * 150))
              });
            }
          //}
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
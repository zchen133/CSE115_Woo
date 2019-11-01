import React, { Component, ReactNode}  from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import {Calendar, Agenda} from 'react-native-calendars';
import { initialEmail } from './Loading.js';


export default class Schedule extends Component {

  name = "";
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      time: "",
      items: {}
    };
    this.getAppointments = this.getAppointments.bind(this);
  }
  
  async getAppointments(date){
    //var docRef = ;

    await firebase.firestore().collection("users").doc(initialEmail).collection("events").doc("appointment").collection("date").doc(date).get().then(doc => {
        if (doc.exists) {
          //console.log('name found ' + doc.data().name);
          //console.log('time found ' + doc.data().time);
          this.setState({
            name: doc.data().name,
            time: doc.data().time
          });
        } else {
            //console.log("No such document");
        }
    }).catch(function(error) {
        //console.log("Error getting document:", error);
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
        //getAppointments={this.getAppointments.bind(this)}
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
          this.getAppointments(strTime)
          if ( !this.state.name.localeCompare("")) {
            console.log(this.state.name)
          }
          //console.log('Testing ' + this.state.name)
          //if (appointment != null || appointment !== undefined ) {
            for (let j = 0; j < numItems; j++) {
              this.state.items[strTime].push({
                //firebase.firestore().collection('users').get('events')
                name: 'Appointment for ' + this.state.name + '\nTime of appointment: ' + this.state.time, // + Put the actual time of the event here
                height: 60 //Math.max(50, Math.floor(Math.random() * 150))
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
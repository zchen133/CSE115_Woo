import React, { Component, ReactNode}  from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import {Calendar, Agenda} from 'react-native-calendars';

export default class AppointmentScreen extends Component {

  onPressSchedules = () => {

    this.props.navigation.navigate('Schedule')

  }
  onPressRequests = () => {

    this.props.navigation.navigate('Requests')

  }

  render() {
    return (
      <View>
        <View style = {styles.requests}>
          <Button
            title='Schedule'
            style = {styles.requests} 
            onPress={this.onPressSchedules}/>
        </View>
        <View>
          <Button
            title='requests'  
            onPress={this.onPressRequests}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  requests: {
    alignItems: 'center',
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
});

/*

*/
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
            style = {styles.requests} 
            onPress={this.onPressRequests}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:40,
    paddingRight:40,
    marginTop:10,
    height:40
  },
  requests: {
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:40,
    paddingRight:40,
    marginTop:10,
    height:40
  },
});

/*

*/
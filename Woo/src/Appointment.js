import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { Calendar, Agenda } from 'react-native-calendars';

export default class AppointmentScreen extends Component {

    onPressSchedules = () => {

        this.props.navigation.navigate('Schedule')

    }
    onPressRequests = () => {

        this.props.navigation.navigate('Requests')

    }

    onPressSearch = () => {

      this.props.navigation.navigate('SearchSchedule')

  }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title='Schedule'
                    style = {styles.requests} 
                    onPress={this.onPressSchedules}/>
                <Button
                    title='requests' 
                    style = {styles.requests} 
                    onPress={this.onPressRequests}/>
                <Button
                    title='search'
                    style = {styles.requests} 
                    onPress={this.onPressSearch}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: 10,
        height: 200
    },
    requests: {
        // textAlign: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingLeft: 40,
        // paddingRight: 40,
        // marginTop: 10,
        // height: 40
    },
});

/*

*/
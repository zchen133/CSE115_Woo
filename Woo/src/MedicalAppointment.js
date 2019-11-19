import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { Calendar, Agenda } from 'react-native-calendars';


export default class MedicalAppointment extends Component {

    onPressSchedules = () => {

        this.props.navigation.navigate('Schedule')

    }

    onPressSearch = () => {

      this.props.navigation.navigate('SearchSchedule')

  }

    render() {
        return (
            <ScrollView style = {styles.scrollView}>
                <View style={styles.container}>
                    <Button
                        title='Schedule'
                        style = {styles.requests} 
                        onPress={this.onPressSchedules}/>
                    <Button
                        title='search'
                        style = {styles.requests} 
                        onPress={this.onPressSearch}/>
                </View>
            </ScrollView>
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
    scrollView: {
        backgroundColor: '#72C3C9'
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
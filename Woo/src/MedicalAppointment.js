import React, { Component, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, Icon, Text, View, Button, TextInput, Image, Animated, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { Calendar, Agenda } from 'react-native-calendars';
import Block from './components';


export default class MedicalAppointment extends Component {

    onPressSchedules = () => {

        this.props.navigation.navigate('Schedule')

    }

    onPressSearch = () => {

        this.props.navigation.navigate('SearchSchedule')

    }

    render() {
        return (

            <Block style = {styles.container}>
                    <ScrollView>
                <TouchableOpacity 
                        onPress={event=>this.onPressSchedules()}>
                        <Block card shadow style={{alignSelf:'center',width:'85%'}}>
                        <Text style = {{marginTop:20,fontSize:20,alignSelf:'center',fontWeight: 'bold',}}>Full Appointment</Text>
                            <Image
                                source={require('../assets/appointment_list.png')}
                                style={{ height: 230, width: 230 ,alignSelf: 'center', alignItems:'center',alignContent:'center',marginBottom:20}}>

                            </Image>
                            
                        </Block>
                        
                </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={event=>this.onPressSearch()}>
                        <Block card shadow style={{alignSelf:'center',width:'85%'}}>
                        <Text style = {{marginTop:30,fontSize:20,alignSelf:'center',fontWeight: 'bold',}}>Search Appointment</Text>
                            <Image
                                source={require('../assets/appointment_search.png')}
                                style={{ height: 230, width: 230 ,alignSelf: 'center', alignItems:'center',alignContent:'center',marginBottom:20}}>

                            </Image>
                        </Block>
                        
                </TouchableOpacity>
                </ScrollView>
                </Block>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: 50,
    },
    scrollView: {
        backgroundColor: '#ffffff'
    },
});


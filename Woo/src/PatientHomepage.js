import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';

import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import { SafeAreaView, ThemeColors } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Login from './Login.js'
import Block from './components.js'

import Patient_ProfileScreen from './Patient_Profile.js'
import Patient_AppointmentScreen from './Patient_Appointment.js'
import Patient_CheckinScreen from './Patient_Checkin.js'
import Patient_PrescriptionScreen from './Patient_Prescription.js'
import { initialEmail } from './Loading.js';
import { FAB } from 'react-native-paper';

class PatientHomepage extends Component {
    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    onPressTest() {
        console.log("get email" + initialEmail)
    }
    renderTop() {
        return (
            <Block flex = {0.4} column style = {{paddingHorizontal:20}}>
                <Block flex = {0.3} >
                </Block>
                <Block flex = {false} row style = {{paddingHorizontal:15,paddingVertical:5}}>
                <Block center>
                    <Text style={{ fontSize: 20, fontWeight: 'bold',color:'#e4f9f5' }}>Patient Homepage</Text>
                </Block>
                </Block>
                <Block  card shadow color = "#f6f5f5" style = {styles.pageTop}>
                    <Block row style = {{paddingHorizontal:30}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold',color:'#40514e',paddingLeft:(width/2)-110 }}>Profile Part</Text>
                    
                    
                    </Block> 
                    
                </Block>
                
                </Block>
        );
    }
    renderList(appointment) {
        return (
            <Block row card shadow color = "#ffffff" style={styles.items}>
                <Block flex = {0.3}>
                    <Image
                    source={require('../assets/calendar.jpg')}
                    style={{ flex: 1, height: null, width: null }}
                    />
                    </Block>
                <Text style = {{paddingLeft:25}}>{appointment.time+'\n'+appointment.date+'\n'+appointment.hospital}</Text>
                
                
            </Block>
        );
    }
    renderBottom() {

        return (
            <Block flex = {0.8} colomn color = "#e7eff6" style = {styles.pageBottom}>
               
                    <Text style={{fontSize: 20, fontWeight: 'bold',color:'#40514e',paddingLeft:(width/2)-110 }}>Upcoming Appointment </Text>
                    
                    <ScrollView showsVerticalScrollIndicator = {true}>
                    {appointment.map(appointment => (
            <TouchableOpacity activeOpacity={0.8} key={`${appointment.time}`} 
                onPress = {event =>{alert(`${appointment.time}`)}}>
              {this.renderList(appointment)}
            </TouchableOpacity>
          ))}


                        </ScrollView>
                </Block>
        );
    }
    render() {
        return (
            <SafeAreaView style = {styles.safe}>
                {this.renderTop()}
                {this.renderBottom()}
                </SafeAreaView>

        );
    }
}


export default createMaterialBottomTabNavigator({

    Home: {
        screen: PatientHomepage,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name = "ios-home" color = {tintColor} size={24}/>
            )
        }
    },
    Profile: {
        screen: Patient_ProfileScreen,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Icon name = "ios-contact" color = {tintColor} size={24}/>
            )
        }
    },
    Appointment: {
        screen: Patient_AppointmentScreen,
        navigationOptions: {
            tabBarLabel: 'Appointment',
            tabBarIcon: ({ tintColor }) => (
                <Icon name = "ios-calendar" color = {tintColor} size={24}/>
            )
        }
    },
    Checkin: {
        screen: Patient_CheckinScreen,
        navigationOptions: {
            tabBarLabel: 'Check-In',
            tabBarIcon: ({ tintColor }) => (
                <Icon name = "ios-checkmark-circle" color = {tintColor} size={24}/>
            )
        }
    },
    Prescription: {
        screen: Patient_PrescriptionScreen,
        navigationOptions: {
            tabBarLabel: 'Prescription',
            tabBarIcon: ({ tintColor }) => (
                <Icon name = "ios-medkit" color = {tintColor} size={24}/>
            )
        }
    }

}, {
    initialRouteName: 'Home',
    order: ['Profile', 'Appointment', 'Home', 'Checkin', 'Prescription'],
    activeTinColor: 'white',
    shifting: true,
    barStyle: { backgroundColor: 'white' }
})
// import populated appointments and display them

const appointment = [{
    time: "12:00",
    date: "Oct 25th",
    hospital: "UCSC Health Center"

},
{
    time: "15:00",
    date: "Oct 25th",
    hospital: "UCSC Health Center"
},
{
    time: "18:00",
    date: "Oct 25th",
    hospital: "UCSC Health Center"
},
{
    time: "7:00",
    date: "Oct 25th",
    hospital: "UCSC Health Center"
},
{
    time: "16:00",
    date: "Oct 25th",
    hospital: "UCSC Health Center"
},
{
    time: "14:00",
    date: "Oct 25th",
    hospital: "UCSC Health Center"
},
{
    time: "8:00",
    date: "Oct 25th",
    hospital: "UCSC Health Center"
}
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#72C3C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safe: {
        flex: 1,
        backgroundColor: '#11999e'

    },
    pageTop: {
        paddingTop: 30,
        paddingBottom: 45,
        zIndex: 1
    },
    pageBottom: {
        marginTop: -50,
        paddingTop: 50,
        paddingBottom: 0,
        zIndex: -1
    },
    items: {
        padding: 20,
        marginBottom: 15
    },
    
});
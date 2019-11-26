import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';

import * as firebase from "firebase";
import { Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

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

const PUSH_REGISTRATION_ENDPOINT = 'http://generated-ngrok-url/token';
const MESSAGE_ENDPOINT = 'https://generated-ngrok-url/message';

class PatientHomepage extends Component {
    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        this.state = {
            notification: {},
            expoPushToken: '',
            nowDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
            appointment: [{ id: "null", time: "00:00", date: "2000-01-01", checked: false, userEmail: "null", first_name: "null", last_name: "null", doctor_name: "null", hospital: "null", department: "null", description: "null" }]
        }
    }


    registerForPushNotificationsAsync = async() => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
      
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
      
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        //console.log("current user ", this.user)
        
        firebase.firestore().collection("users").doc(initialEmail).update({
            token: token
        }).then(function(){
            console.log("Updated Token")
        }).catch(function(error){
            console.error("Failure getting document")
        });
        
      }
    
    async componentDidMount() {
        this.getUserData()
        await this.registerForPushNotificationsAsync();


        //firebase.firestore().collection("hospital").doc("Slug Hospital").collection("Departments").doc(this.state.selectedDepartment).collection("Doctors").doc(this.state.selectedDoctor).collection("Appointments").doc(selected).get()
    }

    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(
                this.props.navigation.navigate('Login'));
    }

    onPressRequest = () => {
        
    }

    getAppointmentList() {

        new_array = [];
        firebase.firestore().collection("users").doc(this.user.email).collection("events").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) =>{
                //console.log(doc.id)

                var id = doc.id
                var date = doc.get("date")
                var time = doc.get("time")
                var userEmail = doc.get("email")
                var description = doc.get("description")
                var department = doc.get("department")
                var doctor_name = doc.get("doctor")
                var first_name = doc.get("first_name")
                var last_name = doc.get("last_name")
                var checked = doc.get("checked")
                var hospital = doc.get("hospital")
                var app = { id: id, time: time, date: date, checked: checked, userEmail: userEmail, hospital: hospital, department: department, description: description, doctor_name: doctor_name, first_name: first_name, last_name: last_name }
                console.log('nowDate'+this.state.nowDate)
                console.log('docDate'+date)
                console.log('nowmonth'+this.state.nowDate.substring(5,7))
                console.log('docdate'+date.substring(8,10))

                if(Number(date.substring(0,4))>Number(this.state.nowDate.substring(0,4))){
                    new_array.push(app);
                }
                else if(Number(date.substring(0,4))==Number(this.state.nowDate.substring(0,4))){

                    if(Number(date.substring(5,7))>Number(this.state.nowDate.substring(5,7))){
                        new_array.push(app);
                    }
                    else if(Number(date.substring(5,7))==Number(this.state.nowDate.substring(5,7))){

                        if(Number(date.substring(8,10))>=Number(this.state.nowDate.substring(8,10))){
                            new_array.push(app);
                        }
                        else{
                            console.log('Invaild date'+date)
                        }
                    }
                    
                }
                
               
            });
            this.setState({ appointment: new_array })
            //console.log(doc.id)
        })

    }
    getUserData() {
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                this.setState({ data: data })
                this.getAppointmentList()
            } else {
                this.setState({ data: null })
                console.log('No such document')
            }
        }).catch((err) => {
            this.setState({ data: null })
            console.log('Error: ', err)
        })
    }
    cancelAppointment(appointment) {
        console.log(appointment.id)

        docRef = firebase.firestore().collection("hospital").doc(appointment.hospital)
            .collection("Departments").doc(appointment.department)
            .collection("Doctors").doc(appointment.doctor_name)
            .collection("Appointments").doc(appointment.date)
            .collection("Time").doc(appointment.time);
        docRef.delete().then(() => {
            console.log("document deleted");
        }).catch(function(error) {
            console.log("Error removing document ", error);
            //alert("error in docRef")
        });

        userRef = firebase.firestore().collection("users").doc(appointment.userEmail).collection("events");
        userRef.doc(appointment.id).delete().then(() => {
            console.log("document deleted");
            alert("Appointment Canceled!")
            this.getAppointmentList()
        }).catch(function(error) {
            console.log("Error removing document ", error);
            alert("Failed to Cancel Appintment!")
        });
    }
    onPressTest() {
        console.log("get email" + initialEmail)
    }
    renderTop() {
        return (
            <Block flex={0.4} column style={{ paddingHorizontal: 20 }}>
                <Block flex={0.3} >
                </Block>
                <Block flex={false} row style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Block center>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#e4f9f5' }}>Patient Homepage</Text>
                    </Block>
                </Block>
                <Block card shadow color="#f6f5f5" style={styles.pageTop}>
                    <Block row style={{ paddingHorizontal: 30 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#40514e', paddingLeft: (width / 2) - 110 }}>Profile Part</Text>


                    </Block>

                </Block>

            </Block>
        );
    }
    renderList(appointment) {
        return (
            <Block row card shadow color="#ffffff" style={styles.items}>
                <Block column flex={1}>
                    <Block row >
                        <Block flex={0.3}>
                            <Image
                                source={require('../assets/calendar.jpg')}
                                style={{ flex: 1, height: null, width: null }}
                            />
                        </Block>
                        <Block>
                            <Text style={{ paddingLeft: 25 }}>{appointment.date + ' ' + appointment.time + '\n' + appointment.hospital + ' - ' + appointment.department + '\n' + appointment.doctor_name + '\n'}</Text>
                        </Block>
                    </Block>
                    <View style={{ flexDirection: 'row', flex: 15, marginTop: 10, justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                        <TouchableOpacity onPress={event => { }}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 15 }}>CHECK-IN</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={event => {
                            Alert.alert(
                                'Cancel Appointment?',
                                'Are you sure you want to cancel the appointment?',
                                [
                                    { text: 'Yes', onPress: (event) => this.cancelAppointment(appointment) },
                                    {
                                        text: 'No',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    
                                ],
                                { cancelable: false },
                            );
                        }}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 15 }}>CANCEL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Block>
            </Block>
        );
    }
    renderBottom() {

        return (
            <Block flex={0.8} colomn color="#e7eff6" style={styles.pageBottom}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#40514e', paddingLeft: (width / 2) - 110 }}>Upcoming Appointment </Text>
                
                <ScrollView showsVerticalScrollIndicator={true}>
                <Block row style={{alignSelf:'center'}}>
                <TouchableOpacity 
                        onPress={event=>this.onPressRequest()}>
                        <View style={styles.refreshButton}>
                            <Icon name="ios-add" color="#000000" size={24} />
                        </View>
                        
                </TouchableOpacity>
                
                <TouchableOpacity 
                        onPress={event =>this.getUserData()}>
                        <View style={styles.refreshButton}>
                            <Icon name="ios-refresh" color="#000000" size={24} />
                        </View>
                        
                </TouchableOpacity>

                <TouchableOpacity 
                        onPress={event =>this.handleSignOut()}>
                        <View style={styles.refreshButton}>
                            <Icon name="ios-log-out" color="#000000" size={24} />
                        </View>
                        
                </TouchableOpacity>
                </Block>
                {this.state.appointment.length>0?(
                    this.state.appointment.map(appointment => (
                        <TouchableOpacity activeOpacity={0.8} key={`${appointment.id}`}
                            onPress={event => { alert(`${appointment.time}`) }}>
                            {this.renderList(appointment)}
                        </TouchableOpacity>
                    ))
                ):(
                    <Block style={{alignItems:'center',alignSelf:'center',justifyContent:'center',marginTop:50}}>
                    <Image
                    source={require('../assets/nurse.png')}
                    style={{ flex: 1, height: 200, width: 200 }}
                /> 
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#40514e' }}>Appointment Not Found</Text>
                </Block>
                )}


                </ScrollView>
            </Block>
        );
    }
    render() {
        return (
            <SafeAreaView style={styles.safe}>
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
                <Icon name="ios-home" color={tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: Patient_ProfileScreen,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-contact" color={tintColor} size={24} />
            )
        }
    },
    Appointment: {
        screen: Patient_AppointmentScreen,
        navigationOptions: {
            tabBarLabel: 'Appointment',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-calendar" color={tintColor} size={24} />
            )
        }
    },
    Checkin: {
        screen: Patient_CheckinScreen,
        navigationOptions: {
            tabBarLabel: 'Check-In',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-checkmark-circle" color={tintColor} size={24} />
            )
        }
    },
    Prescription: {
        screen: Patient_PrescriptionScreen,
        navigationOptions: {
            tabBarLabel: 'Prescription',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-medkit" color={tintColor} size={24} />
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
    refreshButton: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        height: 50,
        width: 50,
        marginHorizontal: 20,
        borderRadius: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2

    },
    pageBottom: {
        marginTop: -50,
        paddingTop: 50,
        paddingBottom: 0,
        zIndex: -1
    },
    items: {
        alignSelf:'center',
        padding: 20,
        width:'90%',
        marginBottom: 15
    },
    buttons: {
        alignItems: 'center',
        marginLeft: 100
    }

});
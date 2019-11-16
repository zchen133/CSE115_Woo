import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import Login from './Login.js'
import Block from './components.js'
import Patient_Profile from './Patient_Profile'
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
//var appointment
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import RequestScreen from './Medical_Request.js'
import MedicalRecords from './MedicalRecords.js'

class MedicalHomepage extends Component {
    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        this.state = {
            checkedColor:'',
            data:'',
            nowDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
            appointment: [{ id: "null", time: "00:00", date: "2000-01-01", checked:false,userEmail: "null", first_name: "null", last_name: "null", doctor_name: "null", department: "null", description: "null" }],
        }
    }

    componentDidMount() {
        this.getUserData()
        
        //firebase.firestore().collection("hospital").doc("Slug Hospital").collection("Departments").doc(this.state.selectedDepartment).collection("Doctors").doc(this.state.selectedDoctor).collection("Appointments").doc(selected).get()
    }
    getAppointmentList(){
        console.log("accountString:::"+this.state.data.accountTypeString)
        if(this.state.data.accountTypeString == 'Doctors'){
            console.log("hospital::::"+this.state.data.department)
            new_array = [];
            firebase.firestore().collection("hospital").doc(this.state.data.hospital).collection("Departments").doc(this.state.data.department).collection(this.state.data.accountTypeString).doc(this.state.data.first+' '+this.state.data.last).collection("Appointments").doc(this.state.nowDate).collection("Time").get().then((querySnapshot) => {
                    querySnapshot.forEach(function(doc) {
                        console.log(doc.id)

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
                    var app = {id:id,time:time,date:date,checked:checked,userEmail:userEmail,department:department,description:description,doctor_name:doctor_name,first_name:first_name,last_name:last_name}
                
                    new_array.push(app); 
                    });
                    this.setState({appointment:new_array})
                    //console.log(doc.id)
                })
    
        }
    }
    getUserData() {
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                this.setState({ data: data })
                console.log(this.state.data.accountTypeString)
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

    cancel(appointment){

    }

    

    

    renderTop() {
        return (
            <Block flex={0.4} column style={{ paddingHorizontal: 20 }}>
                <Block flex={0.3} >
                </Block>
                <Block flex={false} row style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Block center>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#e4f9f5' }}>Medical Homepage</Text>
                    </Block>
                </Block>
                <Block card shadow color="#f6f5f5" style={styles.pageTop}>
                    <Block row style={{ paddingHorizontal: 30 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#40514e', paddingLeft: (width / 2) - 110 }}>Profile Part</Text>

                        {/* <Button
                    title='Just For Test'
                    onPress={this.onPressTest} />*/}
                    </Block>

                </Block>

            </Block>
        );
    }
    renderList(appointment) {
        return (
            <Block row card shadow color="#ffffff" style={styles.items}>
                <Block flex={0.9}>
                    <Image
                        source={require('../assets/calendar.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                    />
                </Block>

                <Text style={{ paddingLeft: 25 }}>{"Time: "+appointment.time + '\n' + "Date: "+appointment.date + '\n' + "Patient Name: "+appointment.first_name+" "+appointment.last_name}</Text>


                <TouchableOpacity onPress={event =>{}}>
                    <Block flex ={0.4}>
                <View style={styles.buttons}>
                        <Icon name="ios-checkmark-circle" size={40} />
                    </View>
                    </Block>
                     </TouchableOpacity>
            </Block>
        );
    }
    renderBottom() {

        return (
            <Block flex={0.8} colomn color="#e7eff6" style={styles.pageBottom}>

                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Upcoming Appointment(Today Only)</Text>

                <ScrollView showsVerticalScrollIndicator={true}>
                    {this.state.appointment.map(appointment => (
                        <TouchableOpacity activeOpacity={0.8} key={`${appointment.id}`}
                            onPress={event => {}}>
                            {this.renderList(appointment)}
                        </TouchableOpacity>
                    ))}
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

class AppointmentScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Full Appointment List Screen Homepage</Text>
            </View>
        );
    }
}

class PrescriptionScreen extends Component {
    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(
                //test = 0,
                this.props.navigation.navigate('Login'));
    }
    render() {
        return (
            <View style={styles.container}>
                <Text> Prescription Screen Homepage</Text>
                <Button
                    title='Sign Out'
                    onPress={this.handleSignOut} />
            </View>
        );
    }
}

export default createMaterialBottomTabNavigator({

    Home: {
        screen: MedicalHomepage,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" color={tintColor} size={24} />
            )
        }
    },
    Request: {
        screen: RequestScreen,
        navigationOptions: {
            tabBarLabel: 'Request',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-contact" color={tintColor} size={24} />
            )
        }
    },
    Appointment: {
        screen: AppointmentScreen,
        navigationOptions: {
            tabBarLabel: 'Appointment',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-calendar" color={tintColor} size={24} />
            )
        }
    },
    Record: {
        screen: MedicalRecords,
        navigationOptions: {
            tabBarLabel: 'Record',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-checkmark-circle" color={tintColor} size={24} />
            )
        }
    },
    Prescription: {
        screen: PrescriptionScreen,
        navigationOptions: {
            tabBarLabel: 'Prescription',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-medkit" color={tintColor} size={24} />
            )
        }
    }

}, {
    initialRouteName: 'Home',
    order: ['Request', 'Appointment', 'Home', 'Record', 'Prescription'],
    activeTinColor: 'white',
    shifting: true,
    barStyle: { backgroundColor: 'white' }
})


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
    buttons:{
        alignItems:'center',
        paddingLeft:30
    }
});
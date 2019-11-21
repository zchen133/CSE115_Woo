import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import Block from './components.js'
import Patient_Profile from './Patient_Profile'
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
//var appointment
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import RequestScreen from './Medical_Request.js'
import RecordScreen from './MedicalRecordScreen.js'
var recordCheck = false


import MedicalAppointment from './MedicalAppointment.js';

class MedicalHomepage extends Component {
    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.user = firebase.auth().currentUser

        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        this.state = {
            isHomepage: true,
            refreshTime: 0,
            patientInfo: "null",
            record: null,
            checkedColor: '',
            data: '',
            nowDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
            appointment: [{ id: "null", time: "00:00", date: "2000-01-01", checked: false, userEmail: "null", first_name: "null", last_name: "null", doctor_name: "null", department: "null", description: "null" }],
        }
    }

    componentDidMount() {
        this.getUserData()

        //firebase.firestore().collection("hospital").doc("Slug Hospital").collection("Departments").doc(this.state.selectedDepartment).collection("Doctors").doc(this.state.selectedDoctor).collection("Appointments").doc(selected).get()
    }
    getAppointmentList() {
        console.log("accountString:::" + this.state.data.accountTypeString)
        if (this.state.data.accountTypeString == 'Doctors') {
            console.log("hospital::::" + this.state.data.department)
            new_array = [];
            firebase.firestore().collection("hospital").doc(this.state.data.hospital).collection("Departments").doc(this.state.data.department).collection(this.state.data.accountTypeString).doc(this.state.data.first + ' ' + this.state.data.last).collection("Appointments").doc(this.state.nowDate).collection("Time").get().then((querySnapshot) => {
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
                    var app = { id: id, time: time, date: date, checked: checked, userEmail: userEmail, department: department, description: description, doctor_name: doctor_name, first_name: first_name, last_name: last_name }

                    new_array.push(app);
                });
                this.setState({ appointment: new_array })
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

    getPatientInfo(emailAddress) {
        this.docRef = firebase.firestore().collection("users").doc(emailAddress);
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                this.setState({ patientInfo: data })
                //console.log(this.state.data.accountTypeString)
                this.getPatientRecord(emailAddress)
            } else {
                this.setState({ patientInfo: null })
                console.log('No such document')
            }
        }).catch((err) => {
            this.setState({ patientInfo: null })
            console.log('Error: ', err)
        })


    }

    getPatientRecord(emailAddress) {
        //this.records = firebase.firestore().collection("users").doc(emailAddress).collection("records")
        var new_array = [];

        //alert(emailAddress)
        firebase.firestore().collection("users").doc(emailAddress).collection("records").get().then((querySnapshot) => {

            querySnapshot.forEach(function(doc) {
                if (doc.exists) {
                    console.log("exist")

                    var id = doc.id
                    let data = doc.data()
                    var dataToString = ""
                    for (const key in data) {
                        dataToString += key + ': ' + data[key] + '\n'
                    }

                    var app = { id: id, data: dataToString }
                    console.log("data:::" + dataToString)
                    new_array.push(app);
                }
            })
            //this.setState({record:new_array})
            console.log("record:::" + this.state.record)

            if (new_array != null && new_array.length != 0) {
                //console.log("here???")
                this.setState({ isHomepage: false })
                this.setState({ record: new_array })
            } else {
                alert("No Medical record")
            }
        })

    }


    renderRecord(appointment) {
        console.log("start to renderRecord")
        if (appointment.userEmail == this.state.patientInfo.email && recordCheck != true) {
            recordCheck = true
            return (
                <Block column card shadow color="#e7eff6" style={styles.items}>

            <Block color="f1f1f1"> 
                <Text style={styles.title}>Personal Information</Text>
                </Block>



                <Block color="#ffffff" style={{borderColor:'black',borderBottomWidth:1,borderTopWidth:1}} >
                <Text style={styles.subText}>{"Patient Name: "+this.state.patientInfo.first + ' ' + this.state.patientInfo.last}</Text>
                <Text style={styles.subText}>{"Patient email: "+this.state.patientInfo.email}</Text>
                <Text style={styles.subText}>{"Patient gender: "+this.state.patientInfo.gender}</Text>
                <Text style={styles.subText}>{"Patient age: "+this.state.patientInfo.age}</Text>
                <Text style={styles.subText}>{"Address: "+this.state.patientInfo.address}</Text> 
            </Block>
            <Block color="f1f1f1"> 
                <Text style={styles.title}>Family Medical History</Text>
                </Block>
                <Block color="#ffffff" style={{borderColor:'black',borderBottomWidth:1,borderTopWidth:1}}>
                <Text style={styles.subText}>{this.state.record[0].data}</Text>
                </Block>

                <Block color="f1f1f1"> 
                <Text style={styles.title}>Medical History</Text>
                </Block>
                <Block color="#ffffff" style={{borderColor:'black',borderBottomWidth:1,borderTopWidth:1}}>
                <Text style={styles.subText}>{this.state.record[1].data}</Text>
                </Block>

                <Block color="f1f1f1"> 
                <Text style={styles.title}>MedicalDirectives</Text>
                </Block>
                <Block color="#ffffff" style={{borderColor:'black',borderBottomWidth:1,borderTopWidth:1}}>
                <Text style={styles.subText}>{this.state.record[2].data}</Text>
                </Block>

                <Block color="f1f1f1"> 
                <Text style={styles.title}>Medication History</Text>
                </Block>
                <Block color="#ffffff" style={{borderColor:'black',borderBottomWidth:1,borderTopWidth:1}}>
                <Text style={styles.subText}>{this.state.record[3].data}</Text>
                </Block>

                <Block color="f1f1f1"> 
                <Text style={styles.title}>Treatment History</Text>
                </Block>
                <Block color="#ffffff" style={{borderColor:'black',borderBottomWidth:1,borderTopWidth:1}}>
                <Text style={styles.subText}>{this.state.record[5].data}</Text>
                </Block>
                

                <TouchableOpacity 
                        onPress={event => {this.setState({isHomepage:true}),this.setState({record:null}),recordCheck=false}}>
                            <View style={styles.closeButton}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Back</Text>
                            </View>
                        
                        </TouchableOpacity>

            
            </Block>


            );

        }

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
        if (this.state.record == null || this.state.record.length == 0) {
            return (
                <Block row card shadow color="#ffffff" style={styles.items}>
                <Block flex={0.56}>
                    <Image
                        source={require('../assets/calendar.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                    />
                </Block>
                
                <Text style={{ paddingLeft: 25 }}>{"Time: "+appointment.time + '\n' + "Date: "+appointment.date + '\n' + "Patient Name: "+appointment.first_name+" "+appointment.last_name+'\n'}</Text>
                

                
            </Block>
            );
        } else {
            return (
                this.renderRecord(appointment)
            );
        }
    }

    test() {
        alert("nmsl")
    }

    renderBottom() {

        return (
            <Block flex={0.8} colomn color="#e7eff6" style={styles.pageBottom}>

                <Text style={{ fontSize: 20, fontWeight: 'bold',alignSelf:'center' }}>Appointment for today</Text>

                

                <ScrollView showsVerticalScrollIndicator={true}>
                {this.state.isHomepage?(
                <TouchableOpacity 
                        onPress={event =>this.getAppointmentList()}>
                        <View style={styles.refreshButton}>
                            <Icon name="ios-refresh" color="#000000" size={24} />
                        </View>
                        
                </TouchableOpacity>): null
                }
                    {this.state.appointment.map(appointment => (
                        <TouchableOpacity activeOpacity={0.8} key={`${appointment.id}`}
                            onPress={event => {this.getPatientInfo(`${appointment.userEmail}`)}}>
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
        screen: MedicalAppointment,
        navigationOptions: {
            tabBarLabel: 'Appointment',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-calendar" color={tintColor} size={24} />
            )
        }
    },
    Record: {
        screen: RecordScreen,
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
    title: {
        paddingTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
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
    iconButton: {
        alignItems: 'center',
        paddingLeft: 30
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2

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
    records: {
        alignItems: 'center',

        paddingLeft: 30
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#72C3C9',
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});

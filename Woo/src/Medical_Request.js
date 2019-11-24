import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
import Block from './components.js'
import { ScrollView } from 'react-native-gesture-handler';
import { hospital } from './Loading.js';

export default class RequestScreen extends Component {

    constructor(props) {
        super(props);

        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        //this.getUserData()
        //this.getAllRequests = this.getAllRequests.bind(this)
        this.state = {
            refresh: false,
            requestColor: "#e7eff6",
            data: null,
            changed: null,
            appointment: [{ id: "null", time: "00:00", date: "2000-01-01", userEmail: "null", first_name: "null", last_name: "null", doctor_name: "null", department: "null", description: "null" }],
            //name:"Name",

        };
    }

    componentDidMount() {
        //     this.getUserData()
        this.getUserData()
        this.getAllRequests()
        //     //this.docRef.set({ birthday: '1-1-2019' }, { merge: true });
    }

    getAllRequests = () => {

        //depart_set = new Set([]);
        console.log("hospital is " + hospital)
        this.docRefRequests = firebase.firestore().collection("hospital").doc(hospital).collection("requests");
        new_array = [];
        this.docRefRequests.get().then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                var id = doc.id
                var date = doc.id.substr(0, 10)
                var time = doc.id.substr(11, 5)
                var userEmail = doc.id.substr(17)
                var description = doc.get("description")
                var department = doc.get("department")
                var doctor_name = doc.get("doctor")
                var first_name = doc.get("first_name")
                var last_name = doc.get("last_name")
                var app = { id: id, time: time, date: date, userEmail: userEmail, department: department, description: description, doctor_name: doctor_name, first_name: first_name, last_name: last_name }
                console.log("date", date);
                console.log("time", time)
                console.log("userEmail", userEmail)
                console.log("doctor name", doctor_name)
                new_array.push(app);

                console.log("app", app.time);
            });
            // if(new_array.length <1){
            //     this.setState({requestColor:"#000000"})
            // }
            //appointment=new_array 
            this.setState({ appointment: new_array })
            //console.log("appointment:"+this.state.appointment);

        });
        //console.log("result new    array:"+new_array);
        //this.setState({appointment:new_array})
        //this.setState({departmentList:new_array})
    }

    getUserData() {
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                this.setState({ data: data })
                console.log(data)
            } else {
                this.setState({ data: null })
                console.log('No such document')
            }
        }).catch((err) => {
            this.setState({ data: null })
            console.log('Error: ', err)
        })
    }

    accept(appointment) {

        firebase.firestore().collection("hospital").doc(hospital).collection("Departments").doc(appointment.department).collection("Doctors").doc(appointment.doctor_name).set({

        }).then(() => {
            firebase.firestore().collection("hospital").doc(hospital).collection("Departments").doc(appointment.department).collection("Doctors").doc(appointment.doctor_name).collection("Appointments").doc(appointment.date).set({

            }).then(() => {
                firebase.firestore().collection("hospital").doc(hospital).collection("Departments").doc(appointment.department).collection("Doctors").doc(appointment.doctor_name).collection("Appointments").doc(appointment.date).collection("Time").doc(appointment.time).set({
                    date: appointment.date,
                    time: appointment.time,
                    hospital: hospital,
                    doctor: appointment.doctor_name,
                    description: appointment.description,
                    department: appointment.department,
                    first_name: appointment.first_name,
                    last_name: appointment.last_name,
                    email: appointment.userEmail,
                    checked: false

                })
            })
        })

        this.userEventsRef = firebase.firestore().collection("users").doc(appointment.userEmail).collection("events");
        console.log("??????" + hospital)
        this.userEventsRef.doc(appointment.date + "_" + appointment.time + "_" + hospital).set({
            date: appointment.date,
            time: appointment.time,
            hospital: hospital,
            doctor: appointment.doctor_name,
            description: appointment.description,
            department: appointment.department,
            first_name: appointment.first_name,
            last_name: appointment.last_name,
            email: appointment.userEmail,
            checked: false
        }).catch(function (error) {
            console.log("Error removing document ", error);
            alert("error in docRef")
        });

        this.docRef = firebase.firestore().collection("hospital").doc(hospital).collection("requests");
        this.docRef.doc(appointment.id).delete().then(function () {
            console.log("document deleted");
            //alert("Deleted")
        }).catch(function (error) {
            console.log("Error removing document ", error);
            alert("error in docRef")
        });

        this.userRef = firebase.firestore().collection("users").doc(appointment.userEmail).collection("requests");
        //console.log("userEmaillll",appointment.id)
        this.userRef.doc(appointment.id).delete().then(() => {
            console.log("document deleted");
            alert("Accepted!")
            this.getAllRequests()
        }).catch(function (error) {
            console.log("Error removing document ", error);
            alert("error in userRef")
        });

    }

    decline(appointment) {


        this.docRef = firebase.firestore().collection("hospital").doc(hospital).collection("requests");
        this.docRef.doc(appointment.id).delete().then(function () {
            console.log("document deleted");
            //alert("Deleted")
        }).catch(function (error) {
            console.log("Error removing document ", error);
            alert("error in docRef")
        });

        this.userRef = firebase.firestore().collection("users").doc(appointment.userEmail).collection("requests");
        //console.log("userEmaillll",appointment.id)
        this.userRef.doc(appointment.id).delete().then(() => {
            console.log("document deleted");
            alert("Deleted!")
            this.getAllRequests()
        }).catch(function (error) {
            console.log("Error removing document ", error);
            alert("error in userRef")
        });


    }

    renderList(appointment) {
        return (
            <Block card shadow color="#ffffff" style={styles.items}>
                <Block column flex={1}>
                    <Block row >

                        <Block flex={0.4}>
                            <Image
                                source={require('../assets/request.png')}
                                style={{ flex: 1, height: null, width: null }}
                            />
                        </Block>
                        <Block>
                            {/* <Text style = {{paddingLeft:25}}>{"Time: "+appointment.time+'\n'+"Date: "+appointment.date+'\n'+"Patient Name: "+appointment.hospital+'\n'+"Doctor Name: "}</Text> */}
                            <Text style={{ paddingLeft: 15 }}>{"Time: " + appointment.time}</Text>
                            <Text style={{ paddingLeft: 15 }}>{"Date: " + appointment.date}</Text>
                            <Text style={{ paddingLeft: 15 }}>{"Patient Name: " + appointment.first_name + " " + appointment.last_name}</Text>
                            <Text style={{ paddingLeft: 15 }}>{"Doctor Name: " + appointment.doctor_name}</Text>
                        </Block>
                        {/* <Button style = {{}}
                    title='Accept'
                     />
                 <Button style = {{}}
                    title='Decline'
                    /> */}
                    </Block>
                    <View style={{ flexDirection: 'row', flex: 15, marginTop: 10, justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                        <TouchableOpacity onPress={event => { this.accept(appointment) }}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 15 }}>ACCEPT</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={event => { this.decline(appointment) }}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 15 }}>DECLINE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <Block row flex = {0.2} style={styles.buttons}>
                <Button style = {{}}
                    title='Accept'
                     />
                <Button style = {{}}
                    title='Decline'
                    />
                    </Block> */}
                </Block>
            </Block>
        );
    }
    render() {

        return (
            <Block>
                <Block flex={1} colomn color={this.state.requestColor} style={styles.pageBottom}>

                    <Text style={{ fontSize: 20, marginLeft: 100, fontWeight: 'bold', marginBottom: 10 }}>Pending Requests</Text>

                    <ScrollView showsVerticalScrollIndicator={true}>

                        {this.state.appointment.map(appointment => (
                            <TouchableOpacity activeOpacity={0.8} key={`${appointment.id}`}
                                onPress={event => { alert(`${appointment.description}`) }}>
                                {
                                    this.renderList(appointment)}
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            onPress={event => this.getAllRequests()}>
                            <View style={styles.closeButton}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Refresh</Text>
                            </View>

                        </TouchableOpacity>
                    </ScrollView>
                </Block>



            </Block>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#72C3C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageBottom: {
        marginTop: 10,
        paddingTop: 50,
        paddingBottom: 0,
        zIndex: -1
    },
    items: {
        alignSelf: 'center',
        width: '90%',
        padding: 20,
        marginBottom: 15
    },
    buttons: {
        alignItems: 'center',
        marginRight: 20
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

    }
});
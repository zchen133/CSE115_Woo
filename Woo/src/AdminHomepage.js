import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions } from 'react-native';
//import * as firebase from "firebase";
import { YellowBox } from 'react-native';
import Toast from 'react-native-tiny-toast';
import { Dropdown } from 'react-native-material-dropdown'
var hospital = 'null'
export { hospital };

var initialEmail = 'initialEmail';

export default class AdminHomepage extends Component {
    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer'])
        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
    }
    state = { email: '', hospital: '', first_name: "", last_name: "", err: null, departmentList: [{ value: "Null" }], selectedDepartment: '', accountTypeNumber: '' }

    componentDidMount() {
        this.getUserData()

    }
    addToHospital = (acType) => {
        firebase.firestore().collection("hospital").doc(this.state.hospital).collection("Departments").doc(this.state.selectedDepartment).collection(acType).doc(this.state.first_name + " " + this.state.last_name).set({

        })
    }
    getUserData() {
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.get("hospital")
                //let first_name = doc.get("first")
                //let last_name = doc.get("last")
                this.setState({ hospital: data })
                //this.setState({first_name:first_name})
                //this.setState({last_name:last_name})

                this.getDepartmentList()
            } else {
                this.setState({ hospital: "null" })
                console.log('No such document')
            }
        }).catch((err) => {
            this.setState({ hospital: "null" })
            console.log('Error: ', err)
        })
    }

    getDepartmentList = () => {
        depart_set = new Set([]);
        new_array = [];
        firebase.firestore().collection("hospital").doc(this.state.hospital).collection("Departments").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                depart_set.add(doc.id);
            });
            depart_set.forEach(function(val) {
                new_array.push({ value: val })
            })
        });
        this.setState({ departmentList: new_array })
    }
    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(this.props.navigation.navigate('Login'));
    }

    addDoctor = () => {
        if (this.state.email !== '' && this.state.selectedDepartment != '') {
            initialEmail = this.state.email;
        } else {
            Toast.show('Please enter the email and select a department');
            return;
        }
        if (this.state.hospitalStaff !== '') {
            hospital = this.state.hospitalStaff
        } else {
            Toast.show('Please enter the hospital');
            return;
        }
        var docRef = firebase.firestore().collection('users').doc(initialEmail);


        docRef.get().then((doc) => {
            if (doc.exists) {
                let first = doc.get("first")
                let last = doc.get("last")
                let currentDepartment = doc.get("department")
                if (currentDepartment != null && currentDepartment != 'Null') {
                    Toast.show('Please reset the permission');
                    return;
                } else {
                    docRef.update({
                        accountType: '4',
                        hospital: this.state.hospital,
                        department: this.state.selectedDepartment,
                        accountTypeString: "Doctors"


                    }).catch(error => { this.setState({ err: error.message }), Toast.show(error.message) });
                }
                this.setState({ first_name: first })
                this.setState({ last_name: last })
                this.addToHospital("Doctors")
            } else {
                console.log('No such document')
            }
        }).catch((err) => {
            console.log('Error: ', err)
        })
    }



    addNurse = () => {
        if (this.state.email !== '' && this.state.selectedDepartment != '') {
            initialEmail = this.state.email;
        } else {
            Toast.show('Please enter the email and select a department');
            return;
        }
        if (this.state.hospital !== '') {
            hospital = this.state.hospitalStaff
        } else {
            Toast.show('Please enter the hospital');
            return;
        }
        var docRef = firebase.firestore().collection('users').doc(initialEmail);

        console.log(this.state.err);
        docRef.get().then((doc) => {
            if (doc.exists) {
                let first = doc.get("first")
                let last = doc.get("last")
                let currentDepartment = doc.get("department")
                if (currentDepartment != null && currentDepartment != 'Null') {
                    Toast.show('Please reset the permission');
                    return;
                } else {
                    docRef.update({
                        accountType: '3',
                        hospital: this.state.hospital,
                        department: this.state.selectedDepartment,
                        accountTypeString: "Nurses"


                    }).catch(error => { this.setState({ err: error.message }), Toast.show(error.message) });
                }
                this.setState({ first_name: first })
                this.setState({ last_name: last })
                this.addToHospital("Nurses")
            } else {
                console.log('No such document')
            }
        }).catch((err) => {
            console.log('Error: ', err)
        })
    }

    addReceptionist = () => {
        if (this.state.email !== '' && this.state.selectedDepartment != '') {
            initialEmail = this.state.email;
        } else {
            Toast.show('Please enter the email and select a department');
            return;
        }
        if (this.state.hospital !== '') {
            hospital = this.state.hospitalStaff
        } else {
            Toast.show('Please enter the hospital');
            return;
        }
        var docRef = firebase.firestore().collection('users').doc(initialEmail);

        console.log(this.state.err);
        docRef.get().then((doc) => {
            if (doc.exists) {
                let first = doc.get("first")
                let last = doc.get("last")
                let currentDepartment = doc.get("department")
                if (currentDepartment != null && currentDepartment != 'Null') {
                    Toast.show('Please reset the permission');
                    return;
                } else {
                    docRef.update({
                        accountType: '2',
                        hospital: this.state.hospital,
                        department: this.state.selectedDepartment,
                        accountTypeString: "Receptionists"


                    }).catch(error => { this.setState({ err: error.message }), Toast.show(error.message) });
                }
                this.setState({ first_name: first })
                this.setState({ last_name: last })
                this.addToHospital("Receptionists")
            } else {
                console.log('No such document')
            }
        }).catch((err) => {
            console.log('Error: ', err)
        })
    }

    resetPermission = () => {
        if (this.state.email !== '' && this.state.selectedDepartment != '') {
            initialEmail = this.state.email;
        } else {
            Toast.show('Please enter the email and select a department');
            return;
        }
        var docRef = firebase.firestore().collection('users').doc(initialEmail);

        docRef.get().then((doc) => {
            if (doc.exists) {
                let type = doc.get("accountType")
                let first = doc.get("first")
                let last = doc.get("last")
                this.setState({ first_name: first })
                this.setState({ last_name: last })
                console.log("type:" + this.type)
                //this.setState({accountTypeNumber:type})
                let accountType = '1'
                if (type == "4") {
                    accountType = "Doctors"
                } else if (type == "3") {
                    accountType = "Nurses"
                } else if (type == "2") {
                    accountType = "Receptionists"
                }
                console.log("hos:" + this.state.hospital + "dep:" + this.state.selectedDepartment + "accouttype:" + accountType + "first:" + this.state.first_name + "last" + this.state.last_name)
                firebase.firestore().collection("hospital").doc(this.state.hospital).collection("Departments").doc(this.state.selectedDepartment).collection(accountType).doc(this.state.first_name + " " + this.state.last_name).delete().then(() => {

                    docRef.update({
                        accountType: '1',
                        hospital: "Null",
                        department: 'Null',
                        accountTypeString: "Patients"

                    }).catch(error => { this.setState({ err: error.message }), Toast.show(error.message) });
                    console.log(this.state.err);

                }).catch(function(error) {
                    console.log("Error removing document ", error);
                    alert("error in userRef")
                });
            } else {
                console.log('No such document')
            }
        }).catch((err) => {
            console.log('Error: ', err)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ ...StyleSheet.absoluteFill }}>
                    <Image
                        source={require('../assets/nb.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                        blurRadius={5}
                    />
                </View>
                <TextInput
                    placeholder='Email'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <Dropdown
                        containerStyle={styles.pickerContainer}
                        pickerStyle={styles.pickerContent}
                        label="Department"
                        data={this.state.departmentList}
                        onChangeText={(selected) => this.setState({selectedDepartment:selected})}
                    />
                <TouchableOpacity onPress={this.addDoctor}>
                    <Animated.View style={styles.button}>
                        <Text style={{ fontSize: 20 }}>Set Doctor</Text>
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.addNurse}>
                    <Animated.View style={styles.button}>
                        <Text style={{ fontSize: 20 }}>Set Nurse</Text>
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.addReceptionist}>
                    <Animated.View style={styles.button}>
                        <Text style={{ fontSize: 20 }}>Set Receptionist</Text>
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.resetPermission}>
                    <Animated.View style={styles.button}>
                        <Text style={{ fontSize: 20 }}>Reset Permission</Text>
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleSignOut}>
                    <Animated.View style={styles.closeButton}>
                        <Text style={{ fontSize: 15 }}>X</Text>
                    </Animated.View>
                </TouchableOpacity>

            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#73BFF1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'white',
        height: 50,
        width: 250,
        marginHorizontal: 20,
        borderRadius: 35,
        marginLeft: 50,
        marginRight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginBottom: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    closeButton: {
        marginBottom: 10,
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    input: {
        backgroundColor: 'white',
        width: '75%',
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        height: 35,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    pickerContainer: {
        // height: 40,
        // alignItems: 'stretch',
        backgroundColor: 'white',
        width: "75%",
        //height: 50,
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        //marginBottom: 30,
        marginLeft: 50,
        marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
    },
    pickerContent: {
        // height: 40,
        // alignItems: 'stretch',
        backgroundColor: 'white',
        width: "75%",
        //height: 30,
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        marginBottom: 20,
        //marginLeft: 50,
        //marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
    }
});

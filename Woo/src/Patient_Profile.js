import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
import EditableText from './EditableTextComponent.js';
import DatePicker from 'react-native-datepicker'

export default class Patient_ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        this.state = {
            data: null,
            //name:"Name",

        };


        this.updateFirstName = this.updateFirstName.bind(this)
        this.updateLastName = this.updateLastName.bind(this)
        this.updateAge = this.updateAge.bind(this)
        this.updateGender = this.updateGender.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updateBirthday = this.updateBirthday.bind(this)
        this.viewMedicalRecords = this.viewMedicalRecords.bind(this)
    }

    componentDidMount() {
        this.getUserData()
    }

    updateAddress(input) {
        this.docRef.set({ address: input }, { merge: true });
        this.getUserData()
    }

    updateGender(input) {
        this.docRef.set({ gender: input }, { merge: true });
        this.getUserData()
    }

    updateAge(input) {
        this.docRef.set({ age: input }, { merge: true });
        this.getUserData()
    }

    updateFirstName(input) {
        this.docRef.set({ first: input }, { merge: true });
        this.getUserData()
    }
    updateLastName(input) {
        this.docRef.set({ last: input }, { merge: true });
        this.getUserData()
    }
    updateBirthday(input) {
        this.docRef.set({ birthday: input }, { merge: true });
        this.getUserData()
    }

    getUserData() {
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                this.setState({ data: data })
            } else {
                this.setState({ data: null })
                console.log('No such document')
            }
        }).catch((err) => {
            this.setState({ data: null })
            console.log('Error: ', err)
        })
    }

    viewMedicalRecords() {
        console.log('trying to navigate here')
        this.props.navigation.navigate('MedicalRecords')
    }

    render() {
        if (this.state.data) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}></View>
                    <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                    <View style={styles.body}>
                        <Text style={styles.name}>{this.state.data.first + ' ' + this.state.data.last}</Text>
                    </View>
                    <View style={styles.userData}>
                        <ScrollView style={styles.scroll}>
                            <View style={styles.editableTextBorder}>
                                <Text style={styles.text}>{'First Name: '}</Text>
                                <EditableText text={this.state.data.first}
                                    sendText={(firstName) => this.updateFirstName(firstName)}
                                    textProps={(styles.editableText)}
                                    textInputProps={(styles.editableText)}
                                />
                            </View>
                            <View style={styles.editableTextBorder}>
                                <Text style={styles.text}>{'Last Name: '}</Text>
                                <EditableText style={styles.name}
                                    text={this.state.data.last}
                                    sendText={(lastName) => this.updateLastName(lastName)}
                                    textProps={(styles.editableText)}
                                    textInputProps={(styles.editableText)}
                                />
                            </View>
                            <View style={styles.editableTextBorder}>
                                <Text style={styles.text}>{'Gender: '}</Text>
                                <EditableText
                                    text={this.state.data.gender}
                                    sendText={(gender) => this.updateGender(gender)}
                                    textInputProps={(styles.editableText)}
                                    textProps={(styles.editableText)}
                                />
                            </View>
                            <View style={styles.editableTextBorder}>
                                <Text style={styles.text}>{'Age: '}</Text>
                                <EditableText text={this.state.data.age}
                                    textProps={(styles.editableText)}
                                    textInputProps={(styles.editableText)}
                                    sendText={(age) => this.updateAge(age)}
                                />
                            </View>
                            <View style={styles.editableTextBorder}>
                                <Text style={styles.text}>{'Birthday: '}</Text>
                                <DatePicker //Doesn't support IOS darkmode yet
                                    style={{ width: 200 }}
                                    date={this.state.data.birthday}
                                    mode="date"
                                    placeholder="select date"
                                    format="MM-DD-YYYY"
                                    minDate="01-01-1900"
                                    maxDate="01-01-2020"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            //borderColor: "#00BFFF",
                                            marginLeft: 36
                                        }
                                       
                                    }}
                                    onDateChange={(birthday) => this.updateBirthday(birthday)}
                                />
                            </View>
                            <View style={styles.editableTextBorder}>
                                <Text style={styles.text}>{'Address: '}</Text>
                                <EditableText text={this.state.data.address}
                                    sendText={(address) => this.updateAddress(address)}
                                    textProps={(styles.editableText)}
                                    textInputProps={(styles.editableText)}
                                />
                            </View>
                            <View style={styles.bodyContent}>
                                <Button title='Medical Records' onPress={this.viewMedicalRecords}/>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#72C3C9',
        height: 200,
    },
    userData: {
        height: '60%',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        textAlign: 'center',
        padding: 30,
        alignItems: 'center',
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    scroll: {
        marginLeft: 15,
        marginRight: 15

    },
    text: {
        fontSize: 20,
        flex: 1

    },
    editableText: {
        fontSize: 20,
        textAlign: 'right',
        flex: 1

    },
    editableTextBorder: {
        flexDirection: 'row',
        paddingBottom: 20,
        borderStyle: 'solid',
        borderColor: '#e2e2e2',
        borderTopWidth: 1
    }
});

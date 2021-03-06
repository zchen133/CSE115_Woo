import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, View, ScrollView, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
import EditableText from './EditableTextComponent.js';
import DatePicker from 'react-native-datepicker'
import Block from './components.js';
import Dialog from 'react-native-dialog';
import Toast from 'react-native-tiny-toast'


export default class Patient_ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        this.state = {
            data: null,
            visible: false,
        };

        this.updateFirstName = this.updateFirstName.bind(this)
        this.updateLastName = this.updateLastName.bind(this)
        this.updateAge = this.updateAge.bind(this)
        this.updateGender = this.updateGender.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updateBirthday = this.updateBirthday.bind(this)
        this.updateProfilePic = this.updateProfilePic.bind(this)
        this.viewMedicalRecords = this.viewMedicalRecords.bind(this)
    }

    componentDidMount() {
        this.getUserData()
    }

    updateAddress(input) {
        if (input == null) {
            Toast.show("Please enter your address")
            return
        }
        if (input.length == 0) {
            Toast.show("Please enter your address")
            return
        }
        this.docRef.set({ address: input }, { merge: true });
        this.getUserData()
    }

    updateGender(input) {
        if (input == null) {
            Toast.show("Please enter your gender")
            return
        }
        if (input.length == 0) {
            Toast.show("Please enter your gender")
            return
        }
        this.docRef.set({ gender: input }, { merge: true });
        this.getUserData()
    }

    updateAge(input) {
        if (input == null) {
            Toast.show("Please enter your age")
            return
        }
        if (input.length == 0) {
            Toast.show("Please enter your age")
            return
        }
        this.docRef.set({ age: input }, { merge: true });
        this.getUserData()
    }

    updateFirstName(input) {
        if (input == null) {
            Toast.show("Please enter your first name")
            return
        }
        if (input.length == 0) {
            Toast.show("Please enter your first name")
            return
        }
        this.docRef.set({ first: input }, { merge: true });
        this.getUserData()
    }
    updateLastName(input) {
        if (input == null) {
            Toast.show("Please enter your last name")
            return
        }
        if (input.length == 0) {
            Toast.show("Please enter your last name")
            return
        }
        this.docRef.set({ last: input }, { merge: true });
        this.getUserData()
    }
    updateBirthday(input) {
        this.docRef.set({ birthday: input }, { merge: true });
        this.getUserData()
    }

    updateProfilePic(input) {
        if (input == null) {
            Toast.show("Please enter an image URL")
            return
        }
        if (input.length == 0) {
            Toast.show("Please enter an image URL")
            return
        }
        this.docRef.set({ profilePic: input }, { merge: true });
        this.getUserData()
        this.setState({ visible: false })
    }

    getUserData() {
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                if (doc.data().profilePic == null) {
                    this.docRef.set({ profilePic: 'https://bootdey.com/img/Content/avatar/avatar6.png' }, { merge: true })
                    this.getUserData()
                } else {
                    let data = doc.data()
                    this.setState({ data: data })
                }
            } else {
                this.setState({ data: null })
            }
        }).catch((err) => {
            this.setState({ data: null })
        })
    }

    viewMedicalRecords() {
        this.props.navigation.navigate('MedicalRecords')
    }

    render() {
        if (this.state.data) {
            return (

                <View style={styles.container}>
                    <View style={styles.header}></View>
                    <Image style={styles.avatar} source={ { uri: this.state.data.profilePic} } />
                    <View style={styles.body}>
                        <Text style={styles.name}>{this.state.data.first + ' ' + this.state.data.last}</Text>
                    </View>
                    <View style={styles.userData}>
                        <ScrollView style={styles.scroll}>
                            <View style={styles.editableTextBorder}>
                                <Text style={styles.text}>{'First Name: '}</Text>
                                <EditableText 
                                    text={this.state.data.first}
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
                                    maxDate={new Date()}
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
                            <TouchableOpacity onPress={() => {this.setState({ visible: true }) } }>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 15,fontWeight:"bold" }}>Change Picture</Text>
                            </View>
                        </TouchableOpacity>
                            
                            <Dialog.Container visible={this.state.visible}>
                                <Dialog.Title>Update your Profile Picture</Dialog.Title>
                                <Dialog.Description>Paste a new URL for the picture you want to use</Dialog.Description>
                                <Dialog.Input placeholder="URL" autoCapitalize="none" onChangeText={profilePic => this.setState({ profilePic }) } value={this.state.profilePic} />
                                <Dialog.Button label="Close" onPress={ () => {this.setState({ visible: false }) }} />
                                <Dialog.Button label="OK" onPress={ () => {this.updateProfilePic(this.state.profilePic)} } />
                            </Dialog.Container>
                            <TouchableOpacity 
                                onPress = {event =>{this.viewMedicalRecords()}}>
                            <View>
                            <ImageBackground
                                source={require('../assets/profile_folder.png')}
                                style={{ height: 200, width: 200 ,alignSelf: 'center', alignItems:'center',alignContent:'center',marginBottom:20}}>
                               
                            
                            <Text style={{marginTop:100,alignSelf:'center',borderWidth:1,borderColor:'#ffffff',color:'#ffffff',fontSize:20,fontWeight: 'bold'}}>{" Medical Record "}</Text>
                            </ImageBackground>
                            </View>
                            </TouchableOpacity>  
                            
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
    profPic: {
        paddingBottom: 40,
    },
    button: {
        backgroundColor: 'white',
        height: 50,
        width:'85%',
        marginHorizontal: 20,
        borderRadius: 5,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
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
        marginRight: 15,
        marginBottom: 80

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
import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, Button, Picker, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import { initialEmail } from './Loading.js';
import Toast from 'react-native-tiny-toast';
import { hospitalStaff } from './AdminHomepage.js';
import DatePicker from 'react-native-datepicker';
import { Platform } from '@unimodules/core';
import {Dropdown} from 'react-native-material-dropdown'
var appointments = [];
var accepted = true;
export default class Patient_AppointmentScreen extends Component {

    
    state = { departmentList:[{value:"Null"}],doctorList:[{value:"Please Select A Department"}],availableTimeList:[{value:"19:00"}],title: '', date: '', time: '', hospital: '', doctor: '', description: '', hospitalStaff: '',appointments: '',  err: null }
    constructor(props){
        super(props);
        this.docRef = firebase.firestore().collection("hospital").doc("Slug Hospital").collection("Departments");
        
        //this.department = this.department.bind(this)
    }

    componentDidMount() {
    //     this.getUserData()
    this.getHosipltalList()
    //     //this.docRef.set({ birthday: '1-1-2019' }, { merge: true });
    }

    getHosipltalList = () =>{
        depart_set = new Set([]);
        new_array = [];
        this.docRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                let data = doc.id
                console.log("sa:",doc.id);
                depart_set.add(doc.id);

                console.log("smg");
            });
            console.log("smg");
            
            depart_set.forEach(function(val) {
                 new_array.push({value:val})
                 //new_array["value"] = val;
                 console.log("new_array: ",new_array);
            })     
        });
       this.setState({departmentList:new_array})
       //this.setState({doctorList:new_array})
    }
    getDoctorList = (selected) => {
        depart_set = new Set([]);
        new_array = [];
        firebase.firestore().collection("hospital").doc("Slug Hospital").collection("Departments").doc(selected).collection("Doctors").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                let data = doc.id
                console.log("sa:",doc.id);
                depart_set.add(doc.id);

                console.log("smg");
            });
            console.log("smg");
            
            depart_set.forEach(function(val) {
                 new_array.push({value:val})
                 //new_array["value"] = val;
                 console.log("new_array: ",new_array);
            })     
        });
       this.setState({doctorList:new_array})
       //this.setState({doctorList:new_array})
        console.log("selected:", selected)
    }
    // getUserData = () => {
    //     this.docRef.get().then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             // doc.data() is never undefined for query doc snapshots
    //             let data = doc.id
    //             console.log(doc.id);
    //             //this.setState({ departmentList: ["addad"] });
    //             //this.setState({department:[data]})
    //             console.log("smg");
    //         });
    //     });

    // }

    clearfields = () => {
        this.setState({title:''})
        this.setState({date:''})
        this.setState({time:''})
        
        this.setState({hospital:''})
        this.setState({doctor:''})
        this.setState({description:''})
    }
    logSetElements(value1, value2, set) {
        console.log("s[" + value1 + "] = " + value2);
    }

    // sleep = (milliseconds) => {
    //     return new Promise(resolve => setTimeout(resolve, milliseconds))
    //   }
    handleAppointmentRequest = () => {
        depart_set = new Set([]);
        new_array = [];
        this.docRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                let data = doc.id
                console.log("sa:",doc.id);
                depart_set.add(doc.id);
                //this.setState({ department: ["addad"] });
                //this.setState({department:[data]})
                console.log("smg");
            });
            console.log("smg");
            
            depart_set.forEach(function(val) {
                 new_array.push({value:val})
                 //new_array["value"] = val;
                 console.log("new_array: ",new_array);
            })
        //     new_array.forEach(function(val) {
        //         //new_array.push({value:val})
        //         console.log("available_time: ",val);
        //    }) 
           
        });
        
        //this.setState({ department: ["addad"] })
        //this.renderPicker()
        // while(new_array.length < 1){

        // }
        this.sleep(500).then(() => {
            //do stuff
          
    //     new_array.forEach(function(val) {
    //         //new_array.push({value:val})
    //         console.log("newarray: ",val);
    //    })
       this.setState({departmentList:new_array})
    })
        // return(this.state.department.map((x,i) =>{
        //     return(<Dropdown label = {x} data = {x}/>)
        // })
    
        //console.log(this.state.department[0]);
        
        //this.setState({department:[{value:"sbb"},{value:"ttt"}]})
        if (this.state.title == '') {
            console.log('No title given');  
             Toast.show('Please enter title');
            return;
        }
        if (this.state.date == '') {
            console.log('No date given');  
             Toast.show('Please enter appointment date');
            return;
        }

        if (this.state.time == '') {
            console.log('No time selected');  
             Toast.show('Please enter appointment time');
            return;
        }

        if (this.state.hospital == '') {
            console.log('No hospital given');  
             Toast.show('Please enter hospital');
            return;
        }
        console.log(accepted)

        const eventrefPatient = firebase.firestore().collection("users").doc(initialEmail).collection("requests");
         eventrefPatient.doc(this.state.date+'_'+this.state.time).set({
             date: this.state.date,
             time: this.state.time,
             hospital: this.state.hospital,
             doctor: this.state.doctor,
             description: this.state.description,

         }) 
         
         /* Same logic can be used to query all receptionists with the same hospital as user requesting event time */
         const userRef = firebase.firestore().collection("hospital").doc(this.state.hospital).collection("requests");
         const hospitalQuery = userRef.where("date", "==", this.state.date)
                                      .where("time", "==", this.state.time)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
            
                if(doc.id != ''){
                   accepted = false;
                   console.log(doc.id)
                }
                
            });
        })
        .catch(function(error){
            console.log("Error getting documents: ", error);
        });
         
      if(accepted){
        Toast.show('Request sent');
        const eventrefHospital= firebase.firestore().collection("hospital").doc(this.state.hospital).collection("requests");
        eventrefHospital.doc(this.state.date+'_'+this.state.time).set({
            date: this.state.date,
            time: this.state.time,
           hospitalStaff: this.state.hospitalStaff,
           doctor: this.state.doctor,
            description: this.state.description,

        })
        //console.log("date is",this.state.date)
      }

      if(!(accepted)){
        accepted = true;
        Toast.show('Request Denied');
        const eventref = firebase.firestore().collection("users").doc(initialEmail).collection("requests");
         eventref.doc(this.state.date+'_'+this.state.time).delete().then(function() {
             console.log("document deleted");
         }).catch(function(error){
             console.log("Error removing document ", error);
         });
         
        
      }
        //Update appointments and export to homepage view
       
    }


    // renderPicker = () => {
        
    //     return(this.state.departmentList.map((x,i) =>{
    //         return(<Dropdown label = {x} data = {x}/>)
    //     })

    //     );
    // }
   
    
    



    render() {
        
       
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'flex-end' }}>
                <View style={{ ...StyleSheet.absoluteFill }}>
                    <Image
                        source={require('../assets/nb.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                        blurRadius={5}
                    />
                </View>
                <View style={styles.reqAll}>
                <TextInput
                    placeholder='Event Title'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={title => this.setState({ title })}
                    value={this.state.title}
                />
                <DatePicker
        style={styles.req}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-11-03"
        maxDate="2020-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            
          },
          dateInput: {
            marginLeft: 0
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      <DatePicker
        style={styles.req}
        date={this.state.time}
        mode="time"
        format="HH:mm"
        placeholder="select time"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        minuteInterval={30}
        is24Hour={true}
        customStyles={{
            dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
            },
            dateInput: {
                margineLeft: 36
            }
            
        }}
        onDateChange={(time) => {this.setState({time: time})}}
      />
                
                <TextInput
                    placeholder='Hospital'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={hospital => this.setState({ hospital })}
                    value={this.state.hospital}
                />
                
                    
                {/* <Picker

                    selectedValue={this.state.language}
                    style={{height: 50, width: 100}}
                    onValueChange={(value) =>
                    (this.setState({value}))}>
                    {this.renderPicker()}
                
                
                
                </Picker> */}

                <Dropdown
                    containerStyle={styles.pickerContainer}
                    pickerStyle={styles.pickerContent}
                    label = "Department"
                    data = {this.state.departmentList}
                    onChangeText = {(selected) => this.getDoctorList(selected)}
                />
                <Dropdown
                    containerStyle={styles.pickerContainer}
                    pickerStyle={styles.pickerContent}
                    label = "Doctor"
                    //value = {this.state.doctorList[0]}
                    data = {this.state.doctorList}
                />
                <Dropdown
                    containerStyle={styles.pickerContainer}
                    pickerStyle={styles.pickerContent}
                    label = "Available Time"
                    //value = {this.state.doctorList[0]}
                    data = {this.state.availableTimeList}
                />                
                
                {/* <TextInput
                    placeholder='Requested Doctor (Optional)'
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={doctor => this.setState({ doctor })}
                    value={this.state.doctor}
                /> */}
                <TextInput
                    placeholder='(Description)'
                    autoCapitalize="none"
                    style={styles.bottom}
                    multiline={true}
                    onChangeText={description => this.setState({ description })}
                    value={this.state.description}
                />
                <TouchableOpacity onPress={this.handleAppointmentRequest}>
                    <View style={styles.button}>
                        <Text style={{ fontSize: 20 }}>Request Appointment</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    req: {
        borderRadius: 10,
        width: '75%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginBottom: 20

    },
    reqAll: {
        borderRadius: 10,
        width: '75%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 45,
        marginBottom: 80

    },
    pickerContainer: {
        // height: 40,
        // alignItems: 'stretch',
        backgroundColor: 'white',
        width: "75%",
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
    },
    pickerContent: {
        // height: 40,
        // alignItems: 'stretch',
        backgroundColor: 'white',
        width: "65%",
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        marginBottom: 20,
        //marginLeft: 50,
        //marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
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
        shadowOpacity: 0.2,
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
        left: width / 2 - 20,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    input: {
        backgroundColor: 'white',
        width: '75%',
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 35,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    bottom: {
        backgroundColor: 'white',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        height: 100,
        width: 200,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    },
   
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
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
        backgroundColor: 'white',
        color: 'black',
    },
    inputAndroid: {
        fontSize: 16,
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
        backgroundColor: 'white',
        color: 'black',
    },
});

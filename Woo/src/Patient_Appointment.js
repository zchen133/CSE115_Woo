import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";

import DatePicker from 'react-native-datepicker'

export default class Patient_AppointmentScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(), 
            hospital: null,
            doctor: null,
            description: null,
        };

        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            date: date,
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text> AppointmentScreen Homepage</Text>
                <View style={styles.req}>
                    <DatePicker
                        style={{ width: 200, padding: 15 }}
                        date={this.state.date}
                        mode="datetime"
                        placeholder="select date"
                        format="MM-DD-YYYY:HH:mm"
                        minDate="01-01-1900"
                        maxDate="01-01-2020"
                        minuteInterval={15}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={true}
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
                        onDateChange={(newDate) => this.setState({ date: newDate })}
                    />
                    <TextInput
                        placeholder='Choose a Hospital'
                        autoCapitalize="none"
                        style={styles.input}
                        onChangeText={hospital => this.setState({ hospital })}
                        value={this.state.hospital}
                    />
                    <TextInput
                        placeholder='Doctor Name (optional)'
                        autoCapitalize="none"
                        style={styles.input}
                        onChangeText={doctor => this.setState({ doctor })}
                        value={this.state.doctor}
                    />
                    <TextInput
                        placeholder='Description'
                        autoCapitalize="none"
                        style={styles.input}
                        onChangeText={description => this.setState({ description })}
                        value={this.state.description}
                    />
                    <Button title="Request Appointment" />
                </View>
            </View>
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
    modal: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    req: {
        borderRadius: 10,
        width: '90%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        // height: 40,
        // alignItems: 'stretch',
        backgroundColor: 'white',
        width: '90%',
        // borderColor: 'black',
        // borderBottomWidth: 2.5,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        //paddingVertical:10,
        // paddingHorizontal: 10,
        height: 35,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    },
});

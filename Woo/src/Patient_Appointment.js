import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
import CalendarPicker from 'react-native-calendar-picker'

export default class Patient_AppointmentScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(), 
            modalVisible: false,
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
                    <Button onPress={() => { this.setState({ modalVisible: true }) } } title='Pick a Date'/>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                        <View style={styles.container}>
                            <View>
                                <CalendarPicker
                                    onDateChange={this.onDateChange}
                                />
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setState({modalVisible: false})
                                    }}>
                                <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <Text>Date Selected: {this.state.date.toString()}</Text>
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

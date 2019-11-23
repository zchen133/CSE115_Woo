import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox ,KeyboardAvoidingView} from 'react-native';
import * as firebase from "firebase";
import Block from './components';

export default class PrescriptionScreen extends Component {

    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.user = firebase.auth().currentUser

        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        this.state = {
            
        }
    }
    render() {
        return (
            <Block>
                
                <Block style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'flex-end' }} >
                
                <View style={styles.reqAll}>
                <Text style={{fontSize:35,fontWeight:"bold"}}>Prescription</Text>
                <Text style={{fontSize:20}}>Please enter the email for the patient</Text>
                <Text style={{fontSize:20,marginTop:30}}>Email</Text>
                <TextInput
                        style={styles.textInput}
                        placeholder='Patient Email'
                        autoCapitalize="none"
                        
                        //multiline={true} SOURCE OF RETURN BUG
                        //onChangeText={description => this.setState({ description })}
                        //value={this.state.description}
                    />
                    
                </View>
               
                <TouchableOpacity onPress={this.handleAppointmentRequest}>
                    <View style={styles.button}>
                        <Text style={{ fontSize: 20 }}>Prescription</Text>
                    </View>
                </TouchableOpacity>
               
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
    reqAll: {
        borderRadius: 20,
        height:'90%',
        width: '90%',
        backgroundColor: 'white',
        alignSelf:'center',
        alignItems:'flex-start',
        //justifyContent: 'center',
        //marginLeft: 45,
        paddingTop:60

    },
    button: {
        backgroundColor: 'white',
        height: 50,
        width: "90%",
        marginHorizontal: 20,
        borderRadius: 10,
        //marginLeft: 50,
        //marginRight: 50,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginBottom: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
    },textInput: {
        width:'90%',
        fontSize:20,
        borderBottomWidth:1
        
       // marginTop:30
    }
})
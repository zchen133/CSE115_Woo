import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from "firebase";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { ScrollView } from 'react-native-gesture-handler';
import Block from './components.js'

export default class SearchSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            email: "",
        };
        this.onQuery = this.onQuery.bind(this);
        this.searchEmail = this.searchEmail.bind(this);
    }

    onPressRequests = () => {
<<<<<<< HEAD
      this.props.navigation.navigate('MedicalHomepage')
=======
        this.props.navigation.navigate('PatientHomepage')
>>>>>>> c9f765e4e989b1350921b5a9e9e89f7062856731
    }

    onQuery = (email) => {
        console.log('Searching for this user ' + email);
        this.searchEmail(email).then((res) => {
            this.setState({
                events: res,
            })
            console.log("Inquiry appointments: " + res);
        })
    }

    async searchEmail(email) {
        events = "\n";
        returnValue = [];
        querySnapshot = await firebase.firestore().collection("users").doc(email).collection("events").get();
        querySnapshot.forEach(function(doc) {
            console.log(doc.data())
            events = "found"
            appointmentText = "Date: " + doc.data().date + "\nDescription: " +
                doc.data().description + "\nDoctor: " + doc.data().doctor + "\nHospital: " +
                doc.data().hospital + "\nat time: " + doc.data().time;
            returnValue.push(
                <Block  card shadow color = "#f6f5f5" style = {styles.pageTop} key ={doc.data().time}>
                <Block row style = {{paddingHorizontal:30, paddingTop: 10}}>
                  <Text>{appointmentText}</Text>
                </Block>
              </Block>
            )
        });
        if (events === "\n") {
            appointmentText = "NO APPOINTMENTS FOUND OR INVALID EMAIL";
            returnValue.push(
                <Block  card shadow color = "#f6f5f5" style = {styles.pageTop}>
                <Block row style = {{paddingHorizontal:30, paddingTop: 30}}>
                  <Text>{appointmentText}</Text>
                </Block>
              </Block>
            )
        }
        return returnValue;
    }

    render() {
        const { events } = this.state;
        return (
            <ScrollView style = {styles.scrollView}>
          <View style = {styles.container}>
              <Text
                style = {styles.titleText}>Search for a users appointments</Text>
                <Fumi
                  label={'Email Address'}
                  iconClass={FontAwesomeIcon}
                  iconName={'envelope-square'}
                  iconColor={'white'}
                  inputStyle={{ color: '#000000' }}
                  onChangeText={email => { this.setState({email}) } }
                /> 
              <Button
                style={styles.buttonStyle}
                onPress = {() => this.onQuery(this.state.email)}
                title="Get specfic user appointments"
              />
              <Button
                onPress = {() => this.onPressRequests()}
                title="Go back"
              />
              <Text style = {styles.titleText}> Appointments found for user:</Text>
              <View>
                {events}
              </View>
          </View>
        </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#72C3C9',
        borderTopWidth: 15,
        borderColor: '#72C3C9',
    },
    titleText: {
        paddingBottom: 16,
        borderColor: '#72C3C9',
        backgroundColor: '#72C3C9',
        textAlign: 'center',
        color: '#404d5b',
        fontSize: 20,
        fontWeight: 'bold',
        opacity: 0.8,
    },
    form: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    pageTop: {
        paddingTop: 30,
        paddingBottom: 45,
        zIndex: 1
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#336633',
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 25,
        paddingLeft: 25,
        marginTop: 10,
        width: 300
    },
    scrollView: {
        backgroundColor: '#72C3C9'
    }
});
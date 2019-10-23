import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight,YellowBox } from 'react-native';
import * as firebase from "firebase";
const { width, height } = Dimensions.get('window')
import Login from './Login.js'
import Block from './components.js'
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
//var appointment
import{createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

class PatientHomepage extends Component {
    constructor(){
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);
    }
   
    renderTop(){
        return(
            <Block flex = {0.4} column style = {{paddingHorizontal:20}}>
                <Block flex = {0.3} >
                </Block>
                <Block flex = {false} row style = {{paddingHorizontal:15,paddingVertical:5}}>
                <Block center>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Patient Homepage</Text>
                </Block>
                </Block>
                <Block  card shadow color = "#f6f5f5" style = {styles.pageTop}>
                    <Block row style = {{paddingHorizontal:30}}>
                    <Text>Profile Part</Text>
                    
                    </Block>
                    
                </Block>
                
                </Block>
        );
    }
    renderList(appointment){
        return(
            <Block row card shadow color = "#e5e6eb" style={styles.items}>
                <Text>{appointment.time}</Text>
                
            </Block>
        );
    }
    renderBottom(){
        
        return(
            <Block flex = {0.8} colomn color = "#e7eff6" style = {styles.pageBottom}>
               
                    <Text style={{fontSize: 20, fontWeight: 'bold' }}>Upcoming Appointment </Text>
                    
                    <ScrollView showsVerticalScrollIndicator = {true}>
                    {appointment.map(appointment => (
            <TouchableOpacity activeOpacity={0.8} key={`${appointment.time}`} 
                onPress = {event =>{alert(`${appointment.time}`)}}>
              {this.renderList(appointment)}
            </TouchableOpacity>
          ))}
                        </ScrollView>
                </Block>
        );
    }
    render() {
        return (
            <SafeAreaView style = {styles.safe}>
                {this.renderTop()}
                {this.renderBottom()}
                </SafeAreaView>
           
        );
    }
}
class ProfileScreen extends Component {
    
    render() {
        return (
         <View style={styles.container}>
             <Text> ProfileScreen Homepage</Text>
         </View>
        );
    }
}
class AppointmentScreen extends Component {
    render() {
        return (
         <View style={styles.container}>
             <Text> AppointmentScreen Homepage</Text>
         </View>
        );
    }
}
class CheckinScreen extends Component {
    render() {
        return (
         <View style={styles.container}>
             <Text> Check-in Screen Homepage</Text>
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
    
    Home:{screen:PatientHomepage,
        navigationOptions:{
            tabBarLabel:'Home',
            tabBarIcon:({tintColor})=>(
                <Icon name = "ios-home" color = {tintColor} size={24}/>
            )
        }
    },
    Profile:{screen:ProfileScreen,
        navigationOptions:{
            tabBarLabel:'Profile',
            tabBarIcon:({tintColor})=>(
                <Icon name = "ios-contact" color = {tintColor} size={24}/>
            )
        }
    },
    Appointment:{screen:AppointmentScreen,
        navigationOptions:{
            tabBarLabel:'Appointment',
            tabBarIcon:({tintColor})=>(
                <Icon name = "ios-calendar" color = {tintColor} size={24}/>
            )
        }
    },
    Checkin:{screen:CheckinScreen,
        navigationOptions:{
            tabBarLabel:'Check-In',
            tabBarIcon:({tintColor})=>(
                <Icon name = "ios-checkmark-circle" color = {tintColor} size={24}/>
            )
        }
    },
    Prescription:{screen:PrescriptionScreen,
        navigationOptions:{
            tabBarLabel:'Prescription',
            tabBarIcon:({tintColor})=>(
                <Icon name = "ios-medkit" color = {tintColor} size={24}/>
            )
        }
    }

},{
    initialRouteName: 'Home',
    order:['Profile','Appointment','Home','Checkin','Prescription'],
    activeTinColor:'white',
    shifting:true,
    barStyle:{backgroundColor:'white'}
})

const appointment = [{
    time:"12:00"
},
{
    time:"15:00"
},
{
    time:"18:00"
},
{
    time:"7:00"
},
{
    time:"16:00"
},
{
    time:"14:00"
},
{
    time:"8:00"
}]
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#72C3C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safe: {
        flex: 1,
        backgroundColor: '#72C3C9'
        
    },
    pageTop: {
        paddingTop: 30,
        paddingBottom: 45,
        zIndex:1
    },
    pageBottom: {
        marginTop:-50,
        paddingTop: 50,
        paddingBottom: 0,
        zIndex:-1
    },
    items :{
        padding:20,
        marginBottom:15
    }
});
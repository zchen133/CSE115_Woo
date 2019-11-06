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

class MedicalHomepage extends Component {
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold',color:'#e4f9f5' }}>Medical Homepage</Text>
                </Block>
                </Block>
                <Block  card shadow color = "#f6f5f5" style = {styles.pageTop}>
                    <Block row style = {{paddingHorizontal:30}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold',color:'#40514e',paddingLeft:(width/2)-110 }}>Profile Part</Text>
                    
                    {/* <Button
                    title='Just For Test'
                    onPress={this.onPressTest} />*/}
                    </Block> 
                    
                </Block>
                
                </Block>
        );
    }
    renderList(appointment){
        return (
            <Block row card shadow color = "#ffffff" style={styles.items}>
                <Block flex = {0.3}>
                    <Image
                    source={require('../assets/calendar.jpg')}
                    style={{ flex: 1, height: null, width: null }}
                    />
                    </Block>
                <Text style = {{paddingLeft:25}}>{appointment.time+'\n'+appointment.date+'\n'+appointment.hospital}</Text>
                
                
            </Block>
        );
    }
    renderBottom(){
        
        return(
            <Block flex = {0.8} colomn color = "#e7eff6" style = {styles.pageBottom}>
               
                    <Text style={{fontSize: 20, fontWeight: 'bold' }}>Upcoming Appointment(Today Only)</Text>
                    
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
class RequestScreen extends Component {
    
    render() {
        return (
         <View style={styles.container}>
             <Text> Appointment Request Screen Homepage</Text>
         </View>
        );
    }
}
class AppointmentScreen extends Component {
    render() {
        return (
         <View style={styles.container}>
             <Text> Full Appointment List Screen Homepage</Text>
         </View>
        );
    }
}
class RecordScreen extends Component {
    render() {
        return (
         <View style={styles.container}>
             <Text> Medical Record Screen Homepage</Text>
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
    
    Home:{screen:MedicalHomepage,
        navigationOptions:{
            tabBarLabel:'Home',
            tabBarIcon:({tintColor})=>(
                <Icon name = "ios-home" color = {tintColor} size={24}/>
            )
        }
    },
    Request:{screen:RequestScreen,
        navigationOptions:{
            tabBarLabel:'Request',
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
    Record:{screen:RecordScreen,
        navigationOptions:{
            tabBarLabel:'Record',
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
    order:['Request','Appointment','Home','Record','Prescription'],
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
        backgroundColor: '#11999e'

    },
    pageTop: {
        paddingTop: 30,
        paddingBottom: 45,
        zIndex: 1
    },
    pageBottom: {
        marginTop: -50,
        paddingTop: 50,
        paddingBottom: 0,
        zIndex: -1
    },
    items: {
        padding: 20,
        marginBottom: 15
    }
});
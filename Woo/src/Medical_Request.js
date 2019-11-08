import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";
import Block from './components.js'
import { ScrollView } from 'react-native-gesture-handler';

export default class RequestScreen extends Component {
    renderList(appointment) {
        return (
            <Block card shadow color = "#ffffff" style={styles.items}>
            <Block column flex = { 1}>
            <Block row >
               
                <Block flex = {0.4}>
                    <Image
                    source={require('../assets/calendar.jpg')}
                    style={{ flex: 1, height: null, width: null }}
                    />
                    </Block>
                    <Block>
                {/* <Text style = {{paddingLeft:25}}>{"Time: "+appointment.time+'\n'+"Date: "+appointment.date+'\n'+"Patient Name: "+appointment.hospital+'\n'+"Doctor Name: "}</Text> */}
                <Text style = {{paddingLeft:15}}>{"Time: "+appointment.time}</Text>
                <Text style = {{paddingLeft:15}}>{"Date: "+appointment.date}</Text>
                <Text style = {{paddingLeft:15}}>{"Patient Name: "+appointment.hospital}</Text>
                <Text style = {{paddingLeft:15}}>{"Doctor Name: "}</Text>
               </Block>
                {/* <Button style = {{}}
                    title='Accept'
                     />
                 <Button style = {{}}
                    title='Decline'
                    /> */}
                </Block>
                <View style={{flexDirection:'row',flex:15,marginTop:10,justifyContent:'space-between', paddingLeft: 20, paddingRight: 20}}>
                <Button style = {{marginHorizontal:20}}
                    title='Accept'
                     />
                <Button style = {{}}
                    title='Decline'
                    />
                </View>
                {/* <Block row flex = {0.2} style={styles.buttons}>
                <Button style = {{}}
                    title='Accept'
                     />
                <Button style = {{}}
                    title='Decline'
                    />
                    </Block> */}
            </Block>
            </Block>
        );
    }
    render() {
        
        return (
            <Block flex = {0.8} colomn color = "#e7eff6" style = {styles.pageBottom}>
               
                    <Text style={{fontSize: 20, fontWeight: 'bold' }}>Appointment Requests</Text>
                    
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
}

const appointment = [{
    time: "12:00"
},
{
    time: "15:00"
},
{
    time: "18:00"
},
{
    time: "7:00"
},
{
    time: "16:00"
},
{
    time: "14:00"
},
{
    time: "8:00"
}
]
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#72C3C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageBottom: {
        marginTop: 10,
        paddingTop: 50,
        paddingBottom: 0,
        zIndex: -1
    },
    items: {
        padding: 20,
        marginBottom: 15
    },buttons:{
        alignItems:'center',
        marginRight:20
    }
});
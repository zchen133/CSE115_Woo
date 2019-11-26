import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Patient_AppointmentScreen from '../src/Patient_Appointment';

test('Patient Appointment Screen SnapShot', ()=> {
    const snap = renderer.create(<Patient_AppointmentScreen />).toJSON();
    expect(snap).toMatchSnapshot();
});

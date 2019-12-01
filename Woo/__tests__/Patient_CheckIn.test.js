import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Patient_CheckinScreen from '../src/Patient_Checkin';

test('Patient Check In SnapShot', ()=> {
    const snap = renderer.create(<Patient_CheckinScreen />).toJSON();
    expect(snap).toMatchSnapshot();
});

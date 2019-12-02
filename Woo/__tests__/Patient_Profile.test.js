import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Patient_ProfileScreen from '../src/Patient_Profile';

test('Patient Profile SnapShot', ()=> {
    const snap = renderer.create(<Patient_ProfileScreen />).toJSON();
    expect(snap).toMatchSnapshot();
});

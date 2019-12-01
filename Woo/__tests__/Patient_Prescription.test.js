import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Patient_PrescriptionScreen from '../src/Patient_Prescription';

test('Patient Prescription SnapShot', ()=> {
    const snap = renderer.create(<Patient_PrescriptionScreen />).toJSON();
    expect(snap).toMatchSnapshot();
});

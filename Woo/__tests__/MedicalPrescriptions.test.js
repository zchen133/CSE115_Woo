import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PrescriptionScreen from '../src/MedicalPrescription';

test('Medical Prescription SnapShot', ()=> {
    const snap = renderer.create(<PrescriptionScreen />).toJSON();
    expect(snap).toMatchSnapshot();
});

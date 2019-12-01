import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MedicalRecords from '../src/MedicalRecords';

test('Medical Records SnapShot', ()=> {
    const snap = renderer.create(<MedicalRecords />).toJSON();
    expect(snap).toMatchSnapshot();
});

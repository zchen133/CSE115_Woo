import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PatientHomepage from '../src/PatientHomepage';

test('Patient Home SnapShot', ()=> {
    const snap = renderer.create(<PatientHomepage />).toJSON();
    expect(snap).toMatchSnapshot();
});

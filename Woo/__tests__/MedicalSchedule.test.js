import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Schedule from '../src/MedicalSchedule';

test('Medical Schedule SnapShot', ()=> {
    const snap = renderer.create(<Schedule />).toJSON();
    expect(snap).toMatchSnapshot();
});

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import RecordScreen from '../src/MedicalRecordScreen';

test('Medical Record Screen SnapShot', ()=> {
    const snap = renderer.create(<RecordScreen />).toJSON();
    expect(snap).toMatchSnapshot();
});

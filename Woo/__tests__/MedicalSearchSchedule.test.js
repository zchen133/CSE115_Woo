import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SearchSchedule from '../src/MedicalSearchSchedule';

test('Medical Search Schedule SnapShot', ()=> {
    const snap = renderer.create(<SearchSchedule />).toJSON();
    expect(snap).toMatchSnapshot();
});

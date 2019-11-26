import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import RequestScreen from '../src/Medical_Request';

test('Medical Request SnapShot', ()=> {
    const snap = renderer.create(<RequestScreen />).toJSON();
    expect(snap).toMatchSnapshot();
});
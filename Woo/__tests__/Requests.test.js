import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Requests from '../src/Requests';

test('Request SnapShot', ()=> {
    const snap = renderer.create(<Requests />).toJSON();
    expect(snap).toMatchSnapshot();
});

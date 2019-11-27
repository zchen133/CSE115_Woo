import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Signup from '../src/Signup';

test('Signup SnapShot', ()=> {
    const snap = renderer.create(<Signup />).toJSON();
    expect(snap).toMatchSnapshot();
});

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WooApp from '../src/Login';

test('Login SnapShot', ()=> {
    const snap = renderer.create(<WooApp />).toJSON();
    expect(snap).toMatchSnapshot();
});
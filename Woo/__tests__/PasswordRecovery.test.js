import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Recovery from '../src/PasswordRecovery.js'

test('Password Recovery SnapShot', ()=> {
    const snap = renderer.create(<Recovery />).toJSON();
    expect(snap).toMatchSnapshot();
});

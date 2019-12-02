import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../src/Home';

test('Home SnapShot', ()=> {
    const snap = renderer.create(<Home />).toJSON();
    expect(snap).toMatchSnapshot();
});
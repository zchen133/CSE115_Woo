import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AdminHomepage from '../src/AdminHomepage';

test('AdminHomepage SnapShot', ()=> {
    const snap = renderer.create(<AdminHomepage />).toJSON();
    expect(snap).toMatchSnapshot();
});
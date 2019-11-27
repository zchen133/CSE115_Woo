import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../src/Loading';

test('Loading SnapShot', ()=> {
    const snap = renderer.create(<Loading />).toJSON();
    expect(snap).toMatchSnapshot();
});
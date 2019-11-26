import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MedicalHomepage from '../src/MedicalHomepage';

test('Medical Homepage SnapShot', ()=> {
    const snap = renderer.create(<MedicalHomepage />).toJSON();
    expect(snap).toMatchSnapshot();
});

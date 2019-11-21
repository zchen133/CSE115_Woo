import 'react-native';
import React from 'react';
import MedicalAppointment from '../src/MedicalAppointment';
import renderer from 'react-test-renderer';

test('MedicalAppointment SnapShot', ()=> {
    const snap = renderer.create(<MedicalAppointment />).toJSON();
    expect(snap).toMatchSnapshot();
});

/*test('MedicalAppointment query functionality'), ()=>{
    
}*/
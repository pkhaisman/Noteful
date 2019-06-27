import React from 'react';
import AddNote from './AddNote';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('AddNote Component', () => {
    it('renders the UI as expected', () => {
        const wrapper = shallow(<AddNote />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
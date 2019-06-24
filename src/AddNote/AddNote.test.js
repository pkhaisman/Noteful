import React from 'react';
import AddNote from './AddNote';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('AddNote Component', () => {

    // does this qualify as a snapshot test?
    it('renders without crashing', () => {
        shallow(<AddNote />)
    });
    
    it('renders the UI as expected', () => {
        const wrapper = shallow(<AddNote />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
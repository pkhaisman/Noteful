import React from 'react';
import AddFolder from './AddFolder';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('AddFolder Component', () => {

    // does this qualify as a snapshot test?
    it('renders without crashing', () => {
        shallow(<AddFolder />)
    });
    
    it('renders the UI as expected', () => {
        const wrapper = shallow(<AddFolder />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
import React from 'react';
import NoteList from './NoteList';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('NoteList Component', () => {

    // does this qualify as a snapshot test?
    it('renders without crashing', () => {
        shallow(<NoteList />)
    });
    
    it('renders the UI as expected', () => {
        const wrapper = shallow(<NoteList />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
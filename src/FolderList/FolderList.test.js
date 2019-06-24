import React from 'react';
import FolderList from './FolderList';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('FolderList Component', () => {

    // does this qualify as a snapshot test?
    it('renders without crashing', () => {
        shallow(<FolderList />)
    });
    
    it('renders the UI as expected', () => {
        const wrapper = shallow(<FolderList />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

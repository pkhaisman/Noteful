import React from 'react';
import './FolderList.css';
import FolderOfNote from '../FolderOfNote/FolderOfNote';
import AllFolders from '../AllFolders/AllFolders';
import NotefulContext from '../NotefulContext';

class FolderList extends React.Component {
    static contextType = NotefulContext;
    render() {      
        if (this.context.selectedNote) {
            return <FolderOfNote />
        } 
        return <AllFolders />
    }
}

export default FolderList;
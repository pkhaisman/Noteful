import React from 'react';
import './FolderList.css';
import FolderOfNote from '../FolderOfNote/FolderOfNote';
import AllFolders from '../AllFolders/AllFolders';

class FolderList extends React.Component {
    render() {      
        if (this.props.noteId) {
            return <FolderOfNote data={this.props}/>
        } 
        return <AllFolders />
    }
}

export default FolderList;
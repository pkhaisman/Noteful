import React from 'react';
// import { NavLink, Link } from 'react-router-dom';
import './FolderList.css';
// import Folder from '../Folder/Folder';
import FolderOfNote from '../FolderOfNote/FolderOfNote';
import AllFolders from '../AllFolders/AllFolders';

class FolderList extends React.Component {
    render() {      
        if (this.props.noteId) {
            return <FolderOfNote 
                data={this.props} />
        } 
        return <AllFolders 
            data={this.props}
            setSelectedFolder={this.props.setSelectedFolder} />
    }
}

export default FolderList;